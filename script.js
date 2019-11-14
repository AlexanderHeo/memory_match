$(document).ready(initializeApp);

function initializeApp() {
$(".cards").on("click", handleCardClick);
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function handleCardClick(event) {
  // debugger;
  // console.log("event", event);
  var clickedCardBack = $(event.currentTarget).find(".cardBack");
  var clickedCardFront = $(event.currentTarget).find(".cardFront");
  clickedCardBack.addClass("hidden");
  // console.log('clickedCardBack:', clickedCardBack);

  if (!firstCardClicked) {
    firstCardClicked = clickedCardFront;
  } else {
    // debugger
    secondCardClicked = clickedCardFront;
  }

  // console.log('firstCardClicked:', firstCardClicked);
  // console.log('secondCardClicked:', secondCardClicked);
  var firstCardImage = firstCardClicked.css("background-image");
  var secondCardImage = secondCardClicked.css("background-image");
  // debugger;
  // console.log("firstCardImage:", firstCardImage);
  // console.log("secondCardImage:", secondCardImage);
  if (firstCardImage === secondCardImage) {
    matches++;
    console.log("cards match!");
    console.log("matches:",matches);
  } else {
    console.log("cards do not match!");
    console.log("matches:", matches);
    // firstCardClicked.siblings().removeClass('hidden');
    // secondCardClicked.siblings().removeClass('hidden');

    // console.log('firstCardClicked:', firstCardClicked);
    // console.log('secondCardClicked:', secondCardClicked);
    setTimeout(function(){firstCardClicked.siblings().removeClass("hidden");}, 1500);
    setTimeout(function(){secondCardClicked.siblings().removeClass("hidden");}, 1500);
  }
}
