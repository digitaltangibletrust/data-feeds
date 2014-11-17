module.exports = function (resultBus, source, obj) {
  var result = {
    "source": source,
    "token": "USDtoBTC",
    "bid": parseFloat(obj.bid),
    "ask": parseFloat(obj.ask),
    "low": 0,
    "high": 0
  };
  resultBus.emit("result", result);
};
