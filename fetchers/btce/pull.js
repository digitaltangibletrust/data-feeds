var request = require("request");
var async = require("async");
var errbit = require("../../errbit");

module.exports = function (params, rawResults, callback) {
  var btce = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    btce.get(null, function (err, response, body) {
      if (err && err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
        return errbit.notify(err);
      }
      else if(!err && body) {
        rawResults.emit("btce", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
