const saveButton = document.getElementById("save-button");
const selectDate = document.getElementById("select-date");
const bedTime = document.getElementById("bed-time");
const wakeupTime = document.getElementById("wakeup-time");
const sleepDuration = document.querySelector(".sleep-time");

document.addEventListener("DOMContentLoaded", function () {
  let Sleep = JSON.parse(localStorage.getItem("Sleep")) || {};

  // When page loads auto load value from localStorage on matching date to respective inputs
  updateSleepData(selectDate.value);
  function updateSleepData(date) {
    function formatTime(hours, minutes) {
      hours = hours.toString().padStart(2, "0");
      minutes = minutes.toString().padStart(2, "0");
      return `${hours % 12}:${minutes}${hours <= 12 ? "AM" : "PM"}`;
    }
    if (date in Sleep) {
      // bedTime.removeAttribute("data-default");
      // wakeupTime.removeAttribute("data-default");

      bedTime.value = formatTime(Sleep[date].bed.hour, Sleep[date].bed.minute);

      wakeupTime.value = formatTime(
        Sleep[date].wakeup.hour,
        Sleep[date].wakeup.minute,
      );

      sleepDuration.textContent = `${Sleep[date].duration.hour} hours and ${Sleep[date].duration.minute} minutes`;
    }
  }

  selectDate.value = NepaliFunctions.GetCurrentBsDate("YYYY-MM-DD");
  selectDate.nepaliDatePicker({
    language: "english",
    dateFormat: "YYYY-MM-DD",
    ndpYear: true,
    ndpMonth: true,
    ndpYearCount: 10,
    disableDaysBefore: 365,
    disableDaysAfter: 0,

    onChange: e => {
      if (e.bs in Sleep) updateSleepData(e.bs);
      else {
        Sleep[e.bs] = {
          bed: {
            hour: parseInt(bedTime.value.split(":")[0]),
            minute: parseInt(bedTime.value.split(":")[1]),
          },
          wakeup: {
            hour: parseInt(wakeupTime.value.split(":")[0]),
            minute: parseInt(wakeupTime.value.split(":")[1]),
          },
          duration: {
            hour: getSleepDuration().hour,
            minute: getSleepDuration().minute,
          },
        };

        localStorage.setItem("Sleep", JSON.stringify(Sleep));
        console.log(Sleep);
      }
    },
  });

  getSleepDuration(selectDate.value);
  function convertTo24HourFormat(timeString) {
    const [hourStr, minuteStr] = timeString.split(":");
    let [hours, minutes] = [parseInt(hourStr), parseInt(minuteStr.slice(0, 2))];

    if (timeString.includes("PM") && hours !== 12) {
      hours += 12;
    } else if (timeString.includes("AM") && hours === 12) {
      hours = 0;
    }

    return { hour: hours, minute: minutes };
  }

  function getSleepDuration() {
    const bedTime24Hr = convertTo24HourFormat(bedTime.value);
    const wakeupTimeValue = wakeupTime.value || wakeupTime.dataset.default;
    const wakeupTime24Hr = convertTo24HourFormat(wakeupTimeValue);

    let hours =
      wakeupTime24Hr.hour > bedTime24Hr.hour
        ? wakeupTime24Hr.hour - bedTime24Hr.hour
        : wakeupTime24Hr.hour + (24 - bedTime24Hr.hour);

    let minutes = wakeupTime24Hr.minute - bedTime24Hr.minute;

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    $(".sleep-time").text(`${hours} hours and ${minutes} minutes`);
    return { hour: hours, minute: minutes };
  }

  $(".timepicker").pickatime({
    autoclose: true,
    twelvehour: true,
    vibrate: true,
    donetext: "OK",
    afterDone: (Element, Time) => {
      console.log(Element[0].name, Time);
      if (Element[0].name === "bedTime") {
        Sleep[selectDate.value] = {
          bed: {
            hour: parseInt(Time.split(":")[0]),
            minute: parseInt(Time.split(":")[1]),
          },
          wakeup: {
            hour: parseInt(wakeupTime.value.split(":")[0]),
            minute: parseInt(wakeupTime.value.split(":")[1]),
          },
          duration: {
            hour: getSleepDuration().hour,
            minute: getSleepDuration().minute,
          },
        };
      } else if (Element[0].name === "wakeupTime") {
        Sleep[selectDate.value] = {
          bed: {
            hour: parseInt(bedTime.value.split(":")[0]),
            minute: parseInt(bedTime.value.split(":")[1]),
          },
          wakeup: {
            hour: parseInt(Time.split(":")[0]),
            minute: parseInt(Time.split(":")[1]),
          },
          duration: {
            hour: getSleepDuration().hour,
            minute: getSleepDuration().minute,
          },
        };
      }
      localStorage.setItem("Sleep", JSON.stringify(Sleep));
      console.log(Sleep);
    },
  });
});
