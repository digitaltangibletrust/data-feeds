var config = require("config");
var models = require("./models/index.js");
var res = require("./fetchers/index.js").spin();
res.on("result", function (result) {
  if (result.bid > 0) {
    models.data.create(result).complete(function (err) {
      if (err) {
        console.dir(err);
      }
    });
  }
});
console.log("feed is starting");
