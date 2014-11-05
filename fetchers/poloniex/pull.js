var request = require("request");
var async = require("async");

module.exports = function (params, rawResults, callback) {
  var poloniexTicker = request.defaults({
    "url": params.tickerUrl,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(rawResults.emit.bind(rawResults, "poloniex"), params.interval);

  function fetch(callback) {
    poloniexTicker.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};