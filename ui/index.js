var css = require("sheetify");
var choo = require("choo");

css("tachyons");

var app = choo();
if (process.env.NODE_ENV !== "production") {
  app.use(require("choo-devtools")());
  app.use(require("choo-log")());
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}
app.use(require("./store"));
app.route("/", require("./views/main"));
app.route("#lang", require("./views/lang"));
app.route("/*", require("./views/404"));
app.route("/start_game", require("./views/game"));
if (!module.parent) app.mount("body");
else module.exports = app;
