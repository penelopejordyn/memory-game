const gameContainer = document.getElementById("game");
let card1 = null; //stores first flipped card
let card2 = null; //stores second flipped card
let cardsflipped = 0; //counter to keep track of number of flipped cards
let noclicking = false; //flag to prevent clicking in certain conditions
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

if (noclicking) return; //if noclicking is true, do nothing
if (event.target.classList.contains("flipped")) return; //if flipped card is already cliked, do nothing


//selects the current card and changes its color to its class color
let currentCard = event.target;
currentCard.style.backgroundColor = currentCard.classList[0];


//handles card selcection
if (!card1 || !card2) {
  // If either card1 or card2 is not assigned a value
  currentCard.classList.add("flipped"); // Add the "flipped" class to the current card

  if (!card1) {
    // If card1 is not assigned a value
    card1 = currentCard; // Assign the current card to card1
  } else {
    // If card1 is already assigned a value
    if (currentCard === card1) {
      // If the current card is the same as card1
      card2 = null; // Assign null to card2
    } else {
      // If the current card is different from card1
      card2 = currentCard; // Assign the current card to card2
    }
  }
}

if (card1 && card2) {  
  noclicking = true; //sets noclicking to true to prevent clicking on multiple cards during evaluation
  


  //if cards match
  if (card1.className === card2.className) {
    cardsflipped += 2; //increase the number of cards flipped everytime cards match

    //remove this event listner for those cards
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);

    //return cards to no value
    card1 = null;
    card2 = null;
    noclicking = false;
  } else { //if cards dont match
    setTimeout(function() { //wait 1 second

      //set both cards background colors to normal
      card1.style.backgroundColor = ""; 
      card2.style.backgroundColor = "";

      //remove the flipped class
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      //set both back to null
      card1 = null;
      card2 = null;
      noclicking = false;
    }, 1000);
  }
}
//if all cards are flipped, end game
if (cardsflipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
