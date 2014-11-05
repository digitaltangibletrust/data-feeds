var currencyOne = "BTC";
var currencyTwo = "USD";
module.exports = function (resultBus, source, obj) {
  var result = {
    "source": source,
    "token": currencyTwo + "to" + currencyOne,
    "bid": parseFloat(obj.ticker.sell),
    "ask": parseFloat(obj.ticker.buy),
    "low": parseFloat(obj.ticker.low),
    "high": parseFloat(obj.ticker.high)
  };
  resultBus.emit("result", result);
};
