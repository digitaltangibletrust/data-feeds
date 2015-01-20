var request = require("request");
var async = require("async");
var errbit = require("../../errbit");
var errorThrottle = errbit.createErrorThrottle('counterparty_cacher');

module.exports = function (params, rawResults, callback) {
  var bitpay = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    bitpay.get(null, function (err, response, body) {
      if (err) {
        if (err.code === "ETIMEDOUT" || err.code === "ECONNRESET") {
          errorThrottle(err);
        } else {
          errbit.notify(err);
        }
      }
      else if(body) {
        rawResults.emit("bitpay", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
