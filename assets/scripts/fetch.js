export async function fetchData(html, fileName) {
  try {
    const response = await fetch(html);

    if (response.ok) {
      const data = await response.text();

      const state = {};
      const title = "new page title";
      const url = `${fileName}.html`;
      history.pushState(state, title, url);
      document.querySelector(".dashboard__content .wrapper").innerHTML = data;
      // document.body.innerHTML = data;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
