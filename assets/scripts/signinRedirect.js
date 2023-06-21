const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");

signinBtn.addEventListener("click", () => {
  window.location.href = "./pages/signin.html";
});
signupBtn.addEventListener("click", () => {
  window.location.href = "./pages/signup.html";
});
