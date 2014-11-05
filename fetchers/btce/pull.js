var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var btce = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "btce"), params.interval);

  function fetch(callback) {
    btce.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
