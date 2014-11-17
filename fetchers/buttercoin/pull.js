var request = require("request");
var async = require("async");
var _ = require("lodash");
var Buttercoin = require("buttercoinsdk-node");

var fakeAPIKey = _.times(32, function() {return '0';}).join('');
buttercoin = Buttercoin(fakeAPIKey, fakeAPIKey, 'production', 'v1');

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    buttercoin.getTicker(callback);
  }

  async.forever(fetch, callback);
};
