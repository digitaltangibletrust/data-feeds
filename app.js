var restify = require("restify");
var config = require("config");
var server = restify.createServer(config.app);
var models = require("./models/index.js");
server.use(restify.fullResponse());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.throttle({
  "burst": 100,
  "rate": 50,
  "ip": true,
  "overrides": {
    "192.168.1.1": {
      "rate": 0, // unlimited
      "burst": 0
    }
  }
}));
var availableIntervals = ["day", "hour", "month"];
var defaultInterval = "hour";

function validateInterval(interval) {
  if (!interval) {
    return defaultInterval;
  }
  if (availableIntervals.indexOf(interval) === -1) {
    return defaultInterval;
  }
  return interval;
}
server.get("/feed", function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = ["1 " + interval];
  models.sequelize.query("SELECT source as exchange, token, bid, ask, low, high, date_trunc('second', created_at) FROM data WHERE created_at > (NOW() - ?::interval) ORDER BY id DESC", null, {
    "raw": true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.get("/feed/:exchange", function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = [req.params.exchange, "1 " + interval];
  models.sequelize.query("SELECT source as exchange, token, bid, ask, low, high, date_trunc('second', created_at) FROM data WHERE source=? AND created_at > (NOW() - ?::interval) ORDER BY id DESC", null, {
    "raw": true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.get("/feed/:exchange/:token", function (req, res, next) {
  var interval = validateInterval(req.params.interval);
  var params = [req.params.exchange, req.params.token, "1 " + interval];
  models.sequelize.query("SELECT source as exchange, token, bid, ask, low, high, date_trunc('second', created_at) FROM data WHERE source=? AND token= ? AND created_at > (NOW() - ?::interval) ORDER BY id DESC", null, {
    "raw": true
  }, params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.get("/tokens", function (req, res, next) {
  models.sequelize.query("SELECT DISTINCT token FROM data", null, {
    "raw": true
  }).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.get("/exchanges", function (req, res, next) {
  models.sequelize.query("SELECT DISTINCT source as exchange FROM data", null, {
    "raw": true
  }).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.listen(config.port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
