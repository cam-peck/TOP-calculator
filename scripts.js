// calculator functions

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

let num1 = '';
let num2 = '';
let operator = '';
let functionSet = false;
// button listeners
const numberButtons = document.querySelectorAll('.num')
const functionButtons = document.querySelectorAll('.func')
const evaluateButton = document.querySelector('#evaluate')
const allClearButton = document.querySelector('#all-clear')
const dataHistoryScreen = document.querySelector('.data-history')
const dataInputScreen = document.querySelector('.data-input')


numberButtons.forEach((numButton) => {
    numButton.addEventListener('click', () => {
        // check if calcluator is ready to do math (is the function set?)
        if (functionSet === false && num1 === '') {
            num1 += numButton.id;
            dataInputScreen.textContent = `${num1}`;
            console.log(`num1: ${num1}`)
        }
        else if (functionSet === true) {
            num2 += numButton.id
            dataInputScreen.textContent = `${num2}`;
            console.log(`num2: ${num2}`)
        }
        
    });
});

functionButtons.forEach((funcButton) => {
    funcButton.addEventListener('click', () => {
        dataHistoryScreen.textContent = num1 + `${funcButton.id}`;
        // store the current operator the user wants to execute
        operator = funcButton.id
        // let the calculator know that it's time to do a math
        functionSet = true;
        console.log(`num1: ${num1}`)
    });
});

evaluateButton.addEventListener('click', () => {
    // change first and second nums from strings to integers
    if (num1 && num2) {
        const firstNum = parseInt(num1)
        const secondNum = parseInt(num2);
        const operatedResult = operate(operator, firstNum, secondNum);
        dataInputScreen.textContent = operatedResult;
        // get ready for next operation
        num1 = `${operatedResult}`;
        num2 = ''
    }
    
});

allClearButton.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    functionSet = false;
    dataHistoryScreen.textContent = '';
    dataInputScreen.textContent = '';
})


// loop until either AC OR equal sign is pressed
    // if AC pressed, clear content from data input and data history div
    // reset current operation storage
// on press -- modify text content of data input div
    // listen for EITHER number press OR function press
    // if number press, concatanate that number onto the end of data input div
    // if function press, update history div with number and appropriate function sign
        // unless nothing is stored, then do nothing
    // if function is pressed instead of equal evaluate result