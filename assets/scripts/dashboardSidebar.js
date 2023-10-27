import { fetchData } from "./fetch.js";

// visit this link for better routing https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh

const pages = {
  add: { value: "add", active: true },
  grid: { value: "overview", active: false },
  "calendar-clear": { value: "reminder", active: false },
  flag: { value: "goal", active: false },
};

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

// Document.onload = fetchData("/pages/user/add.html");

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove("active");
      const menuItemIcon = menuItem.firstElementChild.firstElementChild;
      const iconType = menuItemIcon.getAttribute("name");
      // console.log(menuItemIcon);
      if (!iconType.includes("-outline"))
        menuItemIcon.setAttribute("name", iconType.concat("-outline"));
    });

    menuItem.classList.add("active");
    const menuItemIcon = menuItem.firstElementChild.firstElementChild;
    const iconType = menuItemIcon.getAttribute("name");
    const iconOutlined = iconType.concat("-outline");
    const iconFilled = iconType.replace("-outline", "");

    // fetchData(`/pages/user/reminder.html`);
    if (Object.keys(pages).includes(iconFilled)) {
      fetchData(
        `/pages/user/${pages[`${iconFilled}`]["value"]}.html`,
        pages[`${iconFilled}`]["value"]
      );
      // Remove active status from all pages and add active to current page
      Object.values(pages).forEach((page) => (page.active = false));
      pages[`${iconFilled}`]["active"] = true;
      console.log(pages);
    }
    // console.log(new Headers().values);
    iconType.includes("-outline")
      ? menuItemIcon.setAttribute("name", iconFilled)
      : menuItemIcon.setAttribute("name", iconOutlined);
  });
});
