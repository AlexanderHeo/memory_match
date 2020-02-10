$(document).ready(initializeApp);

function initializeApp() {
  // shuffle(cardClassArray);
  createGameboard();
  addClickHandlers();
  addCardClass();
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

function createGameboard() {
  var gameboard = $('.gameboard');
  for (var rows = 0; rows < 3; rows++) {
    var row = $('<div>', { class: 'row' });
    for (var cards = 0; cards < 6; cards ++) {
      var card = $('<div>', { class: 'cards' });
      var cardFront = $('<div>', { class: 'cardFront front' });
      var cardBack = $('<div>', { class: 'cardBack back' });
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
  var clickedCard = $(event.currentTarget);

  clickedCard.find('.cardBack').toggleClass('backFlip');
  clickedCard.find('.cardFront').toggleClass('frontFlip');
}
