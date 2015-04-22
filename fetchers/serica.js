'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function(apiParams, source, models) {
  return {
    'transform': function (results, cb) {
      cb(results);
    },
    'pull': function(cb) {
      models.sericafeed.findAll({
        'active': true
      }).complete(function(err, feeds) {
        if(err) {
          return cb(err);
        }

        async.map(feeds, processFeed, function(err, results) {
          cb(err, null, results); // callback with request format
        });
      });
    }
  };

  // for each db.sericafeeds
  function processFeed(feed, cb) {
    var totalWeight = 0;

    var composite = {
      'source': feed.name,
      'token': feed.token,
      'bid': 0,
      'ask': 0,
      'low': 0,
      'high': 0
    };

    async.each(Object.keys(feed.getWeights()), function(exchange, eachCB) {
      models.data.getData({
        'resolution': 'data_1min',
        'exchange': exchange,
        'token': feed.token,
        'order': 'DESC',
        'minutesAgo': feed.subfeed_is_stale_minutes,
        'limit': 1,
      }).complete(function(err, data) {
        if (err) {
          return eachCB(err);
        }

        //If we don't see the feed it is likely stale
        if(data && data[0]) {
          composite.bid += data[0].bid;
          composite.ask += data[0].ask;
          composite.low += data[0].low;
          composite.high += data[0].high;
          totalWeight += feed.getWeights()[exchange];
        }


        eachCB();
      });
    }, function(err) {
      if (err) {
        return cb(err);
      }

      // normalize
      composite.bid /= totalWeight;
      composite.ask /= totalWeight;
      composite.low /= totalWeight;
      composite.high /= totalWeight;

      // adjust by the serica bid and ask premium
      composite.bid *= (1 - feed.bid_premium / 100);
      composite.ask *= (1 + feed.ask_premium / 100);
      composite.low *= (1 - feed.bid_premium / 100);
      composite.high *= (1 + feed.ask_premium / 100);


      cb(null, composite);
    });
  }
};
