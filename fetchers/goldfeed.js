"use strict";

var request = require("request");
var _ = require("lodash");
var tails = {
  "bid": "bid_usd_toz",
  "ask": "ask_usd_toz",
  "change_dollar": "change_dollar_usd_toz",
  "change_percent": "change_percent_usd_toz",
  "high": "high_usd_toz",
  "low": "low_usd_toz",
  "londonfix_am": "londonfix_am",
  "londonfix_pm": "londonfix_pm"
};

module.exports = function(apiParams, source) {
  return {
    'transform': function (obj, cb) {
      var metals = [];
      for (var prop in obj) {
        metals.push(prop.split("_").shift());
      }
      metals = _.unique(metals);
      var results = metals.map(function (metal) {
        return {
          "source": source,
          "token": metal.toUpperCase() + "toUSD",
          "bid": parseFloat(obj[metal + "_" + tails.bid] || 0),
          "ask": parseFloat(obj[metal + "_" + tails.ask] || 0),
          "low": parseFloat(obj[metal + "_" + tails.low] || 0),
          "high": parseFloat(obj[metal + "_" + tails.high] || 0)
        };
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
