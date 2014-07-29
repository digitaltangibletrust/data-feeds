var restify = require("restify");
var config = require("config");
var server = restify.createServer(config.app);
var models = require("./models/index.js");
server.use(restify.fullResponse());

server.get("/feed", function (req, res) {

});
server.get("/feed/:exchange", function (req, res) {

});
server.get("/feed/:exchange/:token", function (req, res) {

});
server.get("/tokens", function (req, res) {

});
server.get("/exchanges", function (req, res) {

});
server.listen(config.port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
