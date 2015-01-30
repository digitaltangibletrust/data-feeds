"use strict";

var Melotic = require("melotic");
var melotic = new Melotic({});

module.exports = function(apiParams, source) {
  return {
    'transform': function(obj, cb) {
      // GLDPAMPBAROZ market.
      var data = obj['gold-btc'];
      if (!data) {
        return cb(new Error("No data"));
      }
      cb({
        "source": source,
        "token": "GLDPAMPBAROZtoBTC",
        "bid": parseFloat(data.highest_bid),
        "ask": parseFloat(data.lowest_ask),
        "low": parseFloat(data.lowest_deal_price),
        "high": parseFloat(data.highest_deal_price)
      });
    },
    'pull': function(cb) {
      melotic.getMarkets(function(err, result) {
        if (err && err.constructor !== "error") {
          err = new Error(JSON.stringify(err));
        }

        cb(err, result, result);
      });
    }
  };
};