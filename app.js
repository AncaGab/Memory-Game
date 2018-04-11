
/*
 * Create a list that holds all of your cards
 */

let listCards = 
        ["fa-diamond", 
        "fa-paper-plane-o", 
        "fa-anchor", 
        "fa-bolt", 
        "fa-cube", 
        "fa-anchor", 
        "fa-leaf", 
        "fa-bicycle", 
        "fa-diamond", 
        "fa-bomb", 
        "fa-leaf", 
        "fa-bomb", 
        "fa-bolt", 
        "fa-bicycle", 
        "fa-paper-plane-o", 
        "fa-cube"];
 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(listCards);

console.log(listCards);  


const deck = document.querySelector('.deck');
let checkList = [];
let moves = document.querySelector('.moves');
const modalContent = document.querySelector('.modal-content');
const stars = document.querySelector('.stars');


/*
 * I build the 16 li and their class and add them to the deck.
 * Use setAttribute for the card class ago (the things on the list [])
 */


for(i=0; i<16; i++) {
    const newCard = document.createElement('li')

    newCard.setAttribute("class", "card fa " + listCards[i]);
    deck.appendChild(newCard);
}


let resetTimer = 0;
let winGame = 0; 
let finalTime = document.querySelector(".finalTime");
let numberMoves = document.querySelector(".numberMoves");
let time = document.querySelector('.time');

/*
 * click on the card through the deck the event will listen when you click on it 
 */

deck.addEventListener("click", function(event){
    console.log(event)

    if (resetTimer==0) {   //start timer with "startTimer"
        startTimer();
        resetTimer = 1;   //the timer will not start again
    }
    if (checkList.length >= 2) {
            return;
        }
    if (event.target.tagName === "LI") {
    event.target.classList.add("open");   //add the "open" class to return the cards
    checkList.push(event.target);    //Event target is LI. The element on which we click
    if (checkList.length === 2) {    //check if the 2 elements in the array are the same or not
        if (checkList[0].classList.value === checkList[1].classList.value) {
            checkList[0].classList.add('match');
            checkList[1].classList.add('match');
            checkList =[];
            moves.innerText++;
            winGame++;
            if(winGame == 8) {
                stopTimer();
                setTimeout(function() { 
                 showModal();

                }, 1000);
            numberMoves.innerText = moves.innerText;
            finalTime.innerText = time.innerText;
            modalContent.append(stars);    //introducing stars into modalContent
            }
        }
        else {
                checkList[0].classList.add('unmatch')
                checkList[1].classList.add('unmatch')
            setTimeout(function() {
                checkList[0].classList.remove('open', 'unmatch');
                checkList[1].classList.remove('open', 'unmatch');
                checkList = [];
                moves.innerText++;
        },1000)
        }
    }
    if (moves.innerText >= 10) {   //If the moves are greater than 10, we give FADE the first star
        document.querySelector('.stars li:nth-child(1)').classList.add('star-fade');
        }
        if (moves.innerText >= 20) {    //If the moves are greater than 20, we give FADE the first star
        document.querySelector('.stars li:nth-child(2)').classList.add('star-fade');
        }
    }

})


let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');

function startTimer() {    //I start the timer
    timer = setInterval(function() {
        seconds.innerText++;
        if(seconds.innerText == 60) {
            minutes.innerText++;
            seconds.innerText = 0;
        }
    },(1000));
}

/*
 * Stop the timer
 */

function stopTimer() {  
  clearInterval(timer);
}

/*
 * Restart the game 
 */

const restart = document.querySelector('.restart');

restart.addEventListener('click', (function(event) {
                event.preventDefault();
                window.location.reload(true);
            }));


const modal = document.querySelector(".modal")

/*
 * Open Modal
 */

function showModal() {    //I open the modal at the end of the game
    modal.style.display = "block";

}


function restartGame() {    //function to start the game again when the modal opens
  location.reload();
}

/*
 * Close Modal
 */

const close = document.querySelector('.close')

close.onclick = function() {    // x to close the modal
  modal.style.display = 'none';
}
