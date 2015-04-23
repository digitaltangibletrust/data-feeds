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
    feed.calcSpreads(cb);
  }
};
