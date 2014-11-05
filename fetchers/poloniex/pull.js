var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var poloniexTicker = request.defaults({
    "url": params.tickerUrl,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    poloniexTicker.get(null, function (err, response, body) {
      if (err) {
        if(err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
          return callback(err);
        }
      }
      else if(body) {
        rawResults.emit("poloniex", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};