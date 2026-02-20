let selectedMood = "";
let chart;

function selectMood(mood) {
    selectedMood = mood;
    alert("You selected: " + mood);
}

function saveEntry() {
    const text = document.getElementById("journalText").value;

    if (text === "" || selectedMood === "") {
        alert("Please select a mood and write something!");
        return;
    }

    const entry = {
        mood: selectedMood,
        text: text,
        date: new Date().toLocaleDateString()
    };

    let entries = JSON.parse(localStorage.getItem("kindmindEntries")) || [];
    entries.push(entry);
    localStorage.setItem("kindmindEntries", JSON.stringify(entries));

    // 🎉 Confetti AFTER saving properly
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    document.getElementById("journalText").value = "";
    selectedMood = "";

    displayEntries();
    updateChart();
}

function displayEntries() {
    const entriesDiv = document.getElementById("entries");
    let entries = JSON.parse(localStorage.getItem("kindmindEntries")) || [];

    entriesDiv.innerHTML = "";

    entries.forEach(entry => {
        entriesDiv.innerHTML += `
            <div style="background:white; padding:10px; margin:10px 0; border-radius:10px;">
                <strong>${entry.mood}</strong>
                <p>${entry.text}</p>
                <small>${entry.date}</small>
            </div>
        `;
    });
}

function updateChart() {
    let entries = JSON.parse(localStorage.getItem("kindmindEntries")) || [];

    let moodCounts = {
        "😊 Happy": 0,
        "😔 Sad": 0,
        "😡 Angry": 0,
        "😴 Tired": 0
    };

    entries.forEach(entry => {
        if (moodCounts[entry.mood] !== undefined) {
            moodCounts[entry.mood]++;
        }
    });

    const ctx = document.getElementById("moodChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(moodCounts),
            datasets: [{
                label: "Mood Count",
                data: Object.values(moodCounts),
                backgroundColor: [
                    "#ffd966",
                    "#66ccff",
                    "#ff9999",
                    "#c2c2f0"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

displayEntries();
updateChart();

function startBreathing() {
    const circle = document.getElementById("circle");
    const text = document.getElementById("breathingText");

    text.innerText = "Breathe In...";
    circle.classList.add("expand");

    setTimeout(() => {
        text.innerText = "Breathe Out...";
        circle.classList.remove("expand");
    }, 4000);

    setTimeout(() => {
        text.innerText = "You are doing great 💛";
    }, 8000);
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker Registered"));
  });
}
