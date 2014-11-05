module.exports = function (resultBus, source, obj) {

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
};
