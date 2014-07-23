var config = require("config");
var EE = require("events").EventEmitter;
var rawResults = new EE();
var resultBus = new EE();
var fetchers = {};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function render(source, view, obj) {
	console.dir(arguments);
}

function onError(source, err) {
	console.log("source " + source + " got error: ");
	console.dir(err);
}

for (var source in config.sources) {
	if (config.sources[source].active === true) {
		fetchers[source] = {
			"pull": require("./" + source + "/pull.js"),
			"view": require("./" + source + "/view.js")
		};
		rawResults.on(source, render.bind(null, source, fetchers[source].view));
		fetchers[source].pull(config.sources[source], rawResults, onError.bind(null, source));
	}
}

module.exports.events = resultBus;
