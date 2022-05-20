let num1 = ''
let result = ''
let currentNum = ''
let op = ''

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function divide(a, b) {
	return a / b;
}

function multiply(a, b) {
	return a * b;
}

function operate(n1, op, n2) {
	result = 0
	let a = Number(n1)
	let b = Number(n2)

	switch (op) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '/':
			return (b === 0) ? 'ERROR' : divide(a, b);
		case '*':
			return multiply(a, b);
		default:
			return 'ERROR';
	}
}

function setNumVariables() {
	num1 = currentNum;
	currentNum = ''
}

function updateScreen(out) {
	const outputScreen = document.querySelector('#output')
	const updatedOut = outputScreen.innerText + out

	outputScreen.innerText = updatedOut
}

function main() {
	document.querySelectorAll('.numpad-btn-digits').forEach((btn) => {
		btn.addEventListener('click', () => {
			updateScreen(btn.value)
			currentNum = currentNum + btn.value

			console.log(currentNum)
		})
	})

	document.querySelectorAll('.numpad-btn-op').forEach((btn) => {
		btn.addEventListener('click', () => {
			op = btn.value
			updateScreen(btn.value)
			setNumVariables()

			console.log(op, currentNum, num1)
		})
	})

	document.querySelector('#numpad-btn-eq').addEventListener('click', () => {
		const equation = document.querySelector('#output').innerText
		result = operate(num1, op, currentNum)

		console.log(`current eq: ${equation}, result: ${result}`)
	})

}

main()