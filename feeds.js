var config = require("config");
var models = require("./models/index.js");
if (process.env.SYNC_DB) {
  return models.sequelize.sync({
    "force": true
  }).complete(function (err) {
    console.log("done");
    if (err) {
      console.dir(err);
      return process.exit(1);
    }
    process.exit(0);
  });
}
if (process.env.CREATE_VIEWS) {
  return models.sequelize.query(require("fs").readFileSync("./sql/views.sql").toString()).complete(function (err) {
    console.log("done");
    if (err) {
      console.dir(err);
      return process.exit(1);
    }
    process.exit(0);
  });
}
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
