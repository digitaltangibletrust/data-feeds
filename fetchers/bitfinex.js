var request = require("request");

module.exports = function(apiParams, resultBus, source) {
  var bitfinex = request.defaults({
    "url": apiParams.url,
    "json": true,
    "timeout": apiParams.timeout
  });  

  return {
    'transform': function (obj) {
      var result = {
        "source": source,
        "token": "USDtoBTC",
        "bid": parseFloat(obj.bid),
        "ask": parseFloat(obj.ask),
        "low": parseFloat(obj.low),
        "high": parseFloat(obj.high)
      };
      resultBus.emit("result", result);
    },
    'pull': function(callback) {
      bitfinex.get(null, callback);
    }
  }
};
