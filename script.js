let num1 = ''
let result = ''
let currentNum = ''
let op = ''
let canOperateEquation = false
let operatorInputAllowed = true

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
	// console.log(result)
	document.querySelector('#result').innerText = result
}

function handleInput(key) {
	if (key === '+' || key === '-' || key === '*' || key === '/') {
		canOperateEquation = true
		
		if (operatorInputAllowed) {
			// if an operator is set, then it is a complex equation
			if (op !== '') {
				result = operate(num1, op, currentNum)
				outputResult()
			}
	
			op = key
			updateScreen(key)
	
			if (result === '') {
				setNumVariables(currentNum)
			} else {
				setNumVariables(result)
			}

			operatorInputAllowed = false
		}
	} else if (key === '=' || key === 'Enter') {
		if (canOperateEquation) {
			result = operate(num1, op, currentNum)
			op = ''
			currentNum = ''
			outputResult()

			canOperateEquation = false
			operatorInputAllowed = true
		}
	} else if (isFinite(key) || key === '.') {
		updateScreen(key)
		currentNum = currentNum + key
		operatorInputAllowed = true
	} else if (key === 'Backspace' || key === 'back') {
		if (currentNum !== '') {
			const equationScreen = document.querySelector('#equation')
			const currentEqn = equationScreen.innerText
			const last = currentEqn[currentEqn.length - 1]
	
			equationScreen.innerText = currentEqn.slice(0, currentEqn.length - 1)
	
			if (last === '+' || last === '-' || last === '/' || last === '*') {
				op = ''
			} else {
				currentNum = currentNum.slice(0, currentNum.length - 1)
			}
		}
	} else if (key === 'clear') {
		clear()
	}
}

function main() {
	document.querySelectorAll('.numpad-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			handleInput(btn.value)
		})
	})

	// document.querySelectorAll('.numpad-btn-op').forEach((btn) => {
	// 	btn.addEventListener('click', () => {
	// 		handleInput(btn.value)
	// 	})
	// })

	// document.querySelector('#numpad-btn-eq').addEventListener('click', () => {
	// 	handleInput('=')
	// })

	// document.querySelector('#numpad-btn-clr').addEventListener('click', () => {
	// })

	// document.querySelector('#numpad-btn-back').addEventListener('click', () => {
	// 	handleInput('back')
	// })

	document.addEventListener('keydown', (event) => {
		handleInput(event.key)
		// console.log(`key pressed! code: ${event.code}, key: ${event.key}`)
	})

}

main()