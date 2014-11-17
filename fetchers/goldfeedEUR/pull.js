var request = require("request");
var async = require("async");
var errbit = require("../../errbit");

module.exports = function (params, rawResults, callback) {
  var goldfeed = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    goldfeed.get(null, function (err, response, body) {
      if (err && err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
        return errbit.notify(err);
      }
      else if(!err && body) {
        rawResults.emit("goldfeedEUR", body);
      }
      setTimeout(callback, params.interval);
    });
  }
  
  async.forever(fetch, callback);
};
