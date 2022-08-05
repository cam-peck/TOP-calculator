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
            // return evaluated result that operation on input nums
            return operation(num1, num2)
        }
    }
}