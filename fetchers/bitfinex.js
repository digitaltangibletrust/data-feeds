"use strict";

var request = require("request");

module.exports = function(apiParams, source) {
  return {
    'transform': function (obj, cb) {
      var result = {
        "source": source,
        "token": "USDtoBTC",
        "bid": parseFloat(obj.bid),
        "ask": parseFloat(obj.ask),
        "low": parseFloat(obj.low),
        "high": parseFloat(obj.high)
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
