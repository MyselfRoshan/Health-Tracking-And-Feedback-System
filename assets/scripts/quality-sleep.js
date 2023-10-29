document.addEventListener("DOMContentLoaded", function () {
  // Define your elements
  const selectDate = document.getElementById("select-date");
  const bedTime = document.getElementById("bed-time");
  const wakeupTime = document.getElementById("wakeup-time");
  const sleepDuration = document.querySelector(".sleep-time");

  // Load data from localStorage
  let Sleep = JSON.parse(localStorage.getItem("Sleep")) || {};
  // Function to format time with AM/PM
  function to12HourFormat(hours, minutes) {
    const period = hours < 12 ? "AM" : "PM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes}${period}`;
  }

  // Function to calculate sleep duration
  function calculateSleepDuration(bedTimeValue, wakeupTimeValue) {
    const bedTime24Hr = to24HourFormat(bedTimeValue);
    const wakeupTime24Hr = to24HourFormat(
      wakeupTimeValue ?? wakeupTime.dataset.default,
    );

    let hours =
      wakeupTime24Hr.hour > bedTime24Hr.hour
        ? wakeupTime24Hr.hour - bedTime24Hr.hour
        : wakeupTime24Hr.hour + (24 - bedTime24Hr.hour);

    let minutes = wakeupTime24Hr.minute - bedTime24Hr.minute;

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    sleepDuration.textContent = `${hours} hours and ${minutes} minutes`;
    return { hour: hours, minute: minutes };
  }

  // Function to convert time to 24-hour format
  function to24HourFormat(timeString) {
    const [hourStr, minuteStr] = timeString.split(":");
    let [hours, minutes] = [parseInt(hourStr), parseInt(minuteStr.slice(0, 2))];

    if (timeString.includes("PM") && hours !== 12) {
      hours += 12;
    } else if (timeString.includes("AM") && hours === 12) {
      hours = 0;
    }

    return { hour: hours, minute: minutes };
  }

  // Function to update sleep data
  function updateSleepData(date) {
    if (date in Sleep) {
      bedTime.value = to12HourFormat(
        Sleep[date].bed.hour,
        Sleep[date].bed.minute,
      );
      wakeupTime.value = to12HourFormat(
        Sleep[date].wakeup.hour,
        Sleep[date].wakeup.minute,
      );

      sleepDuration.textContent = `${Sleep[date].duration.hour} hours and ${Sleep[date].duration.minute} minutes`;
    }
  }

  // Initial load and change event
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
      if (e.bs in Sleep) {
        updateSleepData(e.bs);
      } else {
        Sleep[e.bs] = {
          bed: to24HourFormat(bedTime.value),
          wakeup: to24HourFormat(wakeupTime.value),
          duration: calculateSleepDuration(bedTime.value, wakeupTime.value),
        };

        localStorage.setItem("Sleep", JSON.stringify(Sleep));
      }
    },
  });

  // Initialize with the current date
  updateSleepData(selectDate.value);

  // Pickatime configuration
  $(".timepicker").pickatime({
    autoclose: true,
    twelvehour: true,
    vibrate: true,
    donetext: "OK",
    afterDone: (Element, Time) => {
      const selectedDate = selectDate.value;
      if (Element[0].name === "bedTime") {
        const bedTimeValue = !Time ? bedTime.value : Time;
        Sleep[selectedDate] = {
          bed: to24HourFormat(bedTimeValue),
          wakeup: to24HourFormat(wakeupTime.value),
          duration: calculateSleepDuration(bedTimeValue, wakeupTime.value),
        };
      } else if (Element[0].name === "wakeupTime") {
        const wakeupTimeValue = !Time ? wakeupTime.value : Time;
        Sleep[selectedDate] = {
          bed: to24HourFormat(bedTime.value),
          wakeup: to24HourFormat(wakeupTimeValue),
          duration: calculateSleepDuration(bedTime.value, wakeupTimeValue),
        };
      }

      localStorage.setItem("Sleep", JSON.stringify(Sleep));
    },
  });
});
