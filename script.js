$(document).ready(initializeApp);

function initializeApp () {
$(".cards").on("click", handleCardClick());
}
function handleCardClick (event) {
  // debugger;
  console.log("event", event);
  // console.log('currentTarget:', event.currentTarget);
  $(".cardBack").addClass(hidden);
}
