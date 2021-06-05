"use strict";

// get element 
const playerScore0 = document.getElementById("score--0");
const playerScore1 = document.getElementById("score--1");
let playerCurrent0 = document.getElementById("current--0");
let playerCurrent1 = document.getElementById("current--1");

// Buttons
const rollDiceBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");

// dice image
const imgDice = document.querySelector(".dice");

// score and user variable
let score = [0, 0];
// set current score
let currentScore = 0;
// store active user in variable
let activeUser = 0;
// get user score with number type
let showScore = Number(document.getElementById(`score--${activeUser}`).textContent);

// for user should playing ? or not?
let shoudPlaying = true;


// set zero value for player one and player two score
playerScore0.textContent = 0;
playerScore1.textContent = 0;

// change active player number 
const changeActivePlayerNumber = function () {
	if(activeUser === 0){
		activeUser = 1;
	} else if (activeUser === 1) {
		activeUser = 0
	}
};

// change player function 
const changePlayer = function () {

	// switch to next player round
	document.getElementById(`current--${activeUser}`).textContent = 0;

	// change active player number function
	changeActivePlayerNumber();
	
	// toggle active player between to section class in html
	document.querySelector(".player--0").classList.toggle("player--active");
	document.querySelector(".player--1").classList.toggle("player--active");
};


// roll dice button event listener
rollDiceBtn.addEventListener("click", function () {
	// check user playing premission
	if (shoudPlaying) {
		// generate random number
		let dice = Math.trunc((Math.random() * 6 )+ 1);

		// display random number
		imgDice.src = `dice-${dice}.png`;
		imgDice.classList.remove("hidden");

		// change dice number one for change player
		if(dice === 1) {	
			// switch to next player round
			changePlayer();

		} else {
			currentScore += dice;
			document.getElementById(`current--${activeUser}`).textContent = currentScore;
		}
	}
});

// hold button evenlistener 
holdBtn.addEventListener("click", function(){
	// check user playing premission
	if (shoudPlaying) {
		// add new score to player score
		score[activeUser] += currentScore;
		// now showed current user score with hold button
		showScore = score[activeUser];
		document.getElementById(`score--${activeUser}`).textContent = score[activeUser];

		// reset current score
		currentScore = 0;
		
		// should check it  player score is 100, if score is not 100 player should changed.
		if (score[activeUser] >= 100) {
			// change should playing premmision for condition 
			shoudPlaying = false;
			document.querySelector(`.player--${activeUser}`).classList.add("player--winner");

			// call active number function
			changeActivePlayerNumber();

			// we get red background to loser player
			document.querySelector(`.player--${activeUser}`).classList.add("player--winner-red");
			imgDice.classList.add("hidden");

		} else {
			// change player
			changePlayer();
		}
	}	
});


// new game button eventlistener
newGameButton.addEventListener("click", function(){

	// remove win and lose theme
	document.querySelector(`.player--${activeUser}`).classList.remove("player--winner");
	document.querySelector(`.player--${activeUser}`).classList.remove("player--winner-red");

	// add hidden class for dice image
	imgDice.classList.add("hidden");

	// remove player active 
	document.querySelector(`.player--${activeUser}`).classList.remove("player--active");

	// change player active number
	changeActivePlayerNumber();

	// remove winer and loser theme after active player number 
	document.querySelector(`.player--${activeUser}`).classList.remove("player--winner");
	document.querySelector(`.player--${activeUser}`).classList.remove("player--winner-red");


	// add player active for winner playe
	document.querySelector(`.player--${activeUser}`).classList.add("player--active");

	// reset winner current number
	document.getElementById(`current--${activeUser}`).textContent = 0;

	// reset score
	score = [0, 0];
	currentScore = 0;

	// reset should playing
	shoudPlaying = true;	

	// reset player score
	playerScore0.textContent = 0;
	playerScore1.textContent = 0;
	
});