var name = "bitpay";
var currencyTwo = "USD";
var _ = require("lodash");

module.exports = function (resultBus, currencies) {
  currencies = _.unique(currencies);
  currencies.forEach(function (currency) {
    var result = {
      "source": name,
      "token": currency.code.toUpperCase(),
      "bid": currency.rate,
      "ask": currency.rate,
      "low": currency.rate,
      "high": currency.rate
    };
    resultBus.emit("result", result);
  });
};
