var request = require("request");
var async = require("async");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );

module.exports = function (params, rawResults, callback) {

  function fetch(callback) {
    melotic.getMarkets( function( err, result ) {
      if (err) {
        if(err.code !== "ETIMEDOUT" && err.code !== "ECONNRESET") r{
          eturn callback(err);
        }
      }
      rawResults.emit("melotic", result );
      setTimeout( fetch, params.interval );
    } );
  }

  async.forever(fetch, callback);
};