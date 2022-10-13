const equalBtn = document.querySelector("#equal");
const answer = document.querySelector("#answer")
const numKeys = document.querySelectorAll(".num");
const keys = document.querySelector(".logicBtn");
const operateKeys = document.querySelectorAll(".symbol");
const allClearBtn = document.querySelector("#allClearBtn");
const numberContainer = document.querySelector(".number-container");
const backSpace = document.querySelector("#allClearBtn");
const refreshBtn = document.querySelector(".refresh");
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
    if(target.value === '.' && (answer.textContent.indexOf('.') !== -1 || resettingScreen)){
        return
    }
    word = answer.textContent;
    if(word.length > 8) return;
    screenDisplay(target.value);
    revertColor();
    clear();
  })
);

operateKeys.forEach((button) =>
  button.addEventListener('click', (event) => {
    const { target } = event;
    operatorClick += 1;
    if(operatorSign !== '' && operatorClick > 1){
        num2 = answer.textContent;
        answer.textContent = roundResult(operate(operatorSign, num1, num2));
        resettingScreen = true;
        equalClick = 0;
    };
    num1 = answer.textContent;
    button.style.backgroundColor = '#F7F7F7';
    button.style.color = '#F69906';
    operatorSign = button.textContent;
    signBtn = button;
    resettingScreen = true;
    equalClick = 0;
  })
);

equalBtn.addEventListener('click', event => {
    num2 = answer.textContent;
    answer.textContent = roundResult(operate(operatorSign, num1, num2));
    resettingScreen = true;
    runAgain();
    equalClick += 1;
    operatorClick = 0;
});

allClearBtn.addEventListener('click', () => allClear());
clearBtn.addEventListener('click', () => {
    answer.textContent = '0';
    numberContainer.removeChild(clearBtn);
    numberContainer.prepend(allClearBtn);
    numClick = 0;
})

refreshBtn.addEventListener('click', () => window.location.reload())

function clear(){
    if(numClick < 1){
        numberContainer.removeChild(allClearBtn);
        numberContainer.prepend(clearBtn);
    }
    numClick += 1    
}


function allClear(){
    answer.textContent = 0;
    num1 = 0;
    num2 = 0;
    equalClick = 0;
    operatorClick = 0;
    operatorSign = '';
}

function roundResult(answer){
    return Math.round( ( answer + Number.EPSILON ) * 1000 ) / 1000
}

function screenDisplay(value){
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
}

function revertColor(){
    if(!signBtn == ''){
        signBtn.style.backgroundColor ='#F69906';
        signBtn.style.color = '#F7F7F7';
        }
}
function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if(operatorSign === ''){
        a = b;
        return a
    }else if(operator === '+'){
        return a + b
    }else if(operator === '-'){
        return a - b
    }else if(operator === 'x'){
        return a * b
    }else if(operator === '÷' && (a === 0 || b === 0)){
        return "very funny -_-"
    }else if(operatorSign === '÷' && equalClick > 0){
        return b/a
    }if(operator === '÷'){
        return a/b
    } 
};
