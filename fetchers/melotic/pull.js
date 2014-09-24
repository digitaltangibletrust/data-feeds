var request = require("request");
var async = require("async");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );

module.exports = function (params, resultBus, callback) {

  var emit = resultBus.emit.bind(resultBus, "melotic");

  function fetch(callback) {
    melotic.getMarkets( function( err, result ) {
      if (err) {
        if(err.code !== "ETIMEDOUT") return callback(err);
      }
      emit( result );
      setTimeout( fetch, params.interval );
    } );
  }

  async.forever(fetch, callback);
};