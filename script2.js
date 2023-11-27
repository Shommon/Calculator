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
let sentencePosition = -1;
let recursionCount = 0;
let recursionOn = false;
let sentence = {
    num1:'0',
    operator:'',
    num2:'',
    result:''
};


//Initialize Display
updateDisplay();



// Calculator Button Listeners
const buttons = document.querySelectorAll('#row')
buttons.forEach((button) => button.addEventListener('click', (e) => {
    if (e.target.id != 'row'){
        changeState(e.target);
        pushNum(e.target);
        changeOperator(e.target);
        grabResult(e.target);
        updateDisplay();

    }
}))



// Push Numbers
function pushNum(button) {
    if (state == 'NUMERATE') {
        switch (sentencePosition) {
            case -1: //Buffer
                resetCurrentNum();
                currentNum += button.id.toString(); //Push Numbers to String
                sentencePosition = 0;
                updateSentence('num1', currentNum);
                return
            case 0:
                currentNum += button.id.toString(); //Push Numbers to String
                updateSentence('num1', currentNum)
                return
            case 'buffer':
                resetCurrentNum();
                currentNum += button.id.toString(); //Push Numbers to String
                sentencePosition = 2;
                updateSentence('num2', currentNum)
                return
            // case 1: //Buffer
            //     resetCurrentNum();
            //     currentNum += button.id.toString(); //Push Numbers to String
            //     sentencePosition = 2;
            //     updateSentence('num2', currentNum)
            //     return
            case 2:
                currentNum += button.id.toString();
                updateSentence('num2', currentNum)
                return

        }
    }
}

function updateSentence(category, input){
    switch (category){
        case 'num1':
            sentence.num1 = input;
            return;
        case 'operator':
            sentence.operator = input;
            return
        case 'num2':
            sentence.num2 = input;
            return
    }
}

// Change Operator
function changeOperator(button) {
    if (state == 'OPERATION') {
        switch (sentencePosition){
            case -1:
                sentencePosition = 'buffer';
                currentOperator = button.id.toString();
                updateSentence('operator', currentOperator);
            case 0:
                sentencePosition = 'buffer';
                currentOperator = button.id.toString();
                updateSentence('operator', currentOperator);
                return;
            case 'buffer':
                currentOperator = button.id.toString();
                updateSentence('operator', currentOperator);
                return
            case 2:
                previousValue(); // Set result as num1
                currentOperator = button.id.toString(); //Update Current Operator
                updateSentence('operator', currentOperator);
                sentencePosition = 'buffer';
                return;
        }
    }
}

function previousValue(){
    sentence.num1 = sentence.result
}

//Display Functions
function updateDisplay() {
    if (state == 'RETURN'){
        current.textContent = sentence.result;
        previous.textContent = sentence.num1 + sentence.operator + sentence.num2;
        return
    }
    switch (sentencePosition) {
        case -1:
            current.textContent = currentNum;
            return
        case 0:
            current.textContent = sentence.num1;
            return
        case 'buffer':
            current.textContent = currentNum;
            previous.textContent = sentence.num1 + sentence.operator;
            return
        case 2: 
            current.textContent = currentNum;
            previous.textContent = sentence.num1 + sentence.operator + sentence.num2;
            return
    }
    
}

// Operate
function operate(array){
    let num1 = parseFloat(array[0]);
    let num2 = parseFloat(array[2]);
    let operator = array[1];
    // console.log(num1, operator ,num2);
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

//Grab Result
function grabResult(button){
    // if (button.id == 'enter' && state == 'RETURN' && ) {

    // } else if (button.id == 'enter' && state == 'RETURN'){
    //     let result = operate(Object.values(sentence).slice(0,3));
    //     console.log('pass')
    //     sentence.result = result;
    //     if (result == 0){
    //         currentNum = '';
    //     } else {
    //         currentNum = result;
    //     }
    //     sentencePosition = 'buffer'
    //     return
    // } else {
    //     returnstate = 'RECURSIVE'
    // }

    if (button.id == 'enter'){
        let result;


        if (recursionOn == false){
            result = operate(Object.values(sentence).slice(0,3))
            sentence.result = result;
            recursionOn = true;
        } else {
            result = operate([sentence.result, sentence.operator, sentence.num2])
            sentence.result = result;
            recursionCount++;
        }
        if (result == 0){
            currentNum = '';
            } else {
                currentNum = result;
            }
    }
}

// Reset Functions
function clearAll(){
    resetDisplay();
    resetGlobalVariables();
}

function clearCurrent(){
}

function resetCurrentNum(){
    currentNum = '';
}

function resetGlobalVariables(){
    state = '';
    currentNum = '0';
    currentOperator = '';
    sentencePosition = -1;
    sentence = {
    num1:'0',
    operator:'',
    num2:'',
    result:''
    };
}

function resetDisplay(){
    current.textContent = '';
    previous.textContent = '';
}