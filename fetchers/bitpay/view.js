var _ = require("lodash");

module.exports = function (resultBus, source, currencies) {
  currencies = _.unique(currencies);
  currencies.forEach(function (currency) {
    var result = {
      "source": source,
      "token": currency.code.toUpperCase() + 'toBTC',
      "bid": currency.rate,
      "ask": currency.rate,
      "low": currency.rate,
      "high": currency.rate
    };
    resultBus.emit("result", result);
  });
};
