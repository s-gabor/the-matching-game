const cards = document.getElementById('cards');
const moves = document.getElementById('moves');
const refresh = document.getElementById('refresh');
const timeElapsed = document.getElementById('time-elapsed');
let movesCount;
let time;





const generateCard = (id) => {
	var btn = document.createElement('button');
	btn.innerHTML = `Card ${id}`;
	btn.addEventListener('click', () => {
		movesCount++
		moves.innerHTML = `Moves: ${movesCount}`;
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








// var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get todays date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);