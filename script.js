//Digits
let digits = Array.from({length:10}, (_,i) => (i+1)-1);
const current = document.querySelector('#current');
const previous = document.querySelector('#previous');
const allclearBtn = document.querySelector('#allclear');
const clearBtn = document.querySelector('#clear')

current.textContent = 0;
let currentNum = '';
let currentOperator = '';
let sentence = [0,'',''];
let currentPos = 0;
let result = '';
let decimalPressed = false;

// ALL CLEAR BUTTON
allclearBtn.addEventListener('click', clearAll);

// ClEAR CURRENT BUTTON
clearBtn.addEventListener('click', clearCurrent);

// Give all children of rows eventListeners
const buttons = document.querySelectorAll('#row')
buttons.forEach((button) => button.addEventListener('click',(e)=> {

    // Update Numbers
    if (e.target.classList.contains('digit')) {
        pushDigit(e.target);  //Update CurrentNum
        current.textContent = currentNum;
    }
    if (e.target.classList.contains('decimal')) {
        pushDecimal(e.target);
        current.textContent = currentNum;
    }  



    if (e.target.classList.contains('operator') && currentPos == 0) {
        operateNum(e.target); // Update currentOperator
        sentence[currentPos] = currentNum; //Lock in sentence[0]
        sentence[currentPos+1] = currentOperator;
        previous.textContent = sentence[0] + sentence[1];
        currentNum = ''; //Reset currentNum
        currentPos += 1; //Move Sentence position
        decimalPressed = false;

    } else if (e.target.classList.contains('operator') && currentPos == 1) {
        operateNum(e.target)
        decimalPressed = false;
        sentence[currentPos] = currentOperator;


    } else if (e.target.classList.contains('digit') && currentPos == 1) {
        currentPos = 2; //pressing digits after operator moves position forward
    } else if (e.target.classList.contains('enter') && currentPos == 2) {
        // Mimic when pressed = again, uses the last digit input as the second number for operation
        sentence[currentPos] = currentNum; 
        result = operate(sentence);
        sentence[0] = result;
        console.log(result);
        current.textContent = result;
        decimalPressed = false;

        if (result == 'ERROR'){
            previous.textContent = ''
        } else {
            previous.textContent = sentence[0] + sentence[1] + sentence[2];
        }
        
    } else if (e.target.classList.contains('operator') && currentPos == 2){
        operateNum(e.target);
        sentence[1] = currentOperator;
        currentNum = '';
        previous.textContent = sentence[0] + sentence[1];
        decimalPressed = false;
    }
}));

// console.log(digits[9])


// Update Current Number
function pushDigit(button){
    currentNum += button.id.toString();
}

// Update Current Operation
function operateNum(button){
    currentOperator = button.id;
    console.log(currentOperator)
}

function pushDecimal(button){
    if (decimalPressed == false){
        currentNum += button.id.toString();
        decimalPressed = true;
    } else {
        return
    }
}


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

function clearAll(){
    current.textContent = 0;
    previous.textContent = 0;
    currentNum = '';
    currentOperator = '';
    sentence = [0,'',''];
    currentPos = 0;
    result = '';
    decimalPressed = false;
}

function clearCurrent(){
    current.textContent = 0;
    currentNum = '';
}