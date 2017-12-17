var bankai = require("bankai/http");
var http = require("http");
var path = require("path");
var router = require("routes")();
var fs = require("fs");

var compiler = bankai(path.join(__dirname, "ui"));
var server = http.createServer(function(req, res) {
  var m = router.match(req.method + " " + req.url);
  if (m) m.fn(req, res, m);

  compiler(req, res, function() {
    res.statusCode = 404;
    res.end("not found");
  });
});

server.listen(8081, function() {
  console.log("listening on port 8081");
});

router.addRoute("GET /options", function(req, res, m) {
  console.log("dans la route");
  let data = fs.readdirSync("./words/words.old/");
  res.end(JSON.stringify({ data }) + "\n");
});

router.addRoute("GET /langue/:name", function(req, res, m) {
  console.log(m.params);
  let data = fs
    .readFileSync(`./words/words.old/${m.params.name}`)
    .toString()
    .split("\n");
  res.end(JSON.stringify({ data }) + "\n");
});
