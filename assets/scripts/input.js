// Function that doesn't revert back the value of inputfield after losing focus
const inputTxtFields = document.querySelectorAll(".input-signup");
inputTxtFields.forEach((inputTxtField) => {
  console.log(inputTxtField);
  inputTxtField.addEventListener("input", () => {
    inputTxtField.setAttribute("value", inputTxtField.value);
  });
});

//  Toggle password to text and vice versa
const togglePassword = document.querySelector("#toggle-password");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", () => {
  const pskType =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", pskType);
  togglePassword.classList.toggle("fa-eye-slash");
  togglePassword.classList.toggle("fa-eye");
});
