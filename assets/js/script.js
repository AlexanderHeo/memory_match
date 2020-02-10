$(document).ready(initializeApp);

var cardClassArray = ['aang', 'aangGlow', 'air', 'appa', 'azula', 'azulaBlue',
  'earth', 'fire', 'iroh', 'irohSmiling', 'katara', 'kataraCoat', 'momo',
  'sokka', 'sokkaSmiling', 'suki', 'toph', 'tophBeifong', 'tuiAndLa', 'water',
  'zuko', 'zukoFlames'];
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

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
      var cardFront = $('<div>', { class: 'cardFront front' });
      var cardBack = $('<div>', { class: 'cardBack back' });
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
}

function startGame() {
  $('.startModalContainer').addClass('hide');
}

function restartGame() {
  $('.winModalContainer').addClass('hide');
}

function handleCardClick(event) {
  var eventTarget = $(event.currentTarget);

  eventTarget.find('.cardBack').toggleClass('backFlip');
  eventTarget.find('.cardFront').toggleClass('frontFlip');
  var clickedCard = eventTarget[0].children[0].classList[2];
  if (!firstCardClicked) {
    firstCardClicked = clickedCard;
  } else {
    secondCardClicked = clickedCard;
  }
}
