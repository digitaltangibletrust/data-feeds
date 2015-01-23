"use strict";

var request = require("request");
var _ = require("lodash");
var tails = {
  "bid": "bid_eur_toz",
  "ask": "ask_eur_toz",
  "change_euro": "change_dollar_eur_toz",
  "change_percent": "change_percent_eur_toz",
  "high": "high_eur_toz",
  "low": "low_eur_toz",
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
          "token": metal.toUpperCase() + "toEUR",
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
