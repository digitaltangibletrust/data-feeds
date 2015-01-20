var request = require("request");
var async = require("async");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );
var errbit = require("../../errbit");
var errorThrottle = errbit.createErrorThrottle('counterparty_cacher');

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    melotic.getMarkets( function( err, result ) {
      if (err) {
        if (err.constructor !== "error"){
          err = new Error(JSON.stringify(err));
        }
        if(err.code === "ETIMEDOUT" || err.code === "ECONNRESET") {
          errorThrottle(err);
        } else {
          errbit.notify(err);
        }
      }
      else if(result) {
        rawResults.emit("melotic", result );
      }
      setTimeout( fetch, params.interval );
    } );
  }

  async.forever(fetch, callback);
};