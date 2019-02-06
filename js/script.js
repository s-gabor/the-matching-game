const cards = document.getElementById('cards');


cards.innerHTML = '';
const generateCard = (id) => {
	var btn = document.createElement('button');
	btn.innerHTML = `Card ${id}`;
	cards.appendChild(btn);
}


const generateCards = () => {
	for (let i = 1; i <= 16; i++) {
		generateCard(i);
	}
}


document.addEventListener("DOMContentLoaded", generateCards);





