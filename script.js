//Digits
let digits = Array.from({length:10}, (_,i) => (i+1)-1);

const current = document.querySelector('#current');
current.textContent = 'Hello';
let currentNum = '0';
let currentOperator = '';
let sentence = [0,'',''];
let currentPos = 0;
const num1 = [0];
const num2 = [0];

// Give all children of rows eventListeners
const buttons = document.querySelectorAll('#row')
buttons.forEach((button) => button.addEventListener('click',(e)=> {

    //Update Numbers
    if (e.target.classList.contains('digit') && currentPos == 0) {
        pushDigit(e.target);  //Update CurrentNum
    } else if (e.target.classList.contains('operator') && currentPos == 0) {
        operateNum(e.target); // Update currentOperator
        num1[0] = currentNum; //Lock in sentence[0]
        currentNum = 0; //Reset currentNum
        currentPos = 1; //Move Sentence position
    } else if (e.target.classList.contains('operator') && currentPos == 1) {
        operateNum(e.target)
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


function operate(num1, operator, num2){
    (operator == "%") ? console.log(num1 % num2):false;
    (operator == "+") ? console.log(num1 + num2):false;
    (operator == "-") ? console.log(num1 - num2):false;
    (operator == "/" && num2 != 0) ? console.log(num1 / num2):console.log("ERROR");
    (operator == "*") ? console.log(num1 * num2):false;
}

