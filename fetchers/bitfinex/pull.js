var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var bitfinex = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "bitfinex"), params.interval);

  function fetch(callback) {
    bitfinex.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
