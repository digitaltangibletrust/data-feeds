"use strict";

var Buttercoin = require("buttercoinsdk-node");
var _ = require("lodash");
var fakeAPIKey = _.times(32, function() {return '0';}).join('');
var buttercoin = Buttercoin(fakeAPIKey, fakeAPIKey, 'production', 'v1');

module.exports = function(apiParams, source) {
  return {
    'transform': function (obj, cb) {
      cb({
        "source": source,
        "token": "USDtoBTC",
        "bid": parseFloat(obj.bid),
        "ask": parseFloat(obj.ask),
        "low": 0,
        "high": 0
      });
    },
    'pull': function(cb) {
      buttercoin.getTicker(function (err, data){
        cb(err, data, data);  // callback fcn expects 3 params, just pass the data field twice
      });
    }
  };
};
