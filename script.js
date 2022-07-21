calculatorButtons = document.querySelector(".keys");
preview = document.querySelector(".preview");
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
  { symbol: ".", class: "button button-decimal" },
  { symbol: "0", class: "button button-number" },
  { symbol: "/", class: "button button-divide", action: "divide" },
  { symbol: "x", class: "button button-multiply", action: "multiply" },
  { symbol: "AC", class: "button button-reset", action: "reset" },
  { symbol: "=", class: "button button-equal", action: "calculate" },
];
const calculatorData = {
  value: "0",
  firstOperand: undefined,
  operator: "",
  waitingForSecondOperand: undefined,
};
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

const updateCaclulatorScreen = () => {
  calculatorScreen.value = calculatorData.value;
};
updateCaclulatorScreen();
const setInteger = (int) => {
  calculatorData.value =
    calculatorData.value === "0"
      ? (calculatorData.value = int)
      : (calculatorData.value += int);
};
const setFloat = (float) => {
  calculatorData.value.includes(".") && (calculatorData.value += float);
};
calculatorButtons.addEventListener("click", function (e) {
  btn = e.target;

  if (btn.dataset.value) {
    setInteger(btn.dataset.value);
    if (calculatorData.value.includes(".")) {
      document.querySelector(".button-decimal").classList.add("disabled");
    }
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
    calculatorData.firstOperand = +calculatorData.value;

    calculatorData.operator = btn.dataset.action;
    calculatorData.value = "0";
    console.log(btn.dataset.action);
    console.log(calculatorData);
  }

  if (btn.dataset.action === "calculate" && calculatorData.firstOperand) {
    calculatorData.waitingForSecondOperand = false;
    calculatorData.value = `${calculate()}`;
    updateCaclulatorScreen();
    calculatorData.firstOperand = +calculatorData.value;
  }
  if (btn.dataset.action === "reset") {
    calculatorData.value = "0";
    calculatorData.firstOperand = undefined;
    // preview.innerHTML = "";
    updateCaclulatorScreen();
  }
});
