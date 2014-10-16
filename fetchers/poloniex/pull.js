var request = require("request");
var async = require("async");

module.exports = function (params, resultBus, callback) {
  var poloniexTicker = request.defaults({
    "url": params.tickerUrl,
    "json": true,
    "timeout": params.timeout
  });

  var fetchCallback = require("../common").fetchCallback(resultBus.emit.bind(resultBus, "poloniex"), params.interval);

  function fetch(callback) {
    poloniexTicker.get(null, fetchCallback(callback));
  }

  async.forever(fetch, callback);
};