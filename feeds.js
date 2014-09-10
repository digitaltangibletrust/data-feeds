var config = require("config");
var models = require("./models/index.js");

var errbit = require("./errbit");
errbit.handleExceptions();

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
var res = require("./fetchers/index.js").spin();
res.on("result", function (result) {
  if (result.bid > 0) {
    if( result.token.substring( result.token.length - 3 ) !== 'BTC' && 
        result.token.substring( 0, 3 ) !== 'BTC' ) {

      models.data.getLatestPrices("USDtoBTC").complete(function (err, data) {
        if (err) {
          console.dir(err);
        } else {
          var btcPrice = data[0].ask + data[0].bid / 2.0;
          var convertedData = {
            "source": result.source,
            "token": result.token.substring( 0, result.token.length - 3 ) + 'BTC',
            "bid": result.bid / btcPrice,
            "ask": result.ask / btcPrice,
            "low": result.low / btcPrice,
            "high": result.high / btcPrice
          };
          models.data.create(convertedData).complete(function (err) {
            if (err) {
              console.dir(err);
            }
          });
        }
      });

    }
    models.data.create(result).complete(function (err) {
      if (err) {
        console.dir(err);
      }
    });
  }
});
console.log("feed is starting");
