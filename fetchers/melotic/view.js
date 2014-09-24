var name = "melotic";
var currencyOne = "BTC";

module.exports = function (resultBus, obj) {

	// GLDPAMPBAROZ market.
	var data = obj[ 'gold-btc' ];
	if( data ) {
		resultBus.emit( "result", {
			"source": name,
			"token": "GLDPAMPBAROZtoBTC",
			"bid": parseFloat( data.highest_bid ),
			"ask": parseFloat( data.lowest_ask ),
			"low": parseFloat( data.lowest_deal_price ),
			"high": parseFloat( data.highest_deal_price )
		});
	}
};
