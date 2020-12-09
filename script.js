function add(a, b) {
	return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
	return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
	return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
	return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b) {
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "×":
			return multiply(a, b);
		case "÷":
			return divide(a, b);
	}
}

function changeDisplayValue(value) {
	const display = document.getElementById('display');
	value = value.toString();
	if (value === 'Infinity') display.textContent = "ERROR";
	else if (value.length > 8) {
		value = value.slice(0, 10);
		display.textContent = value;
	}
	else display.textContent = value;
}

Number.prototype.getDecimalPlaces = function () {
	if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
	else return this.toString().split(".")[1].length || 0;
}

function getDisplayValue(currentSelection) {
	if (start) {
		displayValue = currentSelection;
		start = false;
	} else {
		displayValue = parseFloat(displayValue.toString() + currentSelection.toString());
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
				switchtoB = true;
				numB = 0;
				start = true;
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
			numA = displayValue, numB = null, currentOperator = null;
			switchToB = true;
			start = true;
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
let numA = 0, numB = 0;
let currentOperator, previousOperator;
let switchToB = false;
let start = true;
changeDisplayValue(displayValue);
listenForNumberClick();
listenForOperatorClick();
listenForEquals();
listenForClear();