var request = require("request");
var async = require("async");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    melotic.getMarkets( function( err, result ) {
      if (err && err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") {
        return callback(err);
      }
      rawResults.emit("melotic", result );
      setTimeout( fetch, params.interval );
    } );
  }

  async.forever(fetch, callback);
};