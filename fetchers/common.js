module.exports = {
  fetchCallback: function(eventEmitter, interval) {
    return function(callback) {
      return function (err, response, body) {
        if (err) {
          if(err.code !== "ETIMEDOUT") return callback(err);
        }
        else body && eventEmitter(body);
        setTimeout(callback, interval);
      }
    }
  }
}