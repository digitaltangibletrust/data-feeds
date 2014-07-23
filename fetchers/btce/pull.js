var request = require("request");
var async = require("async");

module.exports = function (params, resultBus, callback) {
  var btce = request.defaults({
    "url": params.url,
    "json": true
  });

  function fetch(callback) {
    btce.get(null, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      resultBus.emit("btce", body);
      setTimeout(callback, params.interval);
    });
  }
  async.forever(fetch, callback);
};
