var restify = require("restify");
var config = require("config");
var server = restify.createServer(config.app);

server.listen(config.port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
