var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var bitstamp = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "bitstamp"), params.interval);

  function fetch(callback) {
    bitstamp.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
