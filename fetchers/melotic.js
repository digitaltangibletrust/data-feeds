var request = require("request");
var Melotic = require( "melotic" );
var melotic = new Melotic( {} );

module.exports = function(apiParams, resultBus, source) {
  return {
    'transform': function (obj) {
      // GLDPAMPBAROZ market.
      var data = obj[ 'gold-btc' ];
      if( data ) {
        resultBus.emit( "result", {
          "source": source,
          "token": "GLDPAMPBAROZtoBTC",
          "bid": parseFloat( data.highest_bid ),
          "ask": parseFloat( data.lowest_ask ),
          "low": parseFloat( data.lowest_deal_price ),
          "high": parseFloat( data.highest_deal_price )
        });
      }
    },
    'pull': function(callback) {
      melotic.getMarkets(function(err, result) {
        if(err && err.constructor !== "error"){
          err = new Error(JSON.stringify(err));
        }

        callback(err, result, result);
      });
    }
  }
};
