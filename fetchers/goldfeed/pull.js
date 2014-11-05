var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var goldfeed = request.defaults({
    "url": params.url,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "goldfeed"), params.interval);

  function fetch(callback) {
    goldfeed.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};
