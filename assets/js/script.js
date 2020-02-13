$(document).ready(initializeApp);

var cardClassArray = ['aang', 'aangGlow', 'air', 'appa', 'azula', 'azulaBlue',
  'earth', 'fire', 'iroh', 'irohSmiling', 'katara', 'kataraCoat', 'momo',
  'sokka', 'sokkaSmiling', 'suki', 'toph', 'tophBeifong', 'tuiAndLa', 'water',
  'zuko', 'zukoFlames'];
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var firstCard = null;
var secondCard = null;
var max_matches = 1;
var games_played = 0;
var attempts = 0;

function initializeApp() {
  var cardClass = randomize(cardClassArray);
  createGameboard(cardClass);
  addClickHandlers();
}

function randomize(cardClassArray) {
  var shuffled = shuffle(cardClassArray);
  var firstShuffled = shuffled.splice(0,9);
  var copyArray = [...firstShuffled];
  var secondShuffled = shuffle(copyArray);
  var combinedArray = firstShuffled.concat(secondShuffled);
  var cardClasses = shuffle(combinedArray);
  return cardClasses;
}

function shuffle(array) {
  var arrLength = array.length, temp, randomIndex;
  while (arrLength) {
    randomIndex = Math.floor(Math.random() * arrLength--);
    temp = array[arrLength];
    array[arrLength] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function createGameboard(cardClass) {
  var h = 0;
  var gameboard = $('.gameboard');
  for (var rows = 0; rows < 3; rows++) {
    var row = $('<div>', { class: 'row' });
    for (var cards = 0; cards < 6; cards ++) {
      var card = $('<div>', { class: 'cards' });
      var cardFront = $('<div>', { class: 'cardFront' });
      var cardBack = $('<div>', { class: 'cardBack' });
      cardFront.addClass(cardClass[h]);
      h++;
      card.append(cardFront);
      card.append(cardBack);
      row.append(card);
    }
    gameboard.append(row);
  }
}

function addClickHandlers() {
  $('.startModalButton').on('click', startGame);
  $('.winModalButton').on('click', restartGame);
  $('.cards').on('click', handleCardClick);
  $('.cheatMode').on('click', cheatMode);
}

function cheatMode() {
  $('.cardBack').addClass('hide');
}

function startGame() {
  $('.startModalContainer').addClass('hide');
}

function restartGame() {
  $('.winModalContainer').addClass('hide');
  $('.row').remove();
  initializeApp();
  matches = 0;
  attempts = 0;
}

function handleCardClick(event) {
  var eventTarget = $(event.currentTarget);

  eventTarget.find('.cardBack').removeClass('back').addClass('backFlip');
  eventTarget.find('.cardFront').removeClass('front').addClass('frontFlip');

  if (!firstCardClicked) {
    firstCardClicked = eventTarget;
    $(firstCardClicked).off('click', handleCardClick);
  } else {
    secondCardClicked = eventTarget;
    firstCard = firstCardClicked[0].children[0].classList[1];
    secondCard = secondCardClicked[0].children[0].classList[1];
    if (firstCard && secondCard) {
      $('.cards').off('click', handleCardClick);
    }
    if (firstCard === secondCard) {
      matches++;
      games_played++;
      firstCardClicked = null;
      secondCardClicked = null;
      firstCard = null;
      secondCard = null;
      $('.cards').on('click', handleCardClick);
      if (max_matches === matches) {
        setTimeout(function () {
          $('.winModalContainer').removeClass('hide');
          return;
        }, 2000);
      }
    } else {
      setTimeout(function () {
        firstCardClicked.find('.cardFront').removeClass('frontFlip').addClass('front');
        firstCardClicked.find('.cardBack').removeClass('backFlip').addClass('back');
        secondCardClicked.find('.cardFront').removeClass('frontFlip').addClass('front');
        secondCardClicked.find('.cardBack').removeClass('backFlip').addClass('back');
        firstCardClicked = null;
        secondCardClicked = null;
        firstCard = null;
        secondCard = null;
        $('.cards').on('click', handleCardClick);
      }, 1000);
    }
  }
}

/*
function handleCardClick(event) {
  var eventTarget = $(event.currentTarget);
  // console.log(event.currentTarget);
  console.log('eventTarget:', eventTarget);
  eventTarget.find('.cardBack').removeClass('back').addClass('backFlip');
  eventTarget.find('.cardFront').removeClass('front').addClass('frontFlip');
  var clickedCard = eventTarget[0].children[0].classList[1];
  console.log('clickedCard:', clickedCard);
  if (!firstCardClicked) {
    firstCard = eventTarget;
    console.log('firstCard:', firstCard);
    firstCardClicked = clickedCard;
  } else {
    secondCard = eventTarget;
    console.log('firstCard:', firstCard);
    console.log('secondCard:', secondCard);
    secondCardClicked = clickedCard;
    if (firstCardClicked && secondCardClicked) {
      $('.cards').off("click", handleCardClick);
    }
    if (firstCardClicked === secondCardClicked) {
      console.log('CARDS MATCH');
      firstCardClicked = null;
      secondCardClicked = null;
      $('.cards').on('click', handleCardClick);
    } else {
      setTimeout(() => {
        // console.log('firstCardClicked:', firstCardClicked);
        // console.log('secondCardClicked:', secondCardClicked);
        // console.log('firstCard:', firstCard);
        // console.log('secondCard:', secondCard);
        firstCard.find('cardFront').removeClass('frontFlip').addClass('front');
        firstCard.find('cardBack').removeClass('backFlip').addClass('back');
        secondCard.find('cardFront').removeClass('frontFlip').addClass('front');
        secondCard.find('cardBack').removeClass('backFlip').addClass('back');

        firstCardClicked = null;
        secondCardClicked = null;
        $('.cards').on('click', handleCardClick);
      }, 1500);
    }
  }

}
*/
