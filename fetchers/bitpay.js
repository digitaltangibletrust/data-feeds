var request = require("request");
var _ = require("lodash");

module.exports = function(apiParams, resultBus, source) {
  var bitpay = request.defaults({
    "url": apiParams.url,
    "json": true,
    "timeout": apiParams.timeout
  });

  return {
    'transform': function (currencies) {
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
    },
    'pull': function(callback) {
      bitpay.get(null, callback);
    }
  }
};
