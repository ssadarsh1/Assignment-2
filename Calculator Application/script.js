const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let currentInput = "";
let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if ((value >= "0" && value <= "9") || value === ".") {
      currentInput += value;
      display.textContent = currentInput;
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      if (currentInput !== "") {
        expression += currentInput + " " + value + " ";
        currentInput = "";
      }
      display.textContent = value;
    }
  });
});

equalsButton.addEventListener("click", () => {
  if (currentInput !== "") {
    expression += currentInput;
    try {
      const result = eval(expression.replace("÷", "/").replace("x", "*"));
      display.textContent = result;
      expression = "";
      currentInput = "";
    } catch (error) {
      display.textContent = "Error";
    }
  }
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  expression = "";
  display.textContent = "0";
});
