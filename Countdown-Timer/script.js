
const form = document.getElementById("countdown-form");
const eventNameInput = document.getElementById("event-name");
const targetDateInput = document.getElementById("target-date");

const countdown = document.getElementById("countdown");
const countdownTitle = document.getElementById("countdown-title");
const statusMessage = document.getElementById("status-message");
const resetButton = document.getElementById("reset-btn");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownInterval = null;
let targetTimestamp = null;

// Format a number with at least two digits.
function formatTime(value) {
    return String(value).padStart(2, "0");
}

// Update the countdown display.
function updateCountdown() {
    const currentTime = Date.now();
    const difference = targetTimestamp - currentTime;

    // Check whether the event has arrived.
    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        statusMessage.textContent = "The event has arrived!";

        clearInterval(countdownInterval);
        countdownInterval = null;

        return;
    }

    // Convert the remaining time from milliseconds.
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    // Display the calculated values.
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);

    statusMessage.textContent = "Time remaining until your event.";
}

// Start the countdown when the form is submitted.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const eventName = eventNameInput.value.trim();
    const targetDate = targetDateInput.value;

    // Validate the event name.
    if (!eventName) {
        statusMessage.textContent = "Please enter an event name.";
        countdown.classList.remove("hidden");
        return;
    }

    // Convert the selected date into a timestamp.
    const selectedTimestamp = new Date(targetDate).getTime();

    // Validate the selected date.
    if (
        !targetDate ||
        !Number.isFinite(selectedTimestamp) ||
        selectedTimestamp <= Date.now()
    ) {
        statusMessage.textContent =
            "Please select a valid future date and time.";

        countdown.classList.remove("hidden");
        return;
    }

    // Stop any previous countdown.
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }

    targetTimestamp = selectedTimestamp;

    // Display the event information.
    countdownTitle.textContent = eventName;
    countdown.classList.remove("hidden");
    statusMessage.textContent = "";

    // Show the initial values immediately.
    updateCountdown();

    // Update the countdown every second.
    if (targetTimestamp > Date.now()) {
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

// Reset the application.
resetButton.addEventListener("click", () => {
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    targetTimestamp = null;

    form.reset();
    countdown.classList.add("hidden");
    statusMessage.textContent = "";
});
