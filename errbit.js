"use strict";
var config = require("config");
var airbrake = require("airbrake").createClient(config.airbrake.api_key);
airbrake.serviceHost = 'errbit.digitaltangibletrust.com';

airbrake.createErrorThrottle = function(processName, errorInterval) {
  errorInterval = errorInterval || 15 * 60 * 1000; // 15 minutes
  var errorTimers = {};

  return function (spinner, err) {
    if(!err) {
      err = spinner;
      spinner = 'mainloop';
    }

    if (!errorTimers[spinner]){
      errorTimers[spinner] = {};
    }
    var timeStamp = new Date().getTime();
    var previous = errorTimers[spinner][err.toString()] || 0;
    if ( timeStamp - previous > errorInterval) {
      errorTimers[spinner][err.toString()] = timeStamp;
      err.params = err.params || {};
      err.params[processName] = spinner;
      airbrake.notify(err);
    }
  };
};

module.exports = airbrake;
