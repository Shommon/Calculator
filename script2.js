const current = document.querySelector('#current');
const previous = document.querySelector('#previous');
const allclearBtn = document.querySelector('#allclear');
const clearBtn = document.querySelector('#clear');
// ALL CLEAR BUTTON
allclearBtn.addEventListener('click', clearAll);
// ClEAR CURRENT BUTTON
clearBtn.addEventListener('click', clearCurrent);

// Global Variables
let state = '';
let currentNum = '0';
let currentOperator = '';
let sentence = ['','',''];
let sentencePosition = -1;



// Calculator Button Listeners
const buttons = document.querySelectorAll('#row')
buttons.forEach((button) => button.addEventListener('click', (e) => {
    changeState(e.target);
    pushNum(e.target);
    changeOperator(e.target);

    updateDisplay();
}))


// Push Numbers
function pushNum(button) {
    if (state == 'NUMERATE') {
        if (sentencePosition == -1){
            currentNum = '';
            currentNum += button.id.toString();
            sentencePosition = 0;
            return
        }
        currentNum += button.id.toString();
    }
}

// Change Operator
function changeOperator(button) {
    if (state == 'OPERATION') {
        sentencePosition = 1;

    }
}



function updateDisplay() {
    current.textContent = currentNum;
}


// Operate
function operate(array){
    let num1 = parseFloat(array[0]);
    let num2 = parseFloat(array[2]);
    let operator = array[1];
    console.log(num1, operator ,num2);
    switch(operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2; 
        case "/":
            if (num2 == 0){
                return "ERROR"
            } else {
                return num1 / num2;
            }
        case "%":
            return num1 % num2;
    }
}

// Change States
function changeState(button) {
    if (button.classList.contains('digit')){
        state = 'NUMERATE'
    } else if (button.classList.contains('operator')) {
        state = 'OPERATION'
    } else if (button.classList.contains('enter')) {
        state = 'RETURN'
    }
}


function clearAll(){
    currentNum = '0';
    current.textContent = ''
}

function clearCurrent(){

}