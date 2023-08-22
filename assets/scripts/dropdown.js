const dropdownTogglers = document.querySelectorAll(".dropdown-toggler");
const dropdownIcons = document.querySelectorAll(".dropdown-toggler > ion-icon");
const dropdownItems = document.querySelectorAll(".dropdown-items");

dropdownTogglers.forEach((dropdownToggler, i) => {
  dropdownToggler.addEventListener("click", () => {
    console.log(dropdownTogglers[i]);
    dropdownItems[i].classList.toggle("active");

    dropdownIcons[i].getAttribute("name").includes("down")
      ? dropdownIcons[i].setAttribute("name", "chevron-up")
      : dropdownIcons[i].setAttribute("name", "chevron-down");
  });
});

// for (let i = 0; i < dropdownTogglers.length; i++) {
//   dropdownTogglers[i].addEventListener("click", () => {
//     console.log(dropdownTogglers[i]);
//     dropdownItems[i].classList.toggle("active");

//     dropdownIcons[i].getAttribute("name").includes("down")
//       ? dropdownIcons[i].setAttribute("name", "chevron-up")
//       : dropdownIcons[i].setAttribute("name", "chevron-down");
//   });
// }
