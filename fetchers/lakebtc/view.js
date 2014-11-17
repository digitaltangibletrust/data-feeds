module.exports = function (resultBus, source, obj) {
  for (var currency in obj) {
    resultBus.emit("result", {
      "source": source,
      "token": currency + "toBTC",
      "bid": parseFloat(obj[currency].bid),
      "ask": parseFloat(obj[currency].ask),
      "low": parseFloat(obj[currency].low),
      "high": parseFloat(obj[currency].high)
    });
  }
};
