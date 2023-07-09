const signinBtn = document.querySelector("#btn__sign-in");
const signupBtns = document.querySelectorAll(".btn__sign-up");

signupBtns.forEach((signupBtn) => {
  signupBtn.addEventListener("click", () => {
    console.log(signupBtn);
    window.location.href = "./pages/signup.html";
  });
});
signinBtn.addEventListener("click", () => {
  window.location.href = "./pages/dashboard.html";
});
