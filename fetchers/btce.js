var request = require("request");

module.exports = function(apiParams, resultBus, source) {
  var btce = request.defaults({
    "url": apiParams.url,
    "json": true,
    "timeout": apiParams.timeout
  });  

  return {
    'transform': function (obj) {
      var result = {
        "source": source,
        "token": "USDtoBTC",
        "bid": parseFloat(obj.ticker.sell),
        "ask": parseFloat(obj.ticker.buy),
        "low": parseFloat(obj.ticker.low),
        "high": parseFloat(obj.ticker.high)
      };
      resultBus.emit("result", result);
    },
    'pull': function(callback) {
      btce.get(null, callback);
    }
  }
};
