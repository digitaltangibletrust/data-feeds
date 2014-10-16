var name = "goldfeedEUR";
var currencyTwo = "EUR";
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

module.exports = function (resultBus, obj) {
  var metals = [];
  for (var prop in obj) {
    metals.push(prop.split("_").shift());
  }
  metals = _.unique(metals);
  metals.forEach(function (metal) {
    var result = {
      "source": name,
      "token": metal.toUpperCase() + "to" + currencyTwo,
      "bid": parseFloat(obj[metal + "_" + tails.bid] || 0),
      "ask": parseFloat(obj[metal + "_" + tails.ask] || 0),
      "low": parseFloat(obj[metal + "_" + tails.low] || 0),
      "high": parseFloat(obj[metal + "_" + tails.high] || 0)
    };
    resultBus.emit("result", result);
  });
};
