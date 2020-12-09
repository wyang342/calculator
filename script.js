function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, a, b) {
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
	}
}


function changeDisplayValue(value) {
	const display = document.getElementById('display');
	display.textContent = value;
}

function listenForNumberClick() {
	let numbers = document.getElementsByClassName('number');
	for (let i = 0; i < numbers.length; i++) {
		numbers[i].addEventListener('click', () => {
			displayValue = numbers[i].textContent;
			changeDisplayValue(displayValue);
		});
	};
};

function listenForOperatorClick() {
	let operators = document.getElementsByClassName('operator');
	for (let i = 0; i < operators.length; i++) {
		operators[i].addEventListener('click', () => {
			console.log(operators[i].textContent);
		});
	};
}

listenForNumberClick();
let displayValue = 0;
changeDisplayValue(displayValue);

