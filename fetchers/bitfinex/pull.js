var request = require("request");
var async = require("async");

module.exports = function (params, resultBus, callback) {
  var bitfinex = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(resultBus.emit.bind(resultBus, "bitfinex"), params.interval);

  function fetch(callback) {
    bitfinex.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
