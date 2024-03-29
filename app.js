'use strict';
var restify = require('restify');
var config = require('config');
var server = restify.createServer(config.app);
var models = require('./models/index.js');
var async = require('async');
var request = require('request');
var _ = require('lodash');

var errbit = require('./errbit');
errbit.handleExceptions();

server.use(restify.fullResponse());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.throttle({
  'burst': 100,
  'rate': 50,
  'ip': true,
  'overrides': {
    '192.168.1.1': {
      'rate': 0, // unlimited
      'burst': 0
    }
  }
}));

var availableIntervals = ['day', 'hour', 'month'];
var defaultInterval = 'hour';

function validateInterval(interval) {
  if (!interval) {
    return defaultInterval;
  }
  if (availableIntervals.indexOf(interval) === -1) {
    return defaultInterval;
  }
  return interval;
}

// TODO: after the change to serica_rates goes live in the app we can strip the bitfinex stuff out here
var liveData = {};
server.get('/live/:exchange', function(req, res, next) {
  var liveDataPoint = liveData[req.params.exchange];
  if (liveDataPoint && (Date.now() - liveDataPoint.timestamp) < 10000) {
    return res.send(liveDataPoint);
  }

  switch (req.params.exchange) {
    case 'bitfinex':
      request.get('https://api.bitfinex.com/v1/pubticker/BTCUSD', function(err, response, data) {
        if (err) {
          errbit.notify(err);
          return res.send(500);
        }

        var dataObj;

        try {
          dataObj = JSON.parse(data);
        } catch (e) {
          errbit.notify(new Error('data-feeds api could not parse bitfinex ticker response: ' + data));
          return res.send(500);
        }

        dataObj.timestamp = Date.now();
        liveData[req.params.exchange] = dataObj;
        return res.send(dataObj);
      });
      break;
    case 'serica':
      models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token= ? ORDER BY created_at DESC LIMIT 1', null, {
        'raw': true
      }, ['serica', 'USDtoBTC']).complete(function(err, data) {
        var latest = _.first(data);
        var dataObj = {
          'bid': Number(latest.bid.toFixed(4)),
          'ask': Number(latest.ask.toFixed(4)),
          'rate': (latest.bid + latest.ask) / 2,
          'timestamp': Date.parse(latest.date_trunc)
        };
        liveData[req.params.exchange] = dataObj;
        return res.send(dataObj);
      });
      break;
    default:
      return res.send(404);
  }
});


server.get('/feed', function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = ['1 ' + interval];
  models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE created_at > (NOW() - ?::interval) ORDER BY created_at DESC', null, {
    'raw': true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});

server.get('/feed/:exchange', function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = [req.params.exchange, '1 ' + interval];
  models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE source=? AND created_at > (NOW() - ?::interval) ORDER BY created_at DESC', null, {
    'raw': true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});

server.get('/feed/:exchange/:token', function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = [req.params.exchange, req.params.token, '1 ' + interval];
  models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token= ? AND created_at > (NOW() - ?::interval) ORDER BY created_at DESC', null, {
    'raw': true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});

server.get('/highstockfeed/:exchange/:token', function (req, res, next) {
  if( req.query.start && req.query.end ) {
    var start = req.query.start;
    var end = req.query.end;

    recoverRange( parseInt( start ), parseInt( end ) );
  } else {
    models.sequelize.query( 
      'SELECT source as exchange, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token=? ORDER BY created_at ASC LIMIT 1', 
      null, { 'raw': true }, 
      [ req.params.exchange, req.params.token ] ).complete( function( err, data ) {
        if( err ) {
          return next( err );
        }

        var start = Date.parse( data[0].date_trunc );
        models.sequelize.query( 
          'SELECT source as exchange, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token=? ORDER BY created_at DESC LIMIT 1', 
          null, { 'raw': true }, 
          [ req.params.exchange, req.params.token ] ).complete( function( err, data ) {
            if( err ) {
              return next( err );
            }

            var end = Date.parse( data[0].date_trunc );

            recoverRange( start, end );
        } );
    } );
  }

  function recoverRange( start, end ) {

    var timeSpacing = (end - start) / 100;
    var result = [];
    for( var timestamp = start; timestamp < end; timestamp += timeSpacing ) {
      result.push( { 'target': new Date( timestamp )} );
    }
    result.push( { 'target': new Date( end ) } );

    async.forEach( result,
      function( item, done ) {
        var params = [ req.params.exchange, req.params.token, item.target ];
        models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token= ? AND created_at <= ? ORDER BY created_at DESC LIMIT 1', null, {
          'raw': true
        }, params).complete(function (err, data) {
          if (err) {
            return done(err);
          }
          if( data.length > 0 ) {
            try {
              _.assign( item, data[0] );
            } catch( error ) {
              return done( error );
            }
          }

          done();
        });

      },
      function( error ) {
        if( error ) {
          return next( error );
        }

        res.send( result );
        next();
      }
    );
  }
});

// Returns the most recent price item prior to a given targetTime, specified in milliseconds.
server.get('/nearest/:exchange/:token', function (req, res, next) {
  var params = [ req.params.exchange, req.params.token, new Date( parseInt( req.params.targetTime )) ];
  models.sequelize.query('SELECT source as exchange, token, bid, ask, low, high, date_trunc(\'second\', created_at) FROM data WHERE source=? AND token= ? AND created_at < ? ORDER BY created_at DESC LIMIT 1', null, {
    'raw': true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
  next();
});

server.get('/tokens', function (req, res, next) {
  models.sequelize.query('SELECT DISTINCT token FROM data', null, {
    'raw': true
  }).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});

server.get('/exchanges', function (req, res, next) {
  models.sequelize.query('SELECT DISTINCT source as exchange FROM data', null, {
    'raw': true
  }).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
