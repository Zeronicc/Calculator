const equalBtn = document.querySelector("#equal");
const answer = document.querySelector("#answer")
const numKeys = document.querySelectorAll(".num");
const keys = document.querySelector(".logicBtn");
const operateKeys = document.querySelectorAll(".symbol");
const allClearBtn = document.querySelector("#allClearBtn");
const numberContainer = document.querySelector(".number-container");
const backSpace = document.querySelector("#deleteBtn");
const refreshBtn = document.querySelector(".refresh");
const addNeg = document.querySelector("#addNegative");
const clearBtn = document.createElement("button");


let resettingScreen = false;
let num1 = 0;
let num2 = 0;
let equalClick = 0;
let operatorClick = 0;
let operatorSign = '';
let signBtn = '';
let numClick = 0;

clearBtn.id = 'clearBtn';
clearBtn.textContent = 'C'

numKeys.forEach((button) =>
  button.addEventListener('click', (event) => {
    const { target } = event;
    word = answer.textContent;
    //answer.style.fontSize = '65px';
    if(word.length > 5 && resettingScreen !== true) answer.style.fontSize = '56px';
    if(word.length > 6 && resettingScreen !== true) answer.style.fontSize = '49px';
    if(word.length > 7 && resettingScreen !== true) answer.style.fontSize = '44px';
    if(word.length > 8 && resettingScreen !== true) return;
    if(target.value === ".") return decimalPlace(target.value);
    if(answer.textContent == '-0'){answer.textContent = "-"}
    screenDisplay(target.value);
    revertColor();
    showClear();
  })
);

operateKeys.forEach((button) =>
  button.addEventListener('click', (event) => {
    const { target } = event;
    button.style.backgroundColor = '#F7F7F7';
    button.style.color = '#F69906';
    if(answer.textContent === "Error") return;
    operatorClick += 1;
    if(operatorSign !== '' && operatorClick > 1){
        num2 = answer.textContent;
        equalClick = 0;
        answer.textContent = roundResult(operate(operatorSign, num1, num2));
        resettingScreen = true;
        result = roundResult(operate(operatorSign, num1, num2));
        result = result.toString()
        if(result.length > 9){
            answer.textContent = "Error";
            return answer.textContent
        };
    };
    num1 = answer.textContent;
    revertColor();
    operatorSign = target.value;
    signBtn = button;
    resettingScreen = true;
    equalClick = 0;
  })
);

equalBtn.addEventListener('click', event => {
    equalBtn.style.backgroundColor = '#F7F7F7';
    equalBtn.style.color = '#F69906';
    num2 = answer.textContent;
    result = roundResult(operate(operatorSign, num1, num2));
    display = result.toString()
    if(answer.textContent == "Error") return;
    if(display.length > 10) {
        answer.style.fontSize = '65px'
        return answer.textContent = "Error";
    }
    answer.textContent = roundResult(operate(operatorSign, num1, num2));
    resettingScreen = true;
    changeFont(display.length);
    runAgain();
    revertColor();
    equalClick += 1;
    operatorClick = 0;
    signBtn = equalBtn;
    
});

clearBtn.addEventListener('click', () => {
    answer.textContent = '0';
    answer.style.fontSize = '65px';
    numberContainer.removeChild(clearBtn);
    numberContainer.prepend(allClearBtn);
    numClick = 0;
});


backSpace.addEventListener('click', () =>  {
    display = answer.textContent
    changeFont(display.length)
    if(answer.textContent === "0" || answer.textContent === "-0") return;
    if(display.length === 1){
        deleteLast();
        numberContainer.removeChild(clearBtn);
        numberContainer.prepend(allClearBtn);
        numClick = 0;
        return answer.textContent = 0;
    }else if(answer.textContent == '-'){

        return answer.textContent = 0
    }
    return answer.textContent = deleteLast();
});

allClearBtn.addEventListener('click', () => allClear());
refreshBtn.addEventListener('click', () => window.location.reload());
addNeg.addEventListener('click', () => plusMinus());

function showClear(){
    if(answer.textContent === "0") return;
    if(numClick < 1){
        numberContainer.removeChild(allClearBtn);
        numberContainer.prepend(clearBtn);
    }
    numClick += 1    
};

function deleteLast(){
    if(answer.textContent === 0){
        return
    }else{
       display = answer.textContent
       return display.slice(0, -1)
    }
};

function allClear(){
    revertColor();
    answer.style.fontSize = '65px'
    answer.textContent = 0;
    num1 = 0;
    num2 = 0;
    equalClick = 0;
    operatorClick = 0;
    operatorSign = '';
}

function plusMinus(){
    if(num1 !== 0 && resettingScreen == true) return;
    if(answer.textContent === "0"){
        return answer.textContent = "-0"
    }else if(answer.textContent === "-0"){
        return answer.textContent = "0"
    }else if(answer.textContent.indexOf('-') !== -1){
        answer.textContent = answer.textContent * -1
    }else{answer.textContent = answer.textContent * -1}
}

function decimalPlace(decimal){
    if(operatorClick > 0 && resettingScreen){
        revertColor();
        resettingScreen = false
        return answer.textContent = "0."
    }else if(answer.textContent.indexOf('.') !== -1 || resettingScreen){
        return
    }else if(answer.textContent === "0"){
        return answer.textContent = "0."
    }else{answer.textContent += decimal}
    
};

function changeFont(display){
    if(resettingScreen !== true){
        if(display == 7 && resettingScreen !== true) answer.style.fontSize = '65px';
        if(display == 8 && resettingScreen !== true) answer.style.fontSize = '56px';
        if(display == 9 && resettingScreen !== true) answer.style.fontSize = '49px';
        if(display == 10 && resettingScreen !== true) answer.style.fontSize = '44px';
    }else if(resettingScreen == true){
        if(display == 6) answer.style.fontSize = '65px';
        if(display == 7) answer.style.fontSize = '56px';
        if(display == 8) answer.style.fontSize = '49px';
        if(display == 9) answer.style.fontSize = '44px';
    }
}

function roundResult(answer){
    if(answer === "wow ಠ_ಠ")return answer;
    return Math.round( ( answer + Number.EPSILON ) * 10000 ) / 10000
};

function screenDisplay(value){
    if(answer.textContent === "0.") return answer.textContent += value;
    if(answer.textContent === '0' || resettingScreen){
        resetScreen();
    }
answer.textContent += value;
};

function resetScreen(){
    answer.textContent = '';
    resettingScreen = false;
};

//Makes it run again if equal sign is clicked again.
function runAgain(){
    console.log(equalClick)
    if(equalClick >= 1){
        return 
    }else if(num2 === 0){
        return
    }else{num1 = num2}
};

function revertColor(){
    if(!signBtn.textContent == ''){
        signBtn.style.backgroundColor ='#F69906';
        signBtn.style.color = '#F7F7F7';
        }
};

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if(operatorSign === ''){
        a = b;
        return a
    }else if(operator === '+'){
        return a + b
    }else if(operator === '-' && equalClick > 0){
        return b - a
    }else if(operator === '-'){
        return a - b
    }else if(operator === 'x'){
        return a * b
    }else if(operator === '÷' && a == 0 || b == 0){
        answer.style.fontSize = '58px'
        return "wow ಠ_ಠ"
    }else if(operatorSign === '÷' && equalClick > 0){
        return b/a
    }else if(operator === '÷'){
        return a/b
    } 
};
