module.exports = function (resultBus, source, obj) {
  var result = {
    "source": source,
    "token": "USDtoBTC",
    "bid": parseFloat(obj.bid),
    "ask": parseFloat(obj.ask),
    // "low": parseFloat(obj.low),
    // "high": parseFloat(obj.high)
  };
  resultBus.emit("result", result);
};
