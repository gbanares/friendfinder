var friendsList = require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendsList);
    });

    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        var differences = [];

        if (friendsList.length > 1) {
            friendsList.forEach(function(user) {
                var totalDifference = 0;
                for (var i = 0; i < newFriend.answers.length; i++) {
                    var otherAnswer = user.answers[i];
                    var thisAnswer = newFriend.answers[i];
                    var difference = +otherAnswer - +thisAnswer;
                    totalDifference += Math.abs(difference);
                }
                differences.push(totalDifference);
            });

            var minimumDifference = Math.min.apply(null, differences);
            var bestMatches = [];

            // minimumDifference + add friendsList to array.
            for (var i = 0; i < differences.length; i++) {
                if (differences[i] === minimumDifference) {
                    bestMatches.push(friendsList[i]);
                }
            }

            // best match
            res.json(bestMatches);
        } else {
            res.json(friendsList);
        }
        // add friend to list 
        friendsList.push(newFriend);
    });
};