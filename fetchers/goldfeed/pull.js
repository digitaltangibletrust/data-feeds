var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var goldfeed = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  function fetch(callback) {
    goldfeed.get(null, function (err, response, body) {
      if (err) {
        if(err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
          return callback(err);
        }
      }
      else if(body) {
        rawResults.emit("goldfeed", body);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
