document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save-button");
  const selectDate = document.getElementById("select-date");
  const bedTime = document.getElementById("bed-time");
  const wakeupTime = document.getElementById("wakeup-time");
  const sleepTimeParagraph = document.querySelector(".sleep-time");

  selectDate.value = NepaliFunctions.GetCurrentBsDate("YYYY-MM-DD");
  selectDate.nepaliDatePicker({
    language: "english",
    dateFormat: "YYYY-MM-DD",
    ndpYear: true,
    ndpMonth: true,
    ndpYearCount: 10,
    disableDaysBefore: 365,
    disableDaysAfter: 0,
  });

  let time = {
    bed: {
      hour: parseInt(bedTime.dataset.default.split(":")[0]),
      minute: parseInt(bedTime.dataset.default.split(":")[1]),
    },
    wakeup: {
      hour: parseInt(wakeupTime.dataset.default.split(":")[0]),
      minute: parseInt(wakeupTime.dataset.default.split(":")[1]),
    },
  };
  console.log(time);
  generateSleepTime();
  function generateSleepTime() {
    let hours =
      time.wakeup.hour > time.bed.hour
        ? time.wakeup.hour - time.bed.hour
        : time.wakeup.hour + (24 - time.bed.hour);

    let minutes = time.wakeup.minute - time.bed.minute;

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    $(".sleep-time").text(`${hours} hours and ${minutes} minutes`);
  }
  $(".timepicker").pickatime({
    autoclose: true,
    twelvehour: true,
    vibrate: true,
    donetext: "OK",
    afterDone: (Element, Time) => {
      console.log(Element[0].name, Time);

      if (Element[0].name === "bedTime") {
        const startTime = Time.split(":");
        time.bed.hour = parseInt(startTime[0]);
        time.bed.minute = parseInt(startTime[1]);
      } else if (Element[0].name === "wakeupTime") {
        const endTime = Time.split(":");
        time.wakeup.hour = parseInt(endTime[0]);
        time.wakeup.minute = parseInt(endTime[1]);
      }
      generateSleepTime();
    },
  });
});
