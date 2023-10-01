document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  // const waterAmountInput = document.getElementById("waterAmount");
  const glassCountElement = document.querySelector(".glass-count");
  const glassRemainingElement = document.querySelector(".glass-remaining");
  const glassIntakedElement = document.querySelector(".glass-intaked");
  const glassAddButton = document.querySelector(".glass-add");
  const glassRemoveButton = document.querySelector(".glass-remove");

  const glassWater = document.querySelector(".glass-water");
  // Initial values
  let empty = false;
  let full = false;
  let waterIntake = 0; // Current water intake in ml
  const dailyGoal = 3000; // Daily goal in ml
  const glassSize = 250; // Size of one glass in ml
  const glasstoIntake = Math.floor(dailyGoal / glassSize);

  // Update the display with initial values
  updateDisplay();

  // Function to update the display
  function updateDisplay() {
    let glassCount = Math.floor(waterIntake / glassSize);
    glassCountElement.textContent = glassCount;
    glassRemainingElement.textContent = dailyGoal - waterIntake;
    glassIntakedElement.textContent = waterIntake;
    if (glassCount >= glasstoIntake) full = true;
    if (waterIntake === 0) empty = true;
  }

  // Event listener for the "Add a Glass" button
  glassAddButton.addEventListener("click", () => {
    empty = false;
    if (!full) {
      waterIntake += glassSize;
      updateDisplay();
      waterLevel("increase");
    }
  });

  // Event listener for the "Remove a Glass" button
  glassRemoveButton.addEventListener("click", () => {
    waterIntake -= glassSize;
    updateDisplay();
    if (glassCount < glasstoIntake) full = false;
    if (!empty) {
      waterLevel("decrease");
    }
  });

  // Water level controller
  // Here -94% and -200% is top property of ::before and ::after pseudo element of water when empty and full
  const emptyGlass = -98;
  const fullGlass = -206;
  const percentageToIncreaseOrDecrease = Number(
    (106 / (dailyGoal / glassSize)).toFixed(1),
  );

  function waterLevel(controller) {
    let waveHeight = Number(
      getComputedStyle(glassWater).getPropertyValue("--wave").replace("%", ""),
    );

    // if (waveHeight <= emptyGlass && waveHeight >= filledGlass) {
    if (waveHeight <= emptyGlass && waveHeight >= fullGlass) {
      let newHeight;
      if (controller === "increase")
        newHeight = waveHeight - percentageToIncreaseOrDecrease;
      if (controller === "decrease")
        newHeight = waveHeight + percentageToIncreaseOrDecrease;
      if (newHeight <= emptyGlass && newHeight >= fullGlass)
        glassWater.style.setProperty("--wave", `${newHeight}%`);
      console.table(percentageToIncreaseOrDecrease, waveHeight, newHeight);
    }
  }
});
