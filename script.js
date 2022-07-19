// class Calculator {
//   constructor(leftOperand, rightOperand) {
//     this.leftOperand = leftOperand;
//     this.rightOperand = rightOperand;
//   }
//   clear() {
//     this.leftOperand = 0;
//     this.rightOperand = 0;
//   }
//   calculation(operator) {
//     let result;
//     operator === "add" && (result = this.leftOperand + this.rightOperand);
//     operator === "substract" && (result = this.leftOperand - this.rightOperand);
//     operator === "multiply" && (result = this.leftOperand * this.rightOperand);
//     operator === "divide" && (result = this.leftOperand / this.rightOperand);
//     return result;
//   }
// }

calculatorButtons = document.querySelector(".keys");
calculatorScreenContainer = document.querySelector(".screen-cont");
calculatorScreen = document.querySelector(".screen");
// const nums = [];
const buttonSymbols = [
  { symbol: "7", class: "button button-number" },
  { symbol: "8", class: "button button-number" },
  { symbol: "9", class: "button button-number" },
  { symbol: "DEL", class: "button button-delete", action: "delete" },
  { symbol: "4", class: "button button-number" },
  { symbol: "5", class: "button button-number" },
  { symbol: "6", class: "button button-number" },
  { symbol: "+", class: "button button-plus", action: "add" },
  { symbol: "1", class: "button button-number" },
  { symbol: "2", class: "button button-number" },
  { symbol: "3", class: "button button-number" },
  { symbol: "-", class: "button button-minus", action: "substract" },
  { symbol: ".", class: "button button-decimal", action: "decimal" },
  { symbol: "0", class: "button button-number" },
  { symbol: "/", class: "button button-divide", action: "divide" },
  { symbol: "x", class: "button button-multiply", action: "multiply" },
  { symbol: "AC", class: "button button-reset", action: "reset" },
  { symbol: "=", class: "button button-equal", action: "calculate" },
];
// const add = (...nums) => {nums.reduce(acc,curr)=>acc+curr};
// const calculate = (action) => {
//   if(action === "add")
// }
const html = buttonSymbols
  .map(
    (symbol) =>
      `<a href="#" class="${symbol.class}" data-${
        symbol.action ? `action=${symbol.action}` : `value=${symbol.symbol}`
      }>${symbol.symbol}</a>`
  )
  .join("");

window.addEventListener("load", function () {
  calculatorButtons.insertAdjacentHTML("afterbegin", html);
});
// let firstOperand;
// let operatorIsActivated;
const calcultorData = {
  firstOperand: undefined,
  secondOperand: undefined,
  operator: "",
  symbol: "",
  operatorIsActivated: undefined,
};
calculatorButtons.addEventListener("click", function (e) {
  btn = e.target;
  console.log(btn);

  if (btn.dataset.value) {
    calculatorScreen.value === "0" || calcultorData.operatorIsActivated
      ? (calculatorScreen.value = btn.dataset.value)
      : (calculatorScreen.value += btn.dataset.value);
    calcultorData.operatorIsActivated = false;
  }

  if (
    btn.dataset.action === "add" ||
    btn.dataset.action === "substract" ||
    btn.dataset.action === "multiply" ||
    btn.dataset.action === "divide"
  ) {
    calcultorData.firstOperand = +calculatorScreen.value;
    calcultorData.operator = btn.dataset.action;
    calcultorData.operatorIsActivated = true;
  }

  if (btn.dataset.action === "calculate" && calcultorData.firstOperand) {
    calcultorData.operator === "add" &&
      (calculatorScreen.value =
        calcultorData.firstOperand + +calculatorScreen.value);
    calcultorData.operator === "substract" &&
      (calculatorScreen.value =
        calcultorData.firstOperand - +calculatorScreen.value);
    calcultorData.operator === "multiply" &&
      (calculatorScreen.value =
        calcultorData.firstOperand * +calculatorScreen.value);
    calcultorData.operator === "divide" &&
      (calculatorScreen.value =
        calcultorData.firstOperand / +calculatorScreen.value);
  }
  if (btn.dataset.action === "reset") {
    calculatorScreen.value = "0";
    calcultorData.firstOperand = undefined;
  }

  if (calcultorData.firstOperand && calcultorData.operator) {
    console.log(calculatorScreenContainer);
    let operator;
    calcultorData.operator === "add" && (operator = "+");
    calcultorData.operator === "substract" && (operator = "-");
    calcultorData.operator === "multiply" && (operator = "*");
    calcultorData.operator === "divide" && (operator = "/");

    calculatorScreenContainer.insertAdjacentHTML(
      "afterbegin",
      `<p class='preview'>${calcultorData.firstOperand} ${operator}</p>`
    );
  }
});

// let operatorActivated;
// let lNum, rNum;
// calcBody.addEventListener("click", function (e) {
//   const btnEl = e.target;
//   // Guard close if element dosen't have  button calss and target element dosen't have data-value attribute
//   if (!btnEl.closest(".button")) return;
//   if (btnEl.dataset.value) {
//     if (+screen.value > 0 && !operatorActivated) {
//       console.log("concat");
//       screen.value = screen.value + btnEl.dataset.value;
//     } else if (+screen.value === 0 || operatorActivated) {
//       console.log("replace");
//       screen.value = btnEl.dataset.value;
//       operatorActivated && (operatorActivated = false);
//     }
//   }

//   if (btnEl.dataset.action) {
//     if (
//       btnEl.dataset.action === "add" ||
//       btnEl.dataset.action === "substract" ||
//       btnEl.dataset.action === "multiply" ||
//       btnEl.dataset.action === "divide"
//     ) {
//       if (lNum) {
//         rNum = +screen.value;
//       } else {
//         lNum = +screen.value;
//       }
//       console.log(lNum, rNum);
//       if (lNum && rNum) {
//         const calc = new Calculator(lNum, rNum);
//         const result = calc.calculation(btnEl.dataset.action);
//         screen.value = result;
//         lNum = result;
//         // rNum = "";
//         // operatorActivated = false;
//       }
//       operatorActivated = true;
//     }
//   }
// });
