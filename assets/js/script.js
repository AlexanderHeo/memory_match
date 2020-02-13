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
var max_matches = 9;
var games_played = 0;
var attempts = 0;
var accuracy = '0';

function initializeApp() {
  var cardClass = randomize(cardClassArray);
  createGameboard(cardClass);
  addClickHandlers();
  displayStats();
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
  resetStats();
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
    $(secondCardClicked).off('click'.handleCardClick);
    firstCard = firstCardClicked[0].children[0].classList[1];
    secondCard = secondCardClicked[0].children[0].classList[1];
    if (firstCard && secondCard) {
      $('.cards').off('click', handleCardClick);
    }
    if (firstCard === secondCard) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      firstCard = null;
      secondCard = null;
      setTimeout(function () {
        $('.cards').on('click', handleCardClick);
      }, 500);
      if (max_matches === matches) {
        setTimeout(function () {
          $('.winModalContainer').removeClass('hide');
          games_played++;
          return;
        }, 1500);
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
    attempts++;
    displayStats();
  }
}

function displayStats() {
  accuracy = calculateAccuracy();
  $(".statsPlayed").text(games_played);
  $(".statsAttempt").text(attempts);
  $(".statsAccuracy").text(accuracy + "%");
}

function calculateAccuracy() {
  if (!attempts) {
    return 0;
  }
  return Math.round((matches / attempts) * 100);
}

function resetStats() {
  matches = 0;
  attempts = 0;
  displayStats();
  $(".statsAccuracy").text('0%');
}
