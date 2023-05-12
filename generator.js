const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const excludeInput = document.getElementById("exclude");
const noRepeatToggle = document.getElementById("no-repeat");
const generateButton = document.getElementById("generate");
const output = document.getElementById("output");

const usedNumbers = new Set();

function generateNumber(min, max, exclude, noRepeat) {
  if (noRepeat && usedNumbers.size === (max - min + 1)) {
    return "No more numbers to show as no repeat is enabled.";
  }
  
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  
  if (exclude) {
    const excludeList = exclude.split(",").map(Number);
    while (excludeList.includes(number)) {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  
  if (noRepeat) {
    while (usedNumbers.has(number)) {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    usedNumbers.add(number);
  }
  
  return number;
}

generateButton.addEventListener("click", () => {
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);
  const exclude = excludeInput.value;
  const noRepeat = noRepeatToggle.checked;
  
  if (min >= max) {
    output.textContent = "Minimum number must be less than maximum number.";
    return;
  }
  
  const number = generateNumber(min, max, exclude, noRepeat);
  output.textContent = number;
});
