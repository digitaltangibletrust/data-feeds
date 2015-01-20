"use strict"; 

var request = require("request");

module.exports = function(apiParams, source) {
  return {
    'transform': function (obj, cb) {
      var results = [];
      for (var currency in obj) {
        results.push({
          "source": source,
          "token": currency + "toBTC",
          "bid": parseFloat(obj[currency].bid),
          "ask": parseFloat(obj[currency].ask),
          "low": parseFloat(obj[currency].low),
          "high": parseFloat(obj[currency].high)
        });
      }
      cb(results);
    },
    'pull': function(cb) {
      request.get({
        "url": apiParams.url,
        "json": true,
        "timeout": apiParams.timeout
      }, cb);
    }
  };
};
