var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var bitpay = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    bitpay.get(null, function (err, response, body) {
      if (err && err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
        return callback(err);
      }
      else if(!err && body) {
        rawResults.emit("bitpay", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
