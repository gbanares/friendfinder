// dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// express config
var app = express();

// initial port
var PORT = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));

// routers
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT + "\n");
});