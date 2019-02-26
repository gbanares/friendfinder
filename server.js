// dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// express config
var app = express();

// set initial port
var PORT = process.env.PORT || 8080;

// setup express to use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router (to give map of how to respond)
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT + "\n");
});