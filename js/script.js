const timeElapsed = document.getElementById('time-elapsed');
const moves = document.getElementById('moves');
// const stars = document.getElementById('stars');
const refresh = document.getElementById('refresh');
const cards = document.getElementById('cards');
let time, movesCount, activeCards = [];


// 2 states: none, temporary, permanent
// 3 card stages: hiddenCard, activeCard, matchingCard



function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


const showCard = (btn) => {
	const setCardsAttribute = (attrName, attrValue, cards) => {
		for (let card of cards) {
			card.setAttribute(attrName, attrValue);
		}
	}

	btn.innerHTML = btn.getAttribute('value');
	btn.setAttribute('state', 'activeCard');
	
	// if (activeCards.length > 1) {
	// 	activeCards = [];
	// }
	// activeCards.push(btn);

	if (activeCards.length === 2) {
		if (activeCards[0].value !== activeCards[1].value) {
			console.log(activeCards[0].value, activeCards[1].value);
			setCardsAttribute('state', 'matchingCard', activeCards);
		} else {
			setCardsAttribute('state', 'hiddenCard', activeCards);
		}
		activeCards = [];
	} 
	activeCards.push(btn);
	
	
	
}

const generateCard = (value) => {
	var btn = document.createElement('button');
	btn.setAttribute('value', value);
	btn.setAttribute('state', 'hiddenCard');
	// btn.setAttribute('isTurned', false);
	btn.innerHTML = 'Card';
	btn.addEventListener('click', () => {
		movesCount++
		moves.innerHTML = `Moves: ${movesCount}`;
		showCard(btn);
	})
	cards.appendChild(btn);
}


const generateCards = () => {
	for (let i = 1; i <= 16; i++) {
		generateCard(i);
	}
}


const updateTimeView = (minutes, seconds) => {
	timeElapsed.innerHTML = `Time Elapsed: ${minutes}m ${seconds}s`
}


const startTimer = () => {
	console.log('Started timer!');
	cards.removeEventListener('click', startTimer);
	time = 0;
	const timer = setInterval(() => {
		time++
		let minutes = Math.floor(time / 60);
		let seconds = time - 60 * minutes;
		updateTimeView(minutes, seconds);
	}, 1000);
	refresh.addEventListener('click', () => clearInterval(timer));
}


const refreshGame = () => {
	updateTimeView(0, 0);
	movesCount = 0;
	moves.innerHTML = `Moves: ${movesCount}`;
	cards.innerHTML = '';
	generateCards();
	cards.addEventListener('click', startTimer);
}


document.addEventListener("DOMContentLoaded", refreshGame);
refresh.addEventListener('click', refreshGame);








