const equalBtn = document.querySelector("#equal");
const answer = document.querySelector("#answer")
const numKeys = document.querySelectorAll(".num");
const keys = document.querySelector(".logicBtn");
const operateKeys = document.querySelectorAll(".symbol");
const clearBtn = document.querySelector("#clearBtn");

let resettingScreen = false;
let num1 = 0;
let num2 = 0;
let operatorSign = '';
let signBtn = '';

numKeys.forEach((button) =>
  button.addEventListener('click', (event) => {
    const { target } = event;
    screenDisplay(target.value);
    if(!signBtn == ''){
    signBtn.style.backgroundColor ='#F69906';
    signBtn.style.color = '#F7F7F7';
    }
  })
);

operateKeys.forEach((button) =>
  button.addEventListener('click', (event) => {
    const { target } = event;
    if(operatorSign !== '') ;
    num1 = answer.textContent;
    button.style.backgroundColor = '#F7F7F7';
    button.style.color = '#F69906';
    operatorSign = button.textContent;
    signBtn = button;
    resettingScreen = true;
  })
);

equalBtn.addEventListener('click', event => {
    num2 = answer.textContent;
    answer.textContent = operate(operatorSign, num1, num2);
    
});

clearBtn.addEventListener('click', () => clear());

function clear(){
    answer.textContent = 0;
    num1 = 0;
    num2 = 0;
    operatorSign = '';
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

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if(operator === '+'){
        return a + b
    }else if(operator === '-'){
        return a - b
    }else if(operator === 'x'){
        return a * b
    }else if(operator === '÷' && (a === 0 || b === 0)){
        return "very funny -_-"
    }else if(operator === '÷'){
        return a/b
    }
};
