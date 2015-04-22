'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function(apiParams, source, models) {
  return {
    'transform': function (results, cb) {
      cb(results);
    },
    'pull': function(cb) {
      async.map(apiParams.feeds, processFeed, function(err, results) {
        cb(err, null, results); // callback with request format
      });
    }
  };

  // for each config.serica.feeds
  function processFeed(feed, cb) {
    var totalWeight = _.reduce(feed.weights, function(sum, weight) {
      return sum + weight;
    }, 0);

    var composite = {
      'source': source,
      'token': feed.token,
      'bid': 0,
      'ask': 0,
      'low': 0,
      'high': 0
    };

    async.each(Object.keys(feed.weights), function(exchange, eachCB) {
      models.data.getData({
        'resolution': 'data_1min',
        'exchange': exchange,
        'token': feed.token,
        'order': 'DESC',
        'limit': 1,
      }).complete(function(err, data) {
        if (err) {
          return eachCB(err);
        }

        var relativeWeight = feed.weights[exchange] / totalWeight;

        composite.bid += data[0].bid * relativeWeight;
        composite.ask += data[0].ask * relativeWeight;
        composite.low += data[0].low * relativeWeight;
        composite.high += data[0].high * relativeWeight;

        eachCB();
      });
    }, function(err) {
      if (err) {
        return cb(err);
      }

      cb(null, composite);
    });
  }
};
