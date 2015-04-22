'use strict';

var request = require('request');
var _ = require('lodash');
var async = require('async');

module.exports = function(apiParams, source, models) {
  return {
    'transform': function (results, cb) {
      cb(results);
    },
    'pull': function(cb) {
      async.map(apiParams.feeds, function(feed, cb) {
        var fns = _.map(feed.weights, function(weight, exchange) {
          return function(cb) {
            models.data.getData({
              'resolution': 'data_1min',
              'exchange': exchange,
              'token': feed.token,
              'order': 'DESC',
              'limit': 1,
            }).complete(function(err, data) {
              if(err) {
                return cb(err);
              }

              data = data[0];
              data.weight = weight;

              cb(null, data);
            });
          };
        });
        async.parallel(fns, function(err, results) {
          if(err) {
            return cb(err);
          }

          var composite = _.reduce(results, function(_composite, data) {
            _composite.bid += data.bid * data.weight;
            _composite.ask += data.ask * data.weight;
            _composite.low += data.low * data.weight;
            _composite.high += data.high * data.weight;
            return _composite;
          }, {
            'source': source,
            'token': feed.token,
            'bid': 0,
            'ask': 0,
            'low': 0,
            'high': 0
          });

          var totalWeight = _.reduce(feed.weights, function(sum, weight) {
            return sum + weight;
          }, 0);

          composite.bid /= totalWeight;
          composite.ask /= totalWeight;
          composite.low /= totalWeight;
          composite.high /= totalWeight;

          cb(null, composite);
        });
      }, function(err, results) {
        cb(err, null, results);   // callback with request format
      });
    }
  };
};
