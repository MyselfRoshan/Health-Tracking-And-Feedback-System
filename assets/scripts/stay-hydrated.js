document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const waterAmountInput = document.getElementById("waterAmount");
  const glassesCountElement = document.getElementById("glassesCount");
  const remainderElement = document.getElementById("remainder");
  const addGlassButton = document.getElementById("addGlass");
  const removeGlassButton = document.getElementById("removeGlass");

  // Initial values
  let waterIntake = 0; // Current water intake in ml
  const dailyGoal = 2000; // Daily goal in ml
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
  addGlassButton.addEventListener("click", function () {
    waterIntake += glassSize;
    waterAmountInput.value = waterIntake;
    updateDisplay();
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
  });
});
