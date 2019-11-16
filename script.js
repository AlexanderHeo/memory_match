//calls initalizeApp when document is loaded
$(document).ready(initializeApp);

//creates a click handler on all div.cards that will call handleCardClick
function initializeApp() {
  cardClassRandom(cardClassArray);
  createRowsOfCards();
  $(".cards").on("click", handleCardClick);

}

//variables created in global space, so can be used in multiple functions
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 2;
var attempts = 0;
var games_played = 0;

function handleCardClick(event) {
  //$(event.currentTarget) is the div where the event of click happened
  //which is div.cards, searches for child div with class of .cardBack
  //and checks to see if it has a class of .hidden
  //if it does have the .hidden class, exit function
  //this prevents reclicking on an already clicked card
  if ($(event.currentTarget).find(".cardBack").hasClass("hidden")) {
      return;//to exit function
    }

  //created two new variables to hold values of div.cardBack and div.cardFront
  //of the div.card that was clicked.
  //class of .hidden is added to div.cardBack to hide the card back image
  //revealing the front card image
  var clickedCardBack = $(event.currentTarget).find(".cardBack");
  var clickedCardFront = $(event.currentTarget).find(".cardFront");
  clickedCardBack.addClass("hidden");

  //checks to see if firstCardClicked has a value
  //if not, then div.cardFront is set as value
  //if firstCardClicked does have a value, then
  //div.cardFront is set as value of secondCardClicked
  if (!firstCardClicked) {
    firstCardClicked = clickedCardFront;
  } else {
    secondCardClicked = clickedCardFront;

    //if both firstCardClicked and secondCardClicked holds a value
    //turn off click listener that will call handleCardClick
    //on all div.cards, effectively preventing any stray clicks
    //while this function is running
    if (firstCardClicked && secondCardClicked) {
      $(".cards").off("click", handleCardClick);
    }

    //created two new divs to hold the background-image of
    //both cardsClicked
    //the value is the url of the images clicked
    var firstCardImage = firstCardClicked.css("background-image");
    var secondCardImage = secondCardClicked.css("background-image");

    //if value of both image urls are equivalent
    //the value of matches is incremented by 1
    //values of first and secondCardClicked is reset
    //and click listener that will call handleCardClick is
    //turned on for all div.cards
    if (firstCardImage === secondCardImage) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);

      //if value of matches is equal to max_matches (9)
      //the .hidden class is removed from div.winModal to expose it
      //value of games_played is incremented by 1
      //resetStats is called to reset the game
      //and then exit function
      if (max_matches === matches) {
        $(".winModal").removeClass("hidden");
        games_played++;
        resetStats();
        return;
      }
      //otherwise first and secondCardClicked do not hold equal value
      //which means same pictures were not clicked
      //wait 1.5 seconds before removing .hidden class from
      //first and secondCardClicked
      //reset values of first and secondCardClicked back to null
      //so they are ready for the next attempt
    } else {
      setTimeout(function () {
      firstCardClicked.siblings().removeClass("hidden");
      secondCardClicked.siblings().removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);
      }, 1500);
    }
    //after it has been decided the cards match or do not match
    //value of attempts is incremented by 1
    //displayStats is called, which updates the stats
    attempts++;
    displayStats();
  }
}
//value returned from function calculateAccuracy is stored in variable accur
//div.statsPlayed is selected, and the value of games_played is set as the text of that div
//div.statsAttempt is selected and the value of attempts is set as the text of that div
//div.statsAccuracy is selected and the value of accur is set as the text of that div
function displayStats () {
  var accur = calculateAccuracy();
  $(".statsPlayed").text(games_played);
  $(".statsAttempt").text(attempts);
  $(".statsAccuracy").text(accur);
}

//takes the number of matches made divided by number of attempts
//and sets that value to the variable percentage
//the value of percentage is multiplied by 100, then rounds it to the
//nearest integer, to return a whole number between 0-100
function calculateAccuracy () {
  var percentage = matches/attempts;
  return Math.round(percentage*100);
}

