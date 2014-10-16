var config = require("config");
var airbrake = require("airbrake").createClient(config.airbrake.api_key);
airbrake.serviceHost = 'errbit.digitaltangibletrust.com';

module.exports = airbrake;
