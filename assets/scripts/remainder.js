const notifications = document.querySelectorAll(".notification");
const closeBtns = document.querySelectorAll(".notification__close-btn");

document.addEventListener("DOMContentLoaded", () => {
  // console.log(closeBtn, notification);
  closeBtns.forEach((closeBtn, i) => {
    closeBtn.addEventListener("click", (e) => {
      notifications[i].classList.add("closed");
      setTimeout(() => {
        notifications[i].remove();
      }, 500);
    });
  });
});
