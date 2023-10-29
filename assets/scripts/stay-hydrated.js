const glassWater = document.querySelector(".glass-water");
const glassWaterForm = document.querySelector(".glass-water__form");
const glassAdd = document.querySelector(".glass-add");
const glassRemove = document.querySelector(".glass-remove");
const setGlassTarget = document.querySelector("#set-glass-target");
const glassTarget = document.querySelector(".glass-target");
const glassToIntake = document.querySelector(".glass-to-intake");
const waterToIntake = document.querySelector(".water-to-intake");
const selectDate = document.querySelector("#select-date");

const maximumGlassTarget = parseInt(setGlassTarget.getAttribute("max"));
const minimumGlassTarget = parseInt(setGlassTarget.getAttribute("min"));
const waterPerGlass = 250; // 250ml

let Water = JSON.parse(localStorage.getItem("Water")) || {};

function updateWaterData(date) {
  if (date in Water) {
    setGlassTarget.value = Water[date].target;
    glassToIntake.textContent = Water[date].intaked;
    glassTarget.textContent = `${setGlassTarget.value} Glass${
      setGlassTarget.value != "1" ? "es" : ""
    }`;
    waterToIntake.textContent = `(${
      parseInt(glassToIntake.textContent) * waterPerGlass
    } ml)`;
    waterLevel("new-target");
  }
}

function updateLocalStorage() {
  Water[selectDate.value] = {
    target: parseInt(setGlassTarget.value),
    intaked: parseInt(glassToIntake.textContent),
  };
  localStorage.setItem("Water", JSON.stringify(Water));
}

function handleGlassAction(increase) {
  let glassToIntakeValue = Number(glassToIntake.textContent);

  if (increase) {
    glassToIntake.textContent = glassToIntakeValue + 1;
  } else {
    glassToIntake.textContent = glassToIntakeValue - 1;
  }

  waterToIntake.textContent = `(${
    parseInt(glassToIntake.textContent) * waterPerGlass
  } ml)`;
  waterLevel(increase ? "increase" : "decrease");

  if (increase) {
    if (glassToIntakeValue < maximumGlassTarget) {
      glassRemove.removeAttribute("disabled");
    }

    if (glassToIntakeValue === maximumGlassTarget - 1) {
      glassAdd.setAttribute("disabled", "true");
    }
  } else {
    if (glassToIntakeValue > minimumGlassTarget) {
      glassAdd.removeAttribute("disabled");
    }

    if (glassToIntakeValue === minimumGlassTarget) {
      glassRemove.setAttribute("disabled", "true");
    }
  }

  updateLocalStorage();
}

function handleSetGlassTargetChange(e) {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, "");
  inputValue = Math.min(50, Math.max(1, inputValue));
  e.target.value = inputValue;
  glassTarget.textContent = `${inputValue} Glass${
    inputValue !== "1" ? "es" : ""
  }`;
  glassTarget.textContent = `${setGlassTarget.value} Glass${
    parseInt(setGlassTarget.value) !== 1 ? "es" : ""
  }`;
  waterLevel("new-target");
  updateLocalStorage();
}

function handleDateChange() {
  updateWaterData(selectDate.value);
  updateLocalStorage();
}

// Initialize the UI
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = selectDate.value;
  updateWaterData(currentDate);

  let glassToIntakeValue = Number(glassToIntake.textContent);
  if (glassToIntakeValue === minimumGlassTarget - 1)
    glassRemove.setAttribute("disabled", "true");
  if (glassToIntakeValue === maximumGlassTarget - 1)
    glassAdd.setAttribute("disabled", "true");

  setGlassTarget.addEventListener("input", handleSetGlassTargetChange);

  const inputTxtFields = document.querySelectorAll(".input-signup");
  inputTxtFields.forEach(inputTxtField => {
    inputTxtField.addEventListener("input", () => {
      inputTxtField.setAttribute("value", inputTxtField.value);
      localStorage.setItem(`${inputTxtField.id}`, inputTxtField.value);
    });
  });

  selectDate.value = NepaliFunctions.GetCurrentBsDate("YYYY-MM-DD");
  selectDate.nepaliDatePicker({
    language: "english",
    dateFormat: "YYYY-MM-DD",
    ndpYear: true,
    ndpMonth: true,
    ndpYearCount: 10,
    readOnlyInput: true,
    disableDaysBefore: 365,
    disableDaysAfter: 0,
    onChange: handleDateChange,
  });
});

glassAdd.addEventListener("click", () => handleGlassAction(true));
glassRemove.addEventListener("click", () => handleGlassAction(false));

function waterLevel(controller) {
  let noOfGlassTarget = parseInt(setGlassTarget.value);
  let noOfGlassToIntake = parseInt(glassToIntake.textContent);
  let percentageChange = 106 / noOfGlassTarget;
  let waveHeight = parseFloat(
    getComputedStyle(glassWater).getPropertyValue("--wave"),
  );
  let newHeight = waveHeight;

  if (controller === "increase" && noOfGlassToIntake <= noOfGlassTarget) {
    newHeight -= percentageChange;
  } else if (controller === "decrease" && noOfGlassTarget > noOfGlassToIntake) {
    newHeight += percentageChange;
  } else if (controller === "new-target") {
    newHeight = -((noOfGlassToIntake / noOfGlassTarget) * 106 + 100);
  }

  newHeight = Math.max(-206, Math.min(-100, newHeight));
  glassWater.style.setProperty("--wave", `${newHeight}%`);
}
