var name = "btce";
var currencyOne = "BTC";
var currencyTwo = "USD";
module.exports = function (resultBus, obj) {
  var result = {
    "source": name,
    "token": currencyTwo + "to" + currencyOne,
    "bid": parseFloat(obj.ticker.sell),
    "ask": parseFloat(obj.ticker.buy),
    "low": parseFloat(obj.ticker.low),
    "high": parseFloat(obj.ticker.high)
  };
  resultBus.emit("result", result);
};
