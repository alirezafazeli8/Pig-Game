'use strict';
// ------------------------------Variable--------------------------------------------------
// TODO 
// FIXME
// NOTE
// REVIEW
// LINK
// get element

const playerScore0 = document.getElementById('score--0');
const playerScore1 = document.getElementById('score--1');
const playerCurrentScore0 = document.getElementById('current--0');
const playerCurrentScore1 = document.getElementById('current--1');

let shouldPlaying = true;

// btn
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// img dice
const diceImg = document.querySelector('.dice');

// store random number
let randomNumber = 0;

// activeplayer
let activePlayer = 0;

// player score
let playerScore = [0, 0];

// current score
let currentScore = 0;


const scoreUseActive = document.getElementById(`score--${activePlayer}`);
// -------------------------------------------------------------------------------------------------

// reset player score textcontent
playerScore0.textContent = 0;
playerScore1.textContent = 0;

// change player Active
const changePlayerActive = () => {
	if (activePlayer === 0) {
		activePlayer = 1;
	} else if (activePlayer === 1) {
		activePlayer = 0;
	}
};

// change player
const changePlayer = () => {
	//last player
	// reset all value
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0
	document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
	// change player active
	changePlayerActive();
	// next player
	document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

// user roll dice button event
rollDiceBtn.addEventListener('click', function () {
	// genrate random number
	randomNumber = Math.trunc(Math.random() * (7 - 1) + 1);
	// display random number
	diceImg.classList.remove('hidden');
	diceImg.src = `dice-${randomNumber}.png`;
	//condition for dice
	if (randomNumber === 1) {
		changePlayer();
	} else{
		currentScore += randomNumber;
		document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	}
	// remove hold button
	holdBtn.classList.remove("hidden");
});

// hold button 
holdBtn.addEventListener("click", function () {
	if(shouldPlaying) {
		playerScore[activePlayer] += currentScore;

		document.getElementById(`score--${activePlayer}`).textContent = playerScore[activePlayer];
		document.getElementById(`current--${activePlayer}`).textContent = 0;	

		if(playerScore[activePlayer] >= 10) {
			shouldPlaying = false;
			document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
			holdBtn.classList.add("hidden");
			rollDiceBtn.classList.add("hidden");
		} else {
			changePlayer();
		}
	}
});

// rest btn eventListener
newGameBtn.addEventListener("click", function () {
	// reset score
	currentScore = 0;
	playerScore0.textContent = 0;
	playerScore1.textContent = 0;
	playerCurrentScore0.textContent = 0;
	playerCurrentScore1.textContent = 0;
	// reset theme
	document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
	// remove hidden class
	diceImg.classList.remove("hidden");
	holdBtn.classList.remove("hidden");
	rollDiceBtn.classList.remove("hidden");
});
