"use strict";

const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const custom = document.querySelector(".custom");
const tip = document.querySelectorAll(".tip");
const reset = document.querySelector(".reset");

const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
// console.log(tip);

let billValue;
let tipValue;
let customVal;

function tipReset() {
  tipValue = "";

  tip.forEach((e) => {
    e.style.color = "black";
    e.style.backgroundColor = "#579b6d";
  });
}

function init() {
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  bill.value = "";
  people.value = "";
  custom.value = "";
  tipValue = "";
  customVal = "";
  tipReset();
}

reset.addEventListener("click", () => {
  init();
});

function calcResult(value) {
  let sum = 0;
  if (people.value && Number(people.value) >= 1) {
    sum = (Number(bill.value) * Number(value)) / 100 / people.value;
    return sum.toFixed(2);
  } else {
    sum = (Number(bill.value) * Number(value)) / 100;
    return sum.toFixed(2);
  }
}

function displayResults(result) {
  if (Number(bill.value) >= 1 && Number(people.value) > 0) {
    tipAmount.textContent = `$${result}`;
    totalAmount.textContent = `$${(
      Number(bill.value) / Number(people.value) +
      Number(result)
    ).toFixed(2)}`;
  } else if (Number(bill.value) >= 1) {
    tipAmount.textContent = `$${result}`;
    totalAmount.textContent = `$${(Number(bill.value) + Number(result)).toFixed(
      2
    )}`;
  }
}

tip.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    customVal = "";
    tipReset();
    tipButton.style.color = "black";
    tipButton.style.backgroundColor = "#68fe9a";
    tipValue = Number(tipButton.value);

    displayResults(calcResult(tipValue));
  });
});

custom.addEventListener("input", () => {
  tipReset();
  customVal = Number(custom.value);

  displayResults(calcResult(customVal));
  console.log(custom.value);
});

bill.addEventListener("input", () => {
  if (tipValue || customVal) {
    displayResults(calcResult(tipValue ? tipValue : customVal));
  }
});

people.addEventListener("input", () => {
  if (tipValue || customVal) {
    displayResults(calcResult(tipValue ? tipValue : customVal));
  }
});
