var name = "lakebtc";
var currencyOne = "BTC";
var currencyTwo = "USD";
module.exports = function (resultBus, obj) {
  for (var currency in obj) {
    resultBus.emit("result", {
      "source": name,
      "rateFor": currency + " to " + currencyOne,
      "bid": parseFloat(obj[currency].bid),
      "ask": parseFloat(obj[currency].ask),
      "low": parseFloat(obj[currency].low),
      "high": parseFloat(obj[currency].high)
    });
  }
};
