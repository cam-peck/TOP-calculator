// calculator functions

// check for dividing by zero
// prevent overflow on huge numbers
// fix rounding on really really small numbers
// add keyboard functionality

// calculation variables
let num1 = '';
let num2 = '';
let operator = '';
let hasCalced = false;

// button listeners
const numberButtons = document.querySelectorAll('.num');
const functionButtons = document.querySelectorAll('.func');
const decimalButton = document.querySelector('#decimal');
const percentageButton = document.querySelector('#percentage')
const evaluateButton = document.querySelector('#evaluate');
const allClearButton = document.querySelector('#all-clear');
const backspaceButton = document.querySelector('#clear');
const dataHistoryScreen = document.querySelector('.data-history');
const dataInputScreen = document.querySelector('.data-input');

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    // create obj with four operations in it (add power later?)
    const operatorObj = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide
    }
    // iterate through object to find input operator
    for (const key in operatorObj) {
        if (key === operator) {
            const operation = operatorObj[key]
            // return evaluated result of that operation on input nums
            return operation(num1, num2)
        }
    }
}

function round(num) {
    // if number of digits > 14
        // calculate number of digits before and after the decimal
        // calculate number of decimals to keep 
        // round up the final decimal
    // return the answer
}

numberButtons.forEach((numButton) => {
    numButton.addEventListener('click', () => {
        // before we've done any calculation, inputs should be stored in num1
        if (hasCalced === false) {
            num1 += numButton.id;
            dataInputScreen.textContent = `${num1}`;
            console.log(`num1: ${num1}`);
        }
        // after we've done a calculation, all future inputs will be num2
        else if (hasCalced === true) {
            num2 += numButton.id;
            dataInputScreen.textContent = `${num2}`;
            console.log(`num2: ${num2}`)
        }
    });
});

functionButtons.forEach((funcButton) => {
    funcButton.addEventListener('click', () => {
        // if num2 is present, evaluate the solution before continuing
        if (num2) {
            const firstNum = parseFloat(num1);
            const secondNum = parseFloat(num2);
            const operatedResult = operate(operator, firstNum, secondNum);
            const roundedResult = operatedResult.toFixed(2)
            dataInputScreen.textContent = roundedResult;
            // get ready for next operation
            num1 = `${roundedResult}`;
            num2 = '';
        }
        dataHistoryScreen.textContent = num1 + `${funcButton.id}`;
        // store the current operator the user wants to execute
        operator = funcButton.id;
        // let the calculator know that it's time to enter num2
        hasCalced = true;
    });
});

decimalButton.addEventListener('click', () => {
    if (num2 && !num2.includes('.')) {
        num2 += '.';
        dataInputScreen.textContent = num2;
    }
    else if (hasCalced === false & !num1.includes('.')) {
        num1 += '.';
        dataInputScreen.textContent = num1;
    }
});

percentageButton.addEventListener('click', () => {
    if (num2) {
        const percentageNum2 = `${num2 * .01}`;
        num2 = percentageNum2;
        dataInputScreen.textContent = num2;
    }
    else if (hasCalced === false) {
        const percentageNum1 = `${num1 * .01}`;
        num1 = percentageNum1;
        dataInputScreen.textContent = num1;
    }
});

evaluateButton.addEventListener('click', () => {
    // change first and second nums from strings to integers
    console.log(`operator:${operator} num2:${num2}`)
    if (num1 && num2) {
        const firstNum = parseFloat(num1);
        const secondNum = parseFloat(num2);
        const operatedResult = operate(operator, firstNum, secondNum);
        const roundedResult = operatedResult.toFixed(2)
        dataInputScreen.textContent = roundedResult;
        // get ready for next operation
        num1 = `${roundedResult}`;
        num2 = '';
    }
});

backspaceButton.addEventListener('click', () => {
    // if num2 has data stored in it, backspace one index from num2
    if (num2) {
        const slicedString2 = num2.slice(0, num2.length - 1);
        num2 = slicedString2;
        dataInputScreen.textContent = num2;
        console.log(num2);
    }
    // if data is stored in operator, remove last operator & update screen
    else if (operator) {
        operator = '';
        dataHistoryScreen.textContent = num1;
    }
    // allow user to backspace on original inputs before calculations
    else if (hasCalced === false) {
        const slicedOriginal = num1.slice(0, num1.length - 1);
        num1 = slicedOriginal
        dataInputScreen.textContent = num1;
        console.log(num1)
    }
    // only backspace up to the previous calculated number to prevent unwieldly calcs
    else if (num1 && operator) {
        const slicedString1 = num1.slice(0, num1.length - 1);
        num1 = slicedString1;
        dataInputScreen.textContent = num1;
        console.log(num1);
    }
});

allClearButton.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    hasCalced = false;
    dataHistoryScreen.textContent = '';
    dataInputScreen.textContent = '';
});