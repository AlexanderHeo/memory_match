$(document).ready(initializeApp);

function initializeApp() {
$(".cards").on("click", handleCardClick);
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 2;
var attempts = 0;
var games_played = 0;
// var accuracy = 0;

function handleCardClick(event) {
    if ($(event.currentTarget).find(".cardBack").hasClass("hidden")) {
      return;
    }
  var clickedCardBack = $(event.currentTarget).find(".cardBack");
  var clickedCardFront = $(event.currentTarget).find(".cardFront");
  clickedCardBack.addClass("hidden");

  if (!firstCardClicked) {
    firstCardClicked = clickedCardFront;
  } else {
    secondCardClicked = clickedCardFront;

    if (firstCardClicked && secondCardClicked) {
      $(".cards").off("click", handleCardClick);
    }

    var firstCardImage = firstCardClicked.css("background-image");
    var secondCardImage = secondCardClicked.css("background-image");

    if (firstCardImage === secondCardImage) {
      matches++;
      // console.log("matches", matches);
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);
      if (max_matches === matches) {
        $(".winModal").removeClass("hidden");
        games_played++;
        resetStats();
        return;
        // console.log("games_played:", games_played);
      }
    } else {
      setTimeout(function () {
      firstCardClicked.siblings().removeClass("hidden");
      secondCardClicked.siblings().removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);
      }, 1500);
    }
    attempts++;
    // console.log("attempts", attempts);
    displayStats();
  }
}
function displayStats () {
  // if (typeof accuracy ==="string") {
  //   accuracy = 0;
  // }
  var accur = calculateAccuracy();
  $(".statsPlayed").text(games_played);
  $(".statsAttempt").text(attempts);
  $(".statsAccuracy").text(accur);
}

function calculateAccuracy () {
  var percentage = matches/attempts;
  return Math.round(percentage*100);
}

function resetStats () {
  // debugger;
  matches = 0;
  attempts = 0;
  // games_played++;
  displayStats();
  $(".statsAccuracy").text('0%');
  $(".cards").children(".cardBack").removeClass("hidden");
  setTimeout(function() {
    $(".winModal").addClass("hidden");
  }, 2000)
}