//resets values of matches and attempts for new game
//call displayStats to update stats
//selects div.statsAccuracy and sets text of that div to 0%
//removes class .hidden from all children divs of div.cards with class .cardBack
//which "flips" the cards exposing the card back again
//adds class .hidden to div.winModal after 2 seconds, to hide the modal
function resetStats () {
  matches = 0;
  attempts = 0;
  displayStats();
  $(".statsAccuracy").text('0%');
  $(".cards").children(".cardBack").removeClass("hidden");
  // debugger;
  setTimeout(function() {
    $(".winModal").addClass("hidden");
  }, 2000)
  // debugger;
  // $('.main').removeChild();
  $('.main').empty();
  initializeApp();
  // cardClassRandom(cardClassArray);
  // createRowsOfCards();
  // initializeApp();
}

//*****************************************************************
//dynamically creating all card divs

var h=0;
var cardClassArray =[
  'css', 'css',
  'docker', 'docker',
  'gitHub', 'gitHub',
  'html', 'html',
  'js', 'js',
  'mysql', 'mysql',
  'node', 'node',
  'php', 'php',
  'react', 'react',
];

/* PSEUDO FOR - function createRowsOfCards
create div.row set as var newRow (looped 3x) {
  create div.cards set as var newCard (looped 6x) {
    create div.cardBack set as var newCardBack
    create div.cardFront set as var newCardFront
      addClass(.hidden) to newCardFront
      addClass(randomizedCardClass[h]) to newCardBack
      append newCardBack and newCardFront to newCard
      h++ (so next loop will use next index of randomizedCardClass[])
    }
    append newCard to newRow
  }
  append newRow to .main
  */

function createRowsOfCards() {
  var h=0;
  var mainCont = $('.main');
  for (var rows=0; rows<3; rows++) {
    var newRow = $('<div>', {class: 'row'});

    for (var cards=0; cards<6; cards++) {
      var newCard = $('<div>', {class: 'cards'});
      var newCardFront = $('<div>', {class: 'cardFront'});
      var newCardBack = $('<div>', {class: 'cardBack'});

      newCardFront.addClass(cardClassArray[h]);
      h++

      newCard.append(newCardFront);
      newCard.append(newCardBack);
      newRow.append(newCard);
    }
    mainCont.append(newRow);
  }
}












  // function createRowsOfCards ()
//   var newRow = $('<div>').addClass('row');

//     for (var row=0; row<6; row++) {

//       for (var card = 0; card < 6; card++) {
//         var newCard = $('<div>').addClass('cards');
//         var newCardBack = $('<div>').addClass('cardBack');
//         var newCardFront = $('<div>').addClass('cardFront');
//         newCard.append(newCardFront);
//         newCard.append(newCardBack);
//           // while (h<18) {
//           // newCardFront.addClass('cardFront').addClass(cardClassArray[h]);
//           // h++;
//           // }
//       }
//       newRow.append(newCard);
//     }
//     $('.main').append(newRow);
// }

// function createRowsOfCards() {
//   debugger;
//   var newCard = $('<div.cards>');
//   var newCardBack = $('<div.cardBack>');
//   var newCardFront = $('<div.cardFront>');
//   var newRow = $('<div.row>');
//   for (var k=0; k<3; k++) {
//     for (var j=0; j<3; j++) {
//       for (var i=0; i<6; i++) {
//         newCardBack.addClass("cardBack hidden");
//         while (h<18) {
//           newCardFront.addClass(cardClassArray[h]);
//           h++
//         }
//         newCard.append(newCardFront);
//         newCard.append(newCardBack);
//       }
//       $('.cardRow:nth-of-type(j+1)'.append(newCard));
//     }
//   }
// }

//randomize the array of all card classes
function cardClassRandom(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}



/* ********************************************************************
spanish module feature
when two cards match, value of var englishWord = english word
  -take name of class of cardFront, slice off . to return just the word
  -take value of englishWord and find equivalent word in spanish
    -from object with english keys and spanish values
  -value of var spanishWord = spanish translation
module pops up with message and three buttons with three different  words in spanish
  -Hey, you matched the cards! Now do you know what it is in spanish?
  -buttons will be populated from spanishWordsArray
    -randomize the array via Fisher-Yates method
    -take first three index into array spanishAnswersArray
randomize spanishAnswersArray to populate buttons
  -button with the correct answer will have added class of .answer
    -search for spanishAnswerButton divs with text of spanishWord
    -addClass .hidden to div
if correct spanish word is chosen, cards stay front side up
  -if wrong spanish word is chosen, cards "flip" back*/
