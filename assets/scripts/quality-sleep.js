document.addEventListener("DOMContentLoaded", function () {
  // Define your elements
  const selectDate = document.getElementById("select-date");
  const bedTime = document.getElementById("bed-time");
  const wakeupTime = document.getElementById("wakeup-time");
  const sleepDuration = document.querySelector(".sleep-time");

  // Load data from localStorage
  let Sleep = JSON.parse(localStorage.getItem("Sleep")) || {};
  // Function to format time with AM/PM
  function formatTimeWithPeriod(hours, minutes) {
    const period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${period}`;
  }

  // Function to calculate sleep duration
  function calculateSleepDuration(bedTimeValue, wakeupTimeValue) {
    const bedTime24Hr = convertTo24HourFormat(bedTimeValue);
    const wakeupTime24Hr = convertTo24HourFormat(
      wakeupTimeValue || wakeupTime.dataset.default,
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

    return { hour: hours, minute: minutes };
  }

  // Function to convert time to 24-hour format
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

  // Function to update sleep data
  function updateSleepData(date) {
    if (date in Sleep) {
      bedTime.value = formatTimeWithPeriod(
        Sleep[date].bed.hour,
        Sleep[date].bed.minute,
      );
      wakeupTime.value = formatTimeWithPeriod(
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
        const bedTimeValue = bedTime.value;
        const wakeupTimeValue = wakeupTime.value;

        const duration = calculateSleepDuration(bedTimeValue, wakeupTimeValue);

        Sleep[e.bs] = {
          bed: convertTo24HourFormat(bedTimeValue),
          wakeup: convertTo24HourFormat(wakeupTimeValue),
          duration: duration,
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
      if (Element[0].name === "bedTime") {
        Sleep[selectDate.value].bed = convertTo24HourFormat(Time);
      } else if (Element[0].name === "wakeupTime") {
        Sleep[selectDate.value].wakeup = convertTo24HourFormat(Time);
      }

      const duration = calculateSleepDuration(bedTime.value, wakeupTime.value);
      Sleep[selectDate.value].duration = duration;

      localStorage.setItem("Sleep", JSON.stringify(Sleep));
    },
  });
});
