var config = require("config");
var models = require("./models/index.js");
var redis = require('redis').createClient(config.redis.port, config.redis.host, {
  'auth_pass': config.redis.pass || null
});
var EE = require("events").EventEmitter;
var rawResults = new EE();
var resultBus = new EE();
var async = require("async");
var _ = require("lodash");

var errbit = require("./errbit");
errbit.handleExceptions();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (process.env.SYNC_DB) {
  return models.sequelize.sync({
    "force": true
  }).complete(function (err) {
    console.log("done");
    if (err) {
      console.dir(err);
      return process.exit(1);
    }
    process.exit(0);
  });
}

if (process.env.CREATE_VIEWS) {
  return models.sequelize.query(require("fs").readFileSync("./sql/views.sql").toString()).complete(function (err) {
    console.log("done");
    if (err) {
      console.dir(err);
      return process.exit(1);
    }
    process.exit(0);
  });
}

///////////////
// MAIN LOOP //
///////////////

function onError(source, err) {
  console.log("source " + source + " got error: ");
  console.dir(err);
  errbit.notify(err);
}

// spin each of the individual fetchers
_.each(config.sources, function(params, source) {
  if (params.active === true) {

    var init = require("./fetchers/" + source + ".js");
    var fetcher = init(params, resultBus, source);
    
    rawResults.on(source, fetcher.transform);

    var errorThrottle = errbit.createErrorThrottle(source);
    function fetcherSpin(callback) {
      fetcher.pull(function (err, response, body) {
        if (err) {
          if (err.code === "ETIMEDOUT" || err.code === "ECONNRESET") {
            errorThrottle(err);
          } else {
            errbit.notify(err);
          }
        }
        else if(body) {
          rawResults.emit(source, body);
        }
        setTimeout(callback, params.interval);
      });
    }

    async.forever(fetcherSpin, onError.bind(null, source));
  }
});

resultBus.on("result", function (result) {
  if (result.bid > 0) {
    
    saveResult(result);

    if ( !BTCinCurrencyPair(result) ){
      convertToBTC(result, function (converted) {
        saveResult(converted);
      });
    }
  }
});

// is BTC one of the currencies in the token name
function BTCinCurrencyPair(result){
  return result.token.substring( result.token.length - 3 ) === 'BTC' || result.token.substring( 0, 3 ) === 'BTC';
}

// convert to btc
function convertToBTC(result, cb){
  models.data.getLatestPrices("USDtoBTC").complete(function (err, data) {
    if (err) {
      return console.dir(err);
    } 

    var btcPrice = ( data[0].ask + data[0].bid ) / 2.0;
    
    var convertedData = {
      "source": result.source,
      "token": result.token.substring( 0, result.token.length - 3 ) + 'BTC',
      "bid": result.bid / btcPrice,
      "ask": result.ask / btcPrice,
      "low": result.low / btcPrice,
      "high": result.high / btcPrice
    };

    cb(convertedData);
  });
}

// write to the db and trigger redis
function saveResult(data){
  models.data.create(data).complete(function (err) {
    if (err) {
      return console.dir(err);
    }
    
    broadcastUpdate(data);
  });
}

///////////////////////////
// REDIS EVENT BROADCAST //
///////////////////////////

function broadcastUpdate(result) {
  var channel = "feed." + result.source + ".updated";
  redis.publish(channel, result.token);
}

console.log("feed is starting");