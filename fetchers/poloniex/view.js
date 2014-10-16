var name = "poloniex";
var currencyOne = "BTC";
var currencies = {
	// Poloniex's token name -> Our token name.
	'BTC_GOLD': 'GOLDDTT'
}

module.exports = function (resultBus, obj) {

	Object.keys( currencies ).forEach( function( key ) {
		var val = obj[ key ];
		if( val ) {
			var result = {
				"source": name,
				"token": currencies[ key ] + "to" + currencyOne,
				"bid": parseFloat( val.highestBid ),
				"ask": parseFloat( val.lowestAsk ),
		// Poloniex won't give us real highs and lows for the last 24 hour period.
		// They only update their historical data at the end of each day, it appears.
		// This allows us to enter a value in the Not-Null column of the database,
		// yet end up with null values in the JSON sent up to the client.
				"low": 'NaN',
				"high": 'NaN'
			};
			resultBus.emit( "result", result );
		}
	});

};
