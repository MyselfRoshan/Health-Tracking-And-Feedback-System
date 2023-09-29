document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const waterAmountInput = document.getElementById("waterAmount");
  const glassesCountElement = document.getElementById("glassesCount");
  const remainderElement = document.getElementById("remainder");
  const addGlassButton = document.getElementById("addGlass");
  const removeGlassButton = document.getElementById("removeGlass");

  const glassOfWater = document.querySelector(".water");

  // Initial values
  let waterIntake = 0; // Current water intake in ml
  const dailyGoal = 3000; // Daily goal in ml
  const glassSize = 250; // Size of one glass in ml

  // Update the display with initial values
  updateDisplay();

  // Function to update the display
  function updateDisplay() {
    glassesCountElement.textContent = Math.floor(waterIntake / glassSize);
    remainderElement.textContent = dailyGoal - waterIntake + " ml Remaining";
  }

  // Event listener for the waterAmount input
  waterAmountInput.addEventListener("change", function () {
    waterIntake = parseInt(this.value);
    updateDisplay();
  });

  // Event listener for the "Add a Glass" button
  addGlassButton.addEventListener("click", () => {
    waterIntake += glassSize;
    waterAmountInput.value = waterIntake;

    updateDisplay();
    waterLevel("increase");
  });

  // Event listener for the "Remove a Glass" button
  removeGlassButton.addEventListener("click", function () {
    if (waterIntake >= glassSize) {
      waterIntake -= glassSize;
    } else {
      waterIntake = 0;
    }
    waterAmountInput.value = waterIntake;

    updateDisplay();
    waterLevel("decrease");
  });

  // Water level controller
  function waterLevel(controller) {
    let waveHeight =
      getComputedStyle(glassOfWater)
        .getPropertyValue("--wave")
        .replace("%", "") ?? "-94%";
    console.log(waveHeight);

    // Here -94% and -200% is top property of ::before and ::after pseudo element of water when empty and full
    const emptyGlass = -94;
    const filledGlass = -200;
    const percentageToIncreaseOrDecrease = Math.floor(
      Math.abs((filledGlass - emptyGlass) / (dailyGoal / glassSize)),
    );
    console.log(percentageToIncreaseOrDecrease);
    if (
      waveHeight <= emptyGlass &&
      waveHeight >= filledGlass &&
      dailyGoal - waterIntake > 0
    ) {
      let newHeight;
      if (controller === "increase")
        newHeight = Number(waveHeight) - percentageToIncreaseOrDecrease;
      if (controller === "decrease")
        newHeight = Number(waveHeight) + percentageToIncreaseOrDecrease;

      if (newHeight <= emptyGlass && newHeight >= filledGlass)
        glassOfWater.style.setProperty("--wave", `${newHeight}%`);
    }
  }
});
