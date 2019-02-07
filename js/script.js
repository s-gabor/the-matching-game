const timeElapsed = document.getElementById('time-elapsed');
const moves = document.getElementById('moves');
const score = document.getElementById('score');
const refresh = document.getElementById('refresh');
const cards = document.getElementById('cards');
let time, movesCount, activeCards = [], matchingCardsCount;


// 3 card states: hiddenCard, activeCard, matchingCard


const showCard = (btn) => {
	const setCardsAttribute = (attrName, attrValue, cards) => {
		for (let card of cards) {
			card.setAttribute(attrName, attrValue);
		}
	}

	const gameOver = () => {
		// stop timer

		// show score
		let currentScore = Math.ceil(movesCount / time * 100);
		score.innerHTML = `Score: ${currentScore}`;
	}

	btn.innerHTML = btn.getAttribute('value');
	btn.setAttribute('state', 'activeCard');

	activeCards.push(btn);

	if (activeCards.length === 2) {
		if (activeCards[0].value === activeCards[1].value) {
			setCardsAttribute('state', 'matchingCard', activeCards);
			activeCards[0].disabled = true;
			activeCards[1].disabled = true;
			matchingCardsCount += 2;
			if (matchingCardsCount === 16) {
				gameOver();
			}
		} else {
			setCardsAttribute('state', 'hiddenCard', activeCards);
		}
		activeCards = [];
	} 
		
}


const generateCard = (value) => {
	var btn = document.createElement('button');
	btn.setAttribute('value', value);
	btn.setAttribute('state', 'hiddenCard');
	btn.innerHTML = 'Card';
	btn.addEventListener('click', () => {
		movesCount++
		moves.innerHTML = `Moves: ${movesCount}`;
		showCard(btn);
	})
	cards.appendChild(btn);
}


const generateCards = () => {
	const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	// IIFE to shuffle the card values
	(function () {
	    for (let i = cardValues.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
	    }
	})();
	for (let card of cardValues) {
		generateCard(card);
	}
}


const updateTimeView = (seconds) => {
	let min = Math.floor(seconds / 60);
	let sec = seconds - 60 * min;
	timeElapsed.innerHTML = `Time Elapsed: ${min}m ${sec}s`
}


const setTimer = () => {
	console.log('Started timer!');
	cards.removeEventListener('click', setTimer);
	time = 0;
	const timer = setInterval(() => {
		time++
		updateTimeView(time);
	}, 1000);
	refresh.addEventListener('click', () => clearInterval(timer));
}


const refreshGame = () => {
	updateTimeView(0);
	movesCount = 0;
	score.innerHTML = 'Score:';
	matchingCardsCount = 0;
	moves.innerHTML = `Moves: ${movesCount}`;
	cards.innerHTML = '';
	generateCards();
	cards.addEventListener('click', setTimer);
}


document.addEventListener("DOMContentLoaded", refreshGame);
refresh.addEventListener('click', refreshGame);








