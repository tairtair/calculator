calcBody = document.querySelector(".operations");
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
  e.target.closest(".button") && console.log(e.target.innerHTML);
});
