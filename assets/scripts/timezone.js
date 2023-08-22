async function fetchData() {
  // Get user's timezone offset in minutes
  let timezoneOffset = new Date().getTimezoneOffset();
  console.log(timezoneOffset / 60);

  try {
    const response = await fetch("get_timezone.php", {
      method: "POST",
      body: JSON.stringify({ timezoneOffset: timezoneOffset }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.text();
      console.log("Server response:", data);
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the async function to fetch data
fetchData();
