var request = require("request");
var async = require("async");
var _ = require("lodash");
var Buttercoin = require("buttercoinsdk-node");
var errbit = require("../../errbit");
var errorThrottle = errbit.createErrorThrottle('counterparty_cacher');

var fakeAPIKey = _.times(32, function() {return '0';}).join('');
buttercoin = Buttercoin(fakeAPIKey, fakeAPIKey, 'production', 'v1');

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    buttercoin.getTicker(function (err, data){
      if (err) {
        errbit.notify(err);
      }
      else if(data) {
        rawResults.emit("buttercoin", data);
      }
      setTimeout(callback, params.interval);
    });
  }

  async.forever(fetch, callback);
};
