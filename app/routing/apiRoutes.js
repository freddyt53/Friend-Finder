var teamMates = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(teamMates);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var bestTeamMateIndex = 0;
    var minimumDifference = 40;

    
    // the for-loop has the logic to find the best teammate
    for(var i = 0; i < teamMates.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < teamMates[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - teamMates[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      if(totalDifference < minimumDifference) {
        bestTeamMateIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    teamMates.push(user);

    // send back to browser the best friend match
    res.json(teamMates[bestTeamMateIndex]);
    console.log(teamMates[bestTeamMateIndex]);
  });
};