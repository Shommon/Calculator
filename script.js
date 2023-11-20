//Digits
let digits = Array.from({length:10}, (_,i) => (i+1)-1);

const current = document.querySelector('#current');
current.textContent = 'Hello';
let currentNum = '';
let currentOperator = '';
let sentence = [0,'',''];
let currentPos = 0;


// Give all children of rows eventListeners
const buttons = document.querySelectorAll('#row')
buttons.forEach((button) => button.addEventListener('click',(e)=> {

    //Update Numbers
    if (e.target.classList.contains('digit')) {
        pushDigit(e.target);  //Update CurrentNum
    }
    
    if (e.target.classList.contains('operator') && currentPos == 0) {
        operateNum(e.target); // Update currentOperator
        sentence[currentPos] = currentNum; //Lock in sentence[0]
        sentence[currentPos+1] = currentOperator;
        currentNum = ''; //Reset currentNum
        currentPos += 1; //Move Sentence position
    } else if (e.target.classList.contains('operator') && currentPos == 1) {
        operateNum(e.target)
        sentence[currentPos] = currentOperator;
    } else if (e.target.classList.contains('digit') && currentPos == 1) {
        currentPos = 2;
    } else if (e.target.classList.contains('enter')) {
        sentence[currentPos] = currentNum;
        currentPos = 0;
        /// Evaluate Sentence
        /// Set currentNum to result of operation
        console.log(sentence);
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

