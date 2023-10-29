export async function fetchData(html) {
  try {
    const response = await fetch(html);

    if (response.ok) {
      const data = await response.text();
      document.querySelector(".dashboard__content .wrapper").innerHTML = data;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
