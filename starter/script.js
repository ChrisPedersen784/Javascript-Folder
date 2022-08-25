'use strict';

//selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function init() {
  //starting conditions
  //storing the scores in an array

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player0Element.classList.remove('player--winner');

  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle will which the class player--active on or off
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

//Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    console.log(diceElement);
    //3. Check for rolled 1:
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true, switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the active players score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score >= 100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//New game
btnNew.addEventListener('click', function () {
  playing = true;
  init();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
