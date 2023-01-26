/*
select the elements with the class "keys", "preview" and "screen" from the HTML document, 
and assigns them to the variables "calculatorButtons", "preview" and "caculatorScreen" respectively.
*/
const calculatorButtons = document.querySelector(".keys");
const preview = document.querySelector(".preview");
const calculatorScreen = document.querySelector(".screen");

// const nums = [];
/*
define an array "buttonSymbols" which contains objects that represent the different 
buttons on the calculator and their corresponding classes and actions.
*/
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
/*
define an object "calculatorData" which contains properties that store 
the current value, first operand, operator, and a boolean  indicating if 
it is waiting for a second operand.
*/
const calculatorData = {
  value: "0",
  firstOperand: undefined,
  operator: "",
  waitingForSecondOperand: undefined,
};
/*
Create the "calculate" function that performs a mathematical operation based on 
the operator property of the "calculatorData" object, and updates the value of the 
calculator screen with the result.
*/
const calculate = () => {
  let result;
  calculatorData.operator === "add" &&
    (result = calculatorData.firstOperand + +calculatorData.value);
  calculatorData.operator === "substract" &&
    (result = calculatorData.firstOperand - +calculatorData.value);
  calculatorData.operator === "multiply" &&
    (result = calculatorData.firstOperand * +calculatorData.value);
  calculatorData.operator === "divide" &&
    (result = calculatorData.firstOperand / +calculatorData.value);
  calculatorScreen.value = result;
  console.log(result);
  return result;
};
/*
map over the "buttonSymbols" array and creates an HTML string of anchor tags 
that represent the calculator buttons.
*/
const html = buttonSymbols
  .map(
    (symbol) =>
      `<a href="#" class="${symbol.class}" data-${
        symbol.action ? `action=${symbol.action}` : `value=${symbol.symbol}`
      }>${symbol.symbol}</a>`
  )
  .join("");
/*
 add an event listener to the "window" object that listens for the "load" event, 
 and when it is fired, it inserts the HTML string of buttons into the calculatorButtons 
 element.
*/
window.addEventListener("load", function () {
  calculatorButtons.insertAdjacentHTML("afterbegin", html);
});
/* 
Create the "updateCaclulatorScreen" function that updates the value of the calculator 
screen with the current value property of the calculatorData object.
*/
const updateCaclulatorScreen = () => {
  calculatorScreen.value = calculatorData.value;
};
updateCaclulatorScreen();
/*
Create the "displayValueOnScreen" function that updates the value property of the calculatorData 
object, and concatenates the pressed button's value to it, if it is not zero 
or if it doesn't contain a decimal point.
*/
const displayValueOnScreen = (int) => {
  calculatorData.value =
    calculatorData.value === "0" && !calculatorData.value.includes(".")
      ? (calculatorData.value = int)
      : (calculatorData.value += int);
};
// const setFloat = (int) => {
//   if (calculatorData.value.includes(".")) {
//     calculatorData.value =
//       calculatorData.value !== "0"
//         ? (calculatorData.value = int)
//         : (calculatorData.value += int);
//     document.querySelector(".button-decimal").classList.add("disabled");
//   }
// };
/*
Create the "handleOperator" function that updates the first operand, operator, and 
waitingForSecondOperand properties of the calculatorData object based on the button 
pressed, and calls the "updateCaclulatorScreen" function.
*/
const handleOperator = () => {
  if (
    btn.dataset.action === "add" ||
    btn.dataset.action === "substract" ||
    btn.dataset.action === "multiply" ||
    btn.dataset.action === "divide"
  ) {
    document.querySelector(".button-decimal").classList.remove("disabled");
    calculatorData.firstOperand = +calculatorData.value;

    calculatorData.operator = btn.dataset.action;
    calculatorData.value = "0";
    console.log("Handle operator functions is triggered");
    console.log(btn.dataset.action);
    console.log(calculatorData);
  }
};
calculatorButtons.addEventListener("click", function (e) {
  btn = e.target;
  if (btn.dataset.action === "decimal" && !+calculatorData.value) {
    calculatorData.value = "0.";
    updateCaclulatorScreen();
    console.log("decimal");
    console.log(calculatorData);
  }
  if (btn.dataset.action === "decimal" && +calculatorData.value) {
    calculatorData.value += ".";
    updateCaclulatorScreen();
  }
  if (btn.dataset.value) {
    displayValueOnScreen(btn.dataset.value);
    calculatorData.waitingForSecondOperand = true;
    console.log(calculatorData);
    updateCaclulatorScreen();
  }

  if (!btn.dataset.action) return;
  if (
    btn.dataset.action === "add" ||
    btn.dataset.action === "substract" ||
    btn.dataset.action === "multiply" ||
    btn.dataset.action === "divide"
  ) {
    document.querySelector(".button-decimal").classList.remove("disabled");
    calculatorData.operator = btn.dataset.action;
    calculatorData.firstOperand = +calculatorData.value;

    calculatorData.value = "0";
    console.log(calculatorData);
  }

  if (btn.dataset.action === "calculate" && calculatorData.firstOperand) {
    calculatorData.waitingForSecondOperand = false;
    calculatorData.value = `${calculate()}`;
    updateCaclulatorScreen();
    calculatorData.firstOperand = +calculatorData.value;
    calculatorData.value = "0";
  }
  if (btn.dataset.action === "reset") {
    calculatorData.value = "0";
    calculatorData.firstOperand = undefined;
    // preview.innerHTML = "";
    updateCaclulatorScreen();
  }
});
