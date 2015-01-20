var request = require("request");

module.exports = function(apiParams, resultBus, source) {
  var lakebtc = request.defaults({
    "url": apiParams.url,
    "json": true,
    "timeout": apiParams.timeout
  });  

  return {
    'transform': function (obj) {
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
    },
    'pull': function(callback) {
      lakebtc.get(null, callback);
    }
  }
};
