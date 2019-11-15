$(document).ready(initializeApp);

function initializeApp() {
$(".cards").on("click", handleCardClick);
randomizeCardClass();
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function handleCardClick(event) {
    if ($(event.currentTarget).find(".cardBack").hasClass("hidden")) {
      return;
    }
  // debugger;
  // console.log("event", event);
  var clickedCardBack = $(event.currentTarget).find(".cardBack");
  var clickedCardFront = $(event.currentTarget).find(".cardFront");
  clickedCardBack.addClass("hidden");
  // console.log('clickedCardBack:', clickedCardBack);

  if (!firstCardClicked) {
    firstCardClicked = clickedCardFront;
  } else {
    secondCardClicked = clickedCardFront;
    var firstCardImage = firstCardClicked.css("background-image");
    var secondCardImage = secondCardClicked.css("background-image");

    if (firstCardImage === secondCardImage) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
      firstCardClicked.siblings().removeClass("hidden");
      secondCardClicked.siblings().removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      }, 1500);
    }
  }
}


// randomize cardClasses and use jQuery to add them to proper divs
// will need to use each class twice, and no more...
// function randomizeCardClass () {
//   var cardFrontClasses = [".css", ".docker", "gitHub", "html", "js", "mysql", "node", "php", "react"];

//   var classIndex = Math.floor(Math.random() *10)+1;

// }
