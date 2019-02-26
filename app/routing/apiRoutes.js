// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
//    * 

// load data 
var friends = require("../data/friends");

// routing

module.exports = function(app) {
    // API GET request
    // when a user visits the pages
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST request
    // when user submits data to server
    // server saves to friends array
    app.post("/api/friends", function(req, res) {
        // server to respond to requests
        // req.body avail since body parsing middleware
        friends.push(req.body);
        res.json(true);
    });
};