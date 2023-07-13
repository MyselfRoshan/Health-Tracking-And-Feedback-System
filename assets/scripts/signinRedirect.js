const signinBtn = document.querySelector("[aria-labelledby='Signin btn']");
const signupBtns = document.querySelectorAll("[aria-labelledby='Signup btn']");
// const signupBtns = document.querySelectorAll(".btn__sign-up");

signupBtns.forEach((signupBtn) => {
  signupBtn.addEventListener("click", () => {
    console.log(signupBtn);
    window.location.href = "./pages/signup.html";
  });
});
signinBtn.addEventListener("click", () => {
  window.location.href = "./pages/dashboard.html";
});
