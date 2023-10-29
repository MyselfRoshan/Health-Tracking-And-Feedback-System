const url = "https://platform.fatsecret.com/rest/server.api";
const oauth = "86f894938ca6461199ca5e3910699c60";
const options = {
  method: "POST",
  //   body: JSON.stringify({ timezoneOffset: timezoneOffset }),
  headers: {
    Authorization: `Bearer {${oauth}}`,
    "Content-Type": "application/json",
  },
};

fetch(url, options).then(response => console.log(response));
