const menuToggle = document.querySelector(".menu-toggle[role = 'switch']");
const menuItems = document.querySelectorAll(".menu-item");
const menuItemsDesc = document.querySelectorAll(".menu-item__desc");
const dashboard = document.querySelector(".dashboard");
menuToggle.addEventListener("click", () => {
  dashboard.classList.toggle("menu-open");
  const profileUsername = document.querySelector(".profile__username");
  const profileRole = document.querySelector(".profile__role");
  const profileLogout = document.querySelector(".profile__logout > *");
  profileUsername.toggleAttribute("hidden");
  profileRole.toggleAttribute("hidden");
  profileLogout.toggleAttribute("hidden");
  menuItemsDesc.forEach((menuItemDesc) => {
    menuItemDesc.toggleAttribute("hidden");
  });
});

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove("active");
      const menuItemIcon = menuItem.firstElementChild.firstElementChild;
      const iconType = menuItemIcon.getAttribute("name");
      console.log(iconType);
      if (!iconType.includes("-outline"))
        menuItemIcon.setAttribute("name", iconType.concat("-outline"));
    });
    menuItem.classList.add("active");
    const menuItemIcon = menuItem.firstElementChild.firstElementChild;
    const iconType = menuItemIcon.getAttribute("name");
    iconType.includes("-outline")
      ? menuItemIcon.setAttribute("name", iconType.replace("-outline", ""))
      : menuItemIcon.setAttribute("name", iconType.concat("-outline"));
  });
});
