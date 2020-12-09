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

function getDisplayValue(currentSelection) {
	if (start) {
		displayValue = currentSelection;
		start = false;
	} else {
		displayValue = parseInt(displayValue.toString() + currentSelection.toString());
	}
	return displayValue;
}

function listenForNumberClick() {
	let numbers = document.getElementsByClassName('number');
	for (let i = 0; i < numbers.length; i++) {
		numbers[i].addEventListener('click', () => {
			let currentSelection = numbers[i].textContent;
			if (!switchToB) {
				displayValue = getDisplayValue(currentSelection);
				changeDisplayValue(displayValue);
				numA = displayValue;
			} else {
				displayValue = getDisplayValue(currentSelection);
				changeDisplayValue(displayValue);
				numB = displayValue;
			};
		});
	};
};

function listenForOperatorClick() {
	let operators = document.getElementsByClassName('operator');
	for (let i = 0; i < operators.length; i++) {
		operators[i].addEventListener('click', () => {
			currentOperator = operators[i].textContent;
			if (!previousOperator) {
				previousOperator = currentOperator;
			}
			if (numA && !numB) {
				switchToB = true;
				start = true;
			} else if (numA && numB) {
				displayValue = operate(previousOperator, numA, numB);
				changeDisplayValue(displayValue);
				numA = displayValue;
				numB = 0;
			};
			previousOperator = operators[i].textContent;
		});
	};
};

function listenForEquals() {
	const equals = document.getElementById('equals');
	equals.addEventListener('click', () => {
		if (numA && numB) {
			displayValue = operate(currentOperator, numA, numB);
			changeDisplayValue(displayValue);
			numA = displayValue;
			numB = 0;
		};
	});
};

function listenForClear() {
	const clearButton = document.getElementById('clear');
	clearButton.addEventListener('click', () => {
		displayValue = 0;
		numA = null, numB = null, currentOperator = null;
		switchToB = false;
		start = true;
		changeDisplayValue(displayValue);
	});
};

// Initializing Calculator
let displayValue = 0;
let numA, numB;
let currentOperator, previousOperator;
let switchToB = false;
let start = true;
changeDisplayValue(displayValue);
listenForNumberClick();
listenForOperatorClick();
listenForEquals();
listenForClear();