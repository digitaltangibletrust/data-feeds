var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var bitpay = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });
  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "bitpay"), params.interval);

  function fetch(callback) {
    bitpay.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
