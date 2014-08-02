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

server.get("/feed", function (req, res, next) {
  var resolutions = models.data.getResolution();

  var params = {
    "resolution": resolutions["1m"]
  };
  if (req.params.res) {
    if (resolutions[req.params.res]) {
      params.resolution = resolutions[req.params.res];
    }
  }
  if (req.params.limit) {
    params.limit = req.params.limit;
  }
  if (req.params.exchange) {
    params.exchange = req.params.exchange;
  }
  if (req.params.order) {
    params.order = req.params.order;
  }
  if (req.params.token) {
    params.token = req.params.token;
  }
  models.data.getData(params).complete(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
    next();
  });
});
server.get("/latest", function (req, res, next) {
  var token = req.params.token || "USDtoBTC";
  models.data.getLatestPrices(token).complete(function (err, data) {
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
