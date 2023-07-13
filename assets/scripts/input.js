// Function that doesn't revert back the value of inputfield after losing focus
const inputTxtFields = document.querySelectorAll(".input-signup");
inputTxtFields.forEach((inputTxtField) => {
  inputTxtField.addEventListener("input", () => {
    inputTxtField.setAttribute("value", inputTxtField.value);
    localStorage.setItem(`${inputTxtField.id}`, inputTxtField.value);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  inputTxtFields.forEach((inputTxtField) => {
    let getInputTxtFieldValue = "";
    // If null and "" return else set local storage value to input value
    if (!localStorage.getItem(`${inputTxtField.id}`)) return;
    getInputTxtFieldValue = localStorage.getItem(`${inputTxtField.id}`);
    inputTxtField.setAttribute("value", getInputTxtFieldValue);
  });
});
//  Toggle password to text and vice versa
const togglePassword = document.querySelector("#toggle-password");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", () => {
  const pskType =
    password.getAttribute("type") === "password" ? "text" : "password";
  const iconType =
    togglePassword.getAttribute("name") === "eye-outline"
      ? "eye-off-outline"
      : "eye-outline";
  password.setAttribute("type", pskType);
  togglePassword.setAttribute("name", iconType);
});
