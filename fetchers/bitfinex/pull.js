var request = require("request");
var async = require("async");

module.exports = function (params, resultBus, callback) {
  var bitfinex = request.defaults({
    "url": params.url,
    "json": true
  });

  function fetch(callback) {
    bitfinex.get(null, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      resultBus.emit("bitfinex", body);
      setTimeout(callback, params.interval);
    });
  }
  async.forever(fetch, callback);
};
