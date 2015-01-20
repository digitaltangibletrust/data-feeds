"use strict";

var request = require("request");

module.exports = function(apiParams, source) {
  return {
    'transform': function (obj, cb) {
      var result = {
        "source": source,
        "token": "USDtoBTC",
        "bid": parseFloat(obj.ticker.sell),
        "ask": parseFloat(obj.ticker.buy),
        "low": parseFloat(obj.ticker.low),
        "high": parseFloat(obj.ticker.high)
      };
      cb(result);
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
