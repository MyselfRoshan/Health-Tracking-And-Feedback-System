const glassWater = document.querySelector(".glass-water");
const glassAdd = document.querySelector(".glass-add");
const glassRemove = document.querySelector(".glass-remove");
const setGlassTarget = document.querySelector("#set-glass-target");
const glassTarget = document.querySelector(".glass-target");
const glassToIntake = document.querySelector(".glass-to-intake");
const waterToIntake = document.querySelector(".water-to-intake");

const maximumGlassTarget = parseInt(setGlassTarget.getAttribute("max"));
const minimumGlassTarget = parseInt(setGlassTarget.getAttribute("min"));
const waterPerGlass = 250; //250ml

setGlassTarget.addEventListener("input", e => {
  let inputValue = e.target.value;
  // Only allow numbers [0-9]
  inputValue = inputValue.replace(/\D/g, "");
  // Ensure the value is within the specified range
  if (inputValue < 1) inputValue = 1;
  else if (inputValue > 50) inputValue = 50;
  e.target.value = inputValue;

  if (Number(inputValue) == 1) glassTarget.textContent = `${inputValue} Glass`;
  else glassTarget.textContent = `${inputValue} Glasses`;

  waterLevel("new-target");
});
setGlassTarget.addEventListener("change", () => {});

document.addEventListener("DOMContentLoaded", () => {
  let glassToIntakeValue = Number(glassToIntake.textContent);
  if (glassToIntakeValue == minimumGlassTarget - 1)
    glassRemove.setAttribute("disabled", "true");
  if (glassToIntakeValue == maximumGlassTarget - 1)
    glassAdd.setAttribute("disabled", "true");
  // waterLevel("new-target");

  const inputTxtFields = document.querySelectorAll(".input-signup");
  console.log(inputTxtFields);
  inputTxtFields.forEach(inputTxtField => {
    // inputTxtField.
    inputTxtField.addEventListener("input", () => {
      inputTxtField.setAttribute("value", inputTxtField.value);
      localStorage.setItem(`${inputTxtField.id}`, inputTxtField.value);
    });
  });
});

glassAdd.addEventListener("click", () => {
  let glassToIntakeValue = Number(glassToIntake.textContent);
  glassToIntake.textContent = glassToIntakeValue + 1;
  waterToIntake.textContent = `(${
    parseInt(glassToIntake.textContent) * waterPerGlass
  } ml)`;
  waterLevel("increase");

  if (glassToIntakeValue < maximumGlassTarget)
    glassRemove.removeAttribute("disabled");

  if (glassToIntakeValue == maximumGlassTarget - 1)
    glassAdd.setAttribute("disabled", "true");
});

glassRemove.addEventListener("click", () => {
  let glassToIntakeValue = Number(glassToIntake.textContent);
  glassToIntake.textContent = glassToIntakeValue - 1;
  waterToIntake.textContent = `(${
    parseInt(glassToIntake.textContent) * waterPerGlass
  } ml)`;
  waterLevel("decrease");

  if (glassToIntakeValue > minimumGlassTarget)
    glassAdd.removeAttribute("disabled");

  if (glassToIntakeValue == minimumGlassTarget)
    glassRemove.setAttribute("disabled", "true");
});

function waterLevel(controller) {
  // Water level controller
  // Here -94% and -200% is top property of ::before and ::after pseudo element of water when empty and full
  let noOfGlassTarget = parseInt(setGlassTarget.value);
  let noOfGlassToIntake = parseInt(glassToIntake.textContent);

  // Calculate the percentage change
  let percentageChange = 106 / noOfGlassTarget;

  // Get the current wave height
  let waveHeight = parseFloat(
    getComputedStyle(glassWater).getPropertyValue("--wave"),
  );

  // Calculate the new wave height based on the controller
  let newHeight = waveHeight;
  if (controller === "increase" && noOfGlassToIntake <= noOfGlassTarget) {
    newHeight -= percentageChange;
  } else if (controller === "decrease" && noOfGlassTarget > noOfGlassToIntake) {
    newHeight += percentageChange;
  } else if (controller === "new-target") {
    newHeight = -((noOfGlassToIntake / noOfGlassTarget) * 106 + 100);
  }

  // Ensure the new height is within the bounds
  newHeight = Math.max(-206, Math.min(-100, newHeight));

  // Update the wave height
  glassWater.style.setProperty("--wave", `${newHeight}%`);
}
