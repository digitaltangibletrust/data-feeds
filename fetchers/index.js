var config = require("config");
var EE = require("events").EventEmitter;
var rawResults = new EE();
var resultBus = new EE();
var fetchers = {};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function onError(source, err) {
	console.log("source " + source + " got error: ");
	console.dir(err);
}
module.exports.spin = function () {
	for (var source in config.sources) {
		if (config.sources[source].active === true) {
			var pull = require("./" + source + "/pull.js");
			var view = require("./" + source + "/view.js");
			rawResults.on(source, view.bind(null, resultBus, source));
			pull(config.sources[source], rawResults, onError.bind(null, source));
		}
	}
	return resultBus;
};
