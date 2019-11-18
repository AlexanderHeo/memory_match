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
var max_matches = 1;
var attempts = 0;
var games_played = 0;

function handleCardClick(event) {

  //$(event.currentTarget) is the div where the event of click happened
  //which is div.cards, searches for child div with class of .cardBack
  //and checks to see if that child has a class of .hidden
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
    //and we start process of comparing cards
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
    //first and secondCardClicked, the value is the url of the images
    var firstCardImage = firstCardClicked.css("background-image");
    var secondCardImage = secondCardClicked.css("background-image");

    //grab class of matched card and save as var matchedClass
    var matchedCardBackClass = firstCardClicked.attr('class');
    var stringLength = matchedCardBackClass.length;
    var matchedClass = matchedCardBackClass.substring(10,stringLength);


    //if value of both image urls are equivalent
    //the value of matches is incremented by 1
    //values of first and secondCardClicked are reset
    //and click listener that will call handleCardClick is
    //turned on for all div.cards
    if (firstCardImage === secondCardImage) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".cards").on("click", handleCardClick);

      //call function to bring up the spanish question
        //modal, sending an arguement of the class of
        //the matched cards
      spanishQuestion(matchedClass);
      /* *****************************************
      ********************************************
      *****************************************
      need an if loop here to end round or flip cards
      back depending on whether spanish answer
      is true or false*/

      //if value of matches is equal to max_matches (9)
      //the .hidden class is removed from div.winModal to expose it
      //value of games_played is incremented by 1
      //resetStats is called to reset the game
      //and then exit function (without the return, function jumps
      //to line 101)
      if (max_matches === matches) {
        $(".winModal").removeClass("hidden");
        games_played++;
        resetStats();
        return;
      }
      //otherwise first and secondCardClicked do not hold equal value
      //which means same pictures were not clicked
      //wait 1.5 seconds before removing .hidden class from
      //"exposed" cards
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
function displayStats() {
  var accur = calculateAccuracy();
  $(".statsPlayed").text(games_played);
  $(".statsAttempt").text(attempts);
  $(".statsAccuracy").text(accur + "%");
}

//takes the number of matches made divided by number of attempts
//and sets that value to the variable percentage
//the value of percentage is multiplied by 100, then rounds it to the
//nearest integer, to return a whole number between 0-100
function calculateAccuracy() {
  var percentage = matches / attempts;
  return Math.round(percentage * 100);
}

//resets values of matches and attempts for new game
//call displayStats to update stats
//selects div.statsAccuracy and sets text of that div to 0%
//because displayStats will return NaN after dividing by 0
//removes class .hidden from all children divs of div.cards with class .cardBack
//which "flips" the cards exposing the cardBack again
//empty div.main to make room for next round of cards
//adds class .hidden to div.winModal after 2 seconds, to hide the modal
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

//dynamically creating all row and card divs
//create global variable set as array of all class names twice
//so there will be two cards to match

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

/*function createRowsOfCards
create var h and set to 0 outside of loop to prevent infinite loop
  this var will be used as index to pull card classes from randomized array
select div.main and set to var mainCont
create div.row set as var newRow and loop 3x to create 3 divs.row
  loop 6x to create six div.card
    create div.cards set as var newCard
    create div.cardBack set as var newCardBack
    create div.cardFront set as var newCardFront
    add a class from the randomized array cardClassArray at index h, to newCardBack
      increment h so it will grab the next index with each loop
    append newCardBack and newCardFront to newCard
    append newCard to newRow
append newRow to .main
*/
function createRowsOfCards() {
  var h = 0;
  var mainCont = $('.main');
  for (var rows = 0; rows < 3; rows++) {
    var newRow = $('<div>', { class: 'row' });

    for (var cards = 0; cards < 6; cards++) {
      var newCard = $('<div>', { class: 'cards' });
      var newCardFront = $('<div>', { class: 'cardFront' });
      var newCardBack = $('<div>', { class: 'cardBack, hidden' });

      newCardFront.addClass(cardClassArray[h]);
      h++

      newCard.append(newCardFront);
      newCard.append(newCardBack);
      newRow.append(newCard);
    }
    mainCont.append(newRow);
  }
}

//randomize the array of all card classes using Fisher Yates shuffle
function cardClassRandom(array) {
  var arrLength = array.length, temp, randomIndex;

  // while there remain elements to shuffle…
  while (arrLength) {
    //use the .floor method to round down, because arrays are index 0
    //and to prevent from choosing the final index of the front portion
    //effectively doing nothing
    //multiplying a decrementing arrLength keeps the already
    //"shuffled" index at the end, and only shuffles from the
    //front portion of the array
    randomIndex = Math.floor(Math.random() * arrLength--);
    //takes randomIndex and swap it with the arrLength using temp var
    temp = array[arrLength];
    array[arrLength] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

//function for spanish question modal to win the point
//takes a parameter of a string called cardClass
//create children divs of div.spanishModal
  //attach click listener on each button that returns
  //the text of clicked button, set as value of var clickedAnswer
//create array of spanish words, send as argument to
  //cardClassRandom function to randomize entire array
  //then .unshift(cardClass) to add the matched card's
  //class to beginning of array.
  //send array as argument to
  //spanishWordsRandom to randomize first four
  //indexes of array to use
  //as random answer in spanish question modal
//takes first four indexes of randomized array
  //set as text of spanishAnswerButtons
//if cardClass === clickedAnswer return true,
  //otherwise, return false
  //addClass hidden to div.winModal and empty()
  //all children divs
var spanishWords = [
  'hoy', 'manana', 'ayer', 'hora', 'que', 'nada', 'todo', 'uno', 'dos', 'tres', 'quatro', 'cinco', 'siete', 'sies', 'ocho', 'nueve, dias'
];

function spanishQuestion(cardClass) {
debugger;
  var spanishAnswers = $('<div>', { class: 'spanishAnswers'});
  var spanishQuestion = $('<div>', { class: 'spanishQuestion'});
  var spanishModal = $('.spanishModal');

  spanishModal.append(spanishQuestion);
  for (var i=0; i<4; i++) {
    var spanishButton = $('<div>', { class: 'spanishAnswerButton'});

    spanishAnswers.append(spanishButton);
  }
  spanishModal.append(spanishAnswers);
  spanishButton.on('click', spanishCompare);
}

function spanishCompare (event) {



}

  var randomSpanishWords =  cardClassRandom(spanishWords);


//use Fisher Yates method to shuffle only first four positions
function spanishWordsRandom(array) {
  var arrLength = array.length, temp, randomIndex;

  // only shuffle first four elements
  while (arrLength < 4) {
    //use the .floor method to round down, because arrays are index 0
    //and to prevent from choosing the final index of the front portion
    //effectively doing nothing
    //multiplying a decrementing arrLength keeps the already
    //"shuffled" index at the end, and only shuffles from the
    //front portion of the array
    randomIndex = Math.floor(Math.random() * arrLength--);
    //takes randomIndex and swap it with the arrLength using temp var
    temp = array[arrLength];
    array[arrLength] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
