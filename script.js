$(document).ready(initializeApp);

function initializeApp() {
  cardClassRandom(cardClassArray);
  createRowsOfCards();
  $(".cards").on("click", handleCardClick);
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

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
    var matchedCardBackClass = firstCardClicked.attr('class');
    var stringLength = matchedCardBackClass.length;
    var matchedClass = matchedCardBackClass.substring(10,stringLength);
    if (firstCardImage === secondCardImage) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);
      if (max_matches === matches) {
        $(".winModal").removeClass("hidden");
        games_played++;
        resetStats();
        return;
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
    displayStats();
  }
}

function displayStats() {
  var accur = calculateAccuracy();
  $(".statsPlayed").text(games_played);
  $(".statsAttempt").text(attempts);
  $(".statsAccuracy").text(accur + "%");
}

function calculateAccuracy() {
  var percentage = matches / attempts;
  return Math.round(percentage * 100);
}

function resetStats() {
  setTimeout(function () {
    $(".winModal").addClass("hidden");
    matches = 0;
    attempts = 0;
    displayStats();
    $(".statsAccuracy").text('0%');
    $(".cards").children(".cardBack").removeClass("hidden");
  }, 2000)

  $('.main').empty();
  initializeApp();
}

var cardClassArray = [
  'bag', 'bag',
  'bathroom', 'bathroom',
  'book', 'book',
  'cat', 'cat',
  'desk', 'desk',
  'dog', 'dog',
  'house', 'house',
  'pen', 'pen',
  'shoe', 'shoe',
];

function createRowsOfCards() {
  var h = 0;
  var mainCont = $('.main');
  for (var rows = 0; rows < 3; rows++) {
    var newRow = $('<div>', { class: 'row' });
    for (var cards = 0; cards < 6; cards++) {
      var newCard = $('<div>', { class: 'cards' });
      var newCardFront = $('<div>', { class: 'cardFront' });
      var newCardBack = $('<div>', { class: 'cardBack' });
      newCardFront.addClass(cardClassArray[h]);
      h++
      newCard.append(newCardFront);
      newCard.append(newCardBack);
      newRow.append(newCard);
    }
    mainCont.append(newRow);
  }
}

function cardClassRandom(array) {
  var arrLength = array.length, temp, randomIndex;
  while (arrLength) {
    randomIndex = Math.floor(Math.random() * arrLength--);
    temp = array[arrLength];
    array[arrLength] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
