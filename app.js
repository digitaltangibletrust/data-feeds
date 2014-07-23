var restify = require("restify");
var config = require("config");
var server = restify.createServer(config.app);
var res = require("./fetchers/index.js").spin();
res.on("result", function (result) {
  console.dir(result);
});
server.listen(config.port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
