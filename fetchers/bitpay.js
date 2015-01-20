"use strict";

var request = require("request");
var _ = require("lodash");

module.exports = function(apiParams, source) {
  return {
    'transform': function (currencies, cb) {
      currencies = _.unique(currencies);
      var results = [];
      currencies.forEach(function (currency) {
        results.push({
          "source": source,
          "token": currency.code.toUpperCase() + 'toBTC',
          "bid": currency.rate,
          "ask": currency.rate,
          "low": currency.rate,
          "high": currency.rate
        });
      });
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
