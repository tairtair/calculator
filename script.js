calcBody = document.querySelector(".operations");
displayNum = document.querySelector(".display-number");
const buttonSymbols = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
  "RESET",
  "=",
];
// const add = (...nums) => {nums.reduce(acc,curr)=>acc+curr};
const html = buttonSymbols
  .map((symbol) => {
    let cl = "button";
    if (symbol === "RESET") cl = "button button-reset";
    if (symbol === "=") cl = "button button-equal";
    return `<a href="#" class="${cl}">${symbol}</a>`;
  })
  .join("", ",");

window.addEventListener("load", function () {
  calcBody.insertAdjacentHTML("afterbegin", html);
});

calcBody.addEventListener("click", function (e) {
  if (e.target.closest(".button")) {
    e.target.innerHTML.match(/[0-9]/g) &&
      displayNum.insertAdjacentHTML("beforeend", e.target.innerHTML);
    e.target.innerHTML.match(/[+-\/x]/g) &&
      displayNum.insertAdjacentHTML("beforeend", e.target.innerHTML);
  }
});
