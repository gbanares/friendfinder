$(document).ready(function() {
  var questions = [
    "I enjoy cooking.",
    "I believe I have a fantastic singing voice.",
    "I like animals.",
    "I like proposal stories.",
    "I like numbers and working with them.",
    "I enjoy having a large family.",
    "I am a spiritual person.",
    "I enjoy my friends company.",
    "I am close with my family.",
    "I can find the positive in any situation."
  ];

  // answer scale
  var choices = [
    "1 (Strongly Disagree)",
    "2 (Disagree)",
    "3 (Neutral)",
    "4 (Agree)",
    "5 (Strongly Agree)"
  ];

  // set count to 0.
  var questionList = $("#questions");
  i = 0;

  // post each question
  questions.forEach(function(question) {
    i++;
    var item = $('<div class="question">');
    var headline = $("<h4>").text("Question " + i);
    var questionText = $("<p>").text(question);
    var dropDown = $('<div class="form-group">');
    var select = $('<select class="form-control selector">');

    choices.forEach(function(choice) {
      var option = $("<option>").text(choice);
      select.append(option);
    });
    select.attr("id", "select" + i);

    dropDown.append(select);
    item.append(headline, questionText, dropDown);
    var br = $("<br>");
    questionList.append(item, br);
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();

    var userName = $("#userName").val();
    var imageLink = $("#imageLink").val();

    if (userName.length > 0 && imageLink.length > 0) {
      var answers = [];

      Object.keys($(".selector")).forEach(function(key) {
        if (answers.length < questions.length) {
          answers.push($(".selector")[key].value.charAt(0));
        }
      });

      var surveyData = {
        name: userName,
        photo: imageLink,
        answers: answers
      };

      $.post("/api/friends", surveyData, function(data) {
        if (data) {
          $("#modalContent").empty();
          $("#userName").val("");
          $("#imageLink").val("");
          data.forEach(function(profile) {
            var profileMatch = $('<div class="profile">');
            var name = profile.name;
            var photoURL = profile.photo;
            var nameHeader = $("<h3>").text(name);
            var photo = $("<img>").attr("src", photoURL);
            profileMatch.append(nameHeader, photo);
            $("#modalContent").append(profileMatch);
          });
          if (data.length > 1) {
            $(".modal-title").text("Your best matches!");
          } else {
            $(".modal-title").text("Your best match!");
          }
          $("#resultModal").modal();
        }
      });
    } else {
      $("#errorModal").modal();
      setTimeout(function() {
        $("#errorModal").modal("hide");
      }, 5000);
    }
  });
});
