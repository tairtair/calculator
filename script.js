calcBody = document.querySelector(".keys");
screen = document.querySelector(".screen");
const nums = [];
let actionPressed = false;
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
  { symbol: ".", class: "button button-dot" },
  { symbol: "0", class: "button button-number" },
  { symbol: "/", class: "button button-divide", action: "divide" },
  { symbol: "x", class: "button button-multiply", action: "multiply" },
  { symbol: "AC", class: "button button-reset", action: "reset" },
  { symbol: "=", class: "button button-equal", action: "calculate" },
];
// const add = (...nums) => {nums.reduce(acc,curr)=>acc+curr};
const html = buttonSymbols
  .map(
    (symbol) =>
      `<a href="#" class="${symbol.class}" data-${
        symbol.action ? `action=${symbol.action}` : `value=${symbol.symbol}`
      }>${symbol.symbol}</a>`
  )
  .join("");

window.addEventListener("load", function () {
  calcBody.insertAdjacentHTML("afterbegin", html);
});
class Calculator {
  constructor(leftOperand, rightOperand) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
  clear() {
    this.leftOperand = 0;
    this.rightOperand = 0;
  }
  calculation(operator) {
    let result;
    operator === "add" && (result = this.leftOperand + this.rightOperand);
    operator === "substract" && (result = this.leftOperand - this.rightOperand);
    operator === "multiply" && (result = this.leftOperand * this.rightOperand);
    operator === "divide" && (result = this.leftOperand / this.rightOperand);
    return result;
  }
  // add() {
  //   return this.leftOperand + this.rightOperand;
  // }
  // substract() {
  //   return this.leftOperand - this.rightOperand;
  // }
  // multiply() {
  //   return this.leftOperand * this.rightOperand;
  // }
  // divide() {
  //   return this.leftOperand * this.rightOperand;
  // }
}

// const displayNumber = (key) => {
//   if (actionPressed) {
//     screen.innerHTML = "";
//     key.dataset.value &&
//       (screen.innerHTML = screen.innerHTML + key.dataset.value);
//   } else {
//     screen.innerHTML !== "0" &&
//       key.dataset.value &&
//       (screen.innerHTML = screen.innerHTML + key.dataset.value);
//     screen.innerHTML === "0" &&
//       key.dataset.value &&
//       (screen.innerHTML = key.dataset.value);
//   }
// };
// // screen.textCotent !== "0" &&
// //   (screen.textCotent = screen.textCotent + key.dataset.value);
// // screen.textCotent === "0" && (screen.textCotent = key.dataset.value);
// // btnEl.dataset.value.match(/[0-9]/g) &&
// //   screen.innerHTML !== "0" &&
// //   screen.insertAdjacentHTML("beforeend", btnEl.dataset.value);
// // btnEl.dataset.value.match(/[0-9]/g) &&
// //   screen.innerHTML === "0" &&
// //   (screen.innerHTML = btnEl.dataset.value);

// // const clearDisplay = () => (screen.textCotent = "");
let operatorActivated;
let lNum, rNum;
calcBody.addEventListener("click", function (e) {
  const btnEl = e.target;
  // Guard close if element dosen't have  button calss and target element dosen't have data-value attribute
  // if (!btnEl.dataset.value) return;
  if (!btnEl.closest(".button")) return;
  if (btnEl.dataset.value) {
    if (+screen.value > 0 && !operatorActivated) {
      console.log("contact");
      screen.value = screen.value + btnEl.dataset.value;
    } else if (+screen.value === 0 || operatorActivated) {
      console.log("replace");
      screen.value = btnEl.dataset.value;
      operatorActivated && (operatorActivated = false);
    }
  }

  if (btnEl.dataset.action) {
    if (
      btnEl.dataset.action === "add" ||
      btnEl.dataset.action === "substract" ||
      btnEl.dataset.action === "multiply" ||
      btnEl.dataset.action === "divide"
    ) {
      operatorActivated = true;
      if (lNum) {
        console.log(screen.value);
        rNum = +screen.value;
      } else {
        lNum = +screen.value;
      }
      console.log(lNum, rNum);
      if (lNum && rNum) {
        const calc = new Calculator(lNum, rNum);
        const result = calc.calculation(btnEl.dataset.action);
        screen.value = result;
        lNum = result;
        rNum = 0;
      }
    }
  }
  // const calc = new Calculator();
  // if (btnEl.dataset.action === "plus") {
  //   actionPressed = true;
  //   nums.push(+screen.innerHTML);
  // }
  // e.target.dataset.value.match(/[+-\/x]/g) &&
  //   screen.insertAdjacentHTML("beforeend", e.target.innerHTML);
});
