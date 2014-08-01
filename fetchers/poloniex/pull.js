var request = require("request");
var async = require("async");

module.exports = function (params, resultBus, callback) {
  var poloniexTicker = request.defaults({
    "url": params.tickerUrl,
    "json": true
  });

  function fetch(callback) {
    poloniexTicker.get(null, function (err, response, body) {
      if (err) {
        return callback(err);
      }

      resultBus.emit("poloniex", body);
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};