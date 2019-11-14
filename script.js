$(document).ready(initializeApp);

function initializeApp() {
$(".cards").on("click", handleCardClick);
}

function handleCardClick(event) {
  // debugger;
  console.log("event", event);
  var clicked = $(event.currentTarget);
  clicked.find(".cardBack").addClass("hidden");
  console.log('clicked:', clicked);
  // console.log('currentTarget:', event.currentTarget);
  // var clickedOnBack = $("event.currentTarget");//.children();//.find(".cardBack");
  // console.log("clickedOnBack:",clickedOnBack);
  // clickedOnBack.addClass("hidden");
}

// $(document).ready(initializeApp);

// function initializeApp() {
//   $(".cards").on("click", handleCardClick);
// }

// function handleCardClick(event) {
//   console.log('event', event); //"click" of div.cardBack
//   console.log('currentTarget', event.currentTarget); //div.cards
//   debugger;
//   $(event.currentTarget).children().find(".cardBack").addClass("hidden");

//   // target.addClass("hidden");



//   // firstCardClicked = $(event.currentTarget);
//   // firstCardImage = firstCardClicked.parent().find(".cardFront").css("background-image");

//   if (!firstCardClicked) {
//     firstCardClicked = $(event.currentTarget)//.parent().find(".cardFront").css("background-image");
//     // debugger;
//     // var firstCardParent = firstCard.parent()
//     // var firstCardFront = firstCardParent.find(".cardFront")
//     // var firstCardClicked = firstCardFront.css("background-image");
//     // debugger;
//   } else {
//     secondCardClicked = $(event.currentTarget)//.parent().find(".cardFront");
//     // console.log(firstCardImage);
//     // debugger;
//   }


//   // secondCardClicked = secondCard.parent().find(".cardFront").css("background-image");
//   // if ( firstCardClicked === secondCardClicked) {
//   //   matches++;
//   //   } else {
//   //     firstCard.removeClass("hidden");
//   //     secondCard.removeClass("hidden");
//   //   }

// }
