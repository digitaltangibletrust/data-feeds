var request = require("request");
var async = require("async");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );
var errbit = require("../../errbit");

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    melotic.getMarkets( function( err, result ) {
      if (err && err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
        if (err.constructor !== "error"){
          err = new Error(JSON.stringify(err));
        }
        return errbit.notify(err);
      }
      else if(!err && result) {
        rawResults.emit("melotic", result );
      }
      setTimeout( fetch, params.interval );
    } );
  }

  async.forever(fetch, callback);
};