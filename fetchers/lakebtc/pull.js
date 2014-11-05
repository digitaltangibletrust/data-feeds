var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var lakebtc = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    lakebtc.get(null, function (err, response, body) {
      if (err) {
        if(err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
          return callback(err);
        }
      }
      else if(body) {
        rawResults.emit("lakebtc", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
