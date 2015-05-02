'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function(apiParams, source, models) {
  return {
    'transform': function (results, cb) {
      cb(_.compact(results));
    },
    'pull': function(cb) {
      models.sericafeed.findAll({
        'active': true
      }).complete(function(err, feeds) {
        if(err) {
          return cb(err);
        }

        async.map(feeds, processFeed, function(err, results) {
          if(err) {
            return cb(err);
          }

          determineUSDtoEUR(function(err, USDtoEUR) {
            if(err) {
              return cb(err);
            }

            results.push(USDtoEUR);

            cb(err, null, results); // callback with request format
          });
        });
      });
    }
  };

  // for each db.sericafeeds
  function processFeed(feed, cb) {
    feed.calcSpreads(cb);
  }

  // Create a simple conversion from USDtoEUR via the bitpay rated for USD and EUR to BTC
  function determineUSDtoEUR(cb) {
    async.map(['USDtoBTC', 'EURtoBTC'], function(token, cb) {
      models.data.getData({
        'resolution': 'data_1min',
        'exchange': 'bitpay',
        'token': token,
        'order': 'DESC',
        'limit': 1,
      }).complete(cb);
    }, function(err, rates) {
      if(err) {
        return cb(err);
      }

      var USDtoBTC = rates[0][0];
      var EURtoBTC = rates[1][0];

      if(!USDtoBTC || !EURtoBTC) {
        return cb();
      }

      var rate = USDtoBTC.ask / EURtoBTC.ask;

      var USDtoEUR = {
        'source': 'serica',
        'token': 'USDtoEUR',
        'bid': rate,
        'ask': rate,
        'low': rate,
        'high': rate,
      };

      cb(null, USDtoEUR);
    });
  }
};
