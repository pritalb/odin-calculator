let num1 = ''
let result = ''
let currentNum = ''
let op = ''

function clear() {
	num1 = ''
	result = ''
	currentNum = ''
	op = ''

	document.querySelector('#equation').innerText = ''
	document.querySelector('#result').innerText = ''
}

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
		case '':
			return b;
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

function setNumVariables(value) {
	num1 = value;
	currentNum = ''
}

function updateScreen(out) {
	const outputScreen = document.querySelector('#equation')
	const updatedOut = outputScreen.innerText + out

	outputScreen.innerText = updatedOut
}

function outputResult(out) {
	console.log(result)
	document.querySelector('#result').innerText = result
}

function main() {
	document.querySelectorAll('.numpad-btn-digits').forEach((btn) => {
		btn.addEventListener('click', () => {
			updateScreen(btn.value)
			currentNum = currentNum + btn.value

			// console.log(`after pressing $(btn.value), currentNum = ${currentNum}, op = ${op}, num1 = ${num1}, result = ${result}`)
		})
	})

	document.querySelectorAll('.numpad-btn-op').forEach((btn) => {
		btn.addEventListener('click', () => {
			// if an operator is set, then it is a complex equation
			if (op !== '') {
				result = operate(num1, op, currentNum)
				outputResult()
			}

			op = btn.value
			updateScreen(btn.value)

			if (result === '') {
				setNumVariables(currentNum)
			} else {
				setNumVariables(result)
			}

			console.log(`after pressing $(btn.value), currentNum = ${currentNum}, op = ${op}, num1 = ${num1}, result = ${result}`)
		})
	})

	document.querySelector('#numpad-btn-eq').addEventListener('click', () => {
		// const equation = document.querySelector('#equation').innerText
		result = operate(num1, op, currentNum)
		op = ''
		outputResult()

		// console.log(`current eq: ${equation}, result: ${result}`)
	})

	document.querySelector('#numpad-btn-clr').addEventListener('click', () => {
		clear()

		console.log(`after clear, currentNum = ${currentNum}, op = ${op}, num1 = ${num1}, result = ${result}`)
	})

	document.querySelector('#numpad-btn-back').addEventListener('click', () => {
		const equationScreen = document.querySelector('#equation')
		const currentEqn = equationScreen.innerText
		const last = currentEqn[currentEqn.length - 1]

		equationScreen.innerText = currentEqn.slice(0, currentEqn.length - 1)

		if (last === '+' || last === '-' || last === '/' || last === '*') {
			op = ''
		} else {
			currentNum = currentNum.slice(0, currentNum.length - 1)
		}

		console.log(`after pressing back, currentNum = ${currentNum}, op = ${op}, num1 = ${num1}, result = ${result}, last = ${last}`)
	})

}

main()