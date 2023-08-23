document
  .getElementById("exerciseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const description = document.getElementById("description").value;
    const startTime = new Date(document.getElementById("startTime").value);
    const duration = parseInt(document.getElementById("duration").value, 10);

    // Calculate exercise end time
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Implement sending emails and exercise tracking here

    // Notify user that exercise is starting
    sendReminderEmail(startTime, exercise);

    // Notify user when exercise time is up
    setTimeout(() => {
      sendExerciseEndTimeEmail(endTime, exercise);
    }, duration * 60000);
  });

const exerciseInstructions = {
  yoga: {
    steps: [
      "Start with a comfortable standing position.",
      "Inhale deeply and raise your arms above your head.",
      "Exhale slowly as you bend forward at your hips, keeping your back straight.",
      "Inhale and step your right leg back into a lunge.",
      "Exhale and bring your hands to the floor, framing your left foot.",
      "Inhale and step back to plank position.",
      "Exhale as you lower yourself to the ground.",
      "Inhale and lift your chest into cobra pose.",
      "Exhale and push back into downward-facing dog pose.",
      "Inhale and step your right foot forward into a lunge.",
      "Exhale and step your left foot forward to meet your right.",
      "Inhale and rise up, reaching your arms overhead.",
      "Exhale and return to a standing position.",
      // Add more steps for yoga exercise
    ],
    videos: [
      // Add YouTube video URLs for yoga exercise
    ],
  },
  badminton: {
    steps: [
      "Hold the racket with a firm grip.",
      "Position yourself in a ready stance with knees slightly bent.",
      "Keep your eye on the shuttlecock and move to hit it.",
      // Add more steps for badminton exercise
    ],
    videos: [
      // Add YouTube video URLs for badminton exercise
    ],
  },
  jogging: {
    steps: [
      "Put on comfortable running shoes and attire.",
      "Start with a brisk walk to warm up your muscles.",
      "Begin jogging at a comfortable pace.",
      "Maintain good posture and keep your core engaged.",
      "Breathe deeply and rhythmically as you run.",
      "Choose a route with a mix of terrains for variety.",
      "Pay attention to your surroundings and be cautious of traffic.",
      "Slow down to a walk to cool down and stretch after your jog.",
      // Add more steps for jogging exercise
    ],
    videos: [
      // Add YouTube video URLs for jogging exercise
    ],
  },
  pushups: {
    steps: [
      "Start in a plank position with your hands slightly wider than shoulder-width apart.",
      "Engage your core and lower yourself down by bending your elbows.",
      "Keep your body in a straight line from head to heels.",
      "Pause when your chest is just above the ground.",
      "Exhale as you push back up to the starting position.",
      "Repeat for the desired number of repetitions.",
      // Add more steps for pushups exercise
    ],
    videos: [
      // Add YouTube video URLs for pushups exercise
    ],
  },
  jumping_jacks: {
    steps: [
      "Stand with your feet together and arms by your sides.",
      "Jump and spread your feet apart while raising your arms above your head.",
      "Land softly on the balls of your feet.",
      "Jump again and return to the starting position.",
      "Repeat the jumping motion while maintaining a steady pace.",
      // Add more steps for jumping jacks exercise
    ],
    videos: [
      // Add YouTube video URLs for jumping jacks exercise
    ],
  },
  // Add more exercises with their steps here
};

document.getElementById("exercise").addEventListener("change", function () {
  const selectedExercise = this.value;
  const exerciseStepsContainer = document.getElementById("exerciseSteps");
  const exerciseVideosContainer = document.getElementById("exerciseVideos");

  const stepsList = document.createElement("ol");
  exerciseInstructions[selectedExercise].steps.forEach(instruction => {
    const stepItem = document.createElement("li");
    stepItem.classList.add("step");
    stepItem.textContent = instruction;
    stepsList.appendChild(stepItem);
  });

  exerciseStepsContainer.innerHTML = "<h2>How to Perform the Exercise:</h2>"; // Clear previous instructions
  exerciseStepsContainer.appendChild(stepsList);

  const videosList = document.createElement("ul");
  exerciseInstructions[selectedExercise].videos.forEach(videoUrl => {
    const videoItem = document.createElement("li");
    const videoLink = document.createElement("a");
    videoLink.href = videoUrl;
    videoLink.textContent = "Watch Video";
    videoItem.appendChild(videoLink);
    videosList.appendChild(videoItem);
  });

  exerciseVideosContainer.innerHTML = ""; // Clear previous videos
  exerciseVideosContainer.appendChild(videosList);
});

// Starting date is today and cannot select past dates
document.addEventListener("DOMContentLoaded", function () {
  const startTimeInput = document.getElementById("startTime");

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  startTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
});

//   document.addEventListener("DOMContentLoaded", ()=> {
//     const startTimeInput = document.getElementById("startTime");

//     const now = new Date();
//     const year = now.getFullYear();
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const month = monthNames[now.getMonth()];
//     const day = now.getDate().toString().padStart(2, "0");
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");

//     startTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
//   });
