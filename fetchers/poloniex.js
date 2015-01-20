"use strict";

var request = require("request");
var currencies = {
  // Poloniex's token name -> Our token name.
  'BTC_GOLD': 'GOLDDTT'
};

module.exports = function(apiParams, source) {
  return {
    'transform': function(obj, cb) {
      var results = [];
      Object.keys(currencies).forEach(function(key) {
        var val = obj[key];
        if (val) {
          results.push({
            "source": source,
            "token": currencies[key] + "toBTC",
            "bid": parseFloat(val.highestBid),
            "ask": parseFloat(val.lowestAsk),
            // Poloniex won't give us real highs and lows for the last 24 hour period.
            // They only update their historical data at the end of each day, it appears.
            // This allows us to enter a value in the Not-Null column of the database,
            // yet end up with null values in the JSON sent up to the client.
            "low": 'NaN',
            "high": 'NaN'
          });
        }
      });
      cb(results);
    },
    'pull': function(callback) {
      request.get({
        "url": apiParams.tickerUrl,
        "json": true,
        "timeout": apiParams.timeout
      }, callback);
    }
  };
};