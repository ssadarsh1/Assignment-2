const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const toggleFormatButton = document.getElementById("toggle-format-btn");

let is24HourFormat = false;

function updateClock() {
  const now = new Date();

  
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  
  let period = "";
  if (!is24HourFormat) {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
  }

  // Format time components with leading zeros
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
    seconds
  )} ${period}`;
  timeElement.textContent = formattedTime;

  // Get date components
  const day = padZero(now.getDate());
  const month = padZero(now.getMonth() + 1); // Months are zero-indexed
  const year = now.getFullYear();
  dateElement.textContent = `${day}-${month}-${year}`;
}

// Helper function to add leading zeros
function padZero(value) {
  return value < 10 ? "0" + value : value;
}

// Toggle between 12-hour and 24-hour formats
toggleFormatButton.addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
  toggleFormatButton.textContent = is24HourFormat
    ? "Switch to 12-Hour Format"
    : "Switch to 24-Hour Format";
  updateClock();
});

// Update the clock every second
setInterval(updateClock, 1000);


updateClock();
