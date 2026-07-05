const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

const total = document.getElementById("total");
const percent = document.getElementById("percent");
const progress = document.getElementById("progress");
const streak = document.getElementById("streak");

const topics = ["arrays", "strings", "linkedlist", "stack", "trees", "graphs", "dp", "bs"];

function loadData() {
    const data = JSON.parse(localStorage.getItem("dsaProgress") || "null");

    if (data) {
        if (easy) easy.value = data.easy || 0;
        if (medium) medium.value = data.medium || 0;
        if (hard) hard.value = data.hard || 0;

        if (streak) streak.textContent = data.streak || 1;

        if (data.topics) {
            topics.forEach((topic) => {
                const element = document.getElementById(topic);
                if (element) {
                    element.value = data.topics[topic] || 0;
                }
            });
        }
    }

    updateStats();
}

function updateStats() {
    const e = Number(easy?.value || 0);
    const m = Number(medium?.value || 0);
    const h = Number(hard?.value || 0);

    const solved = e + m + h;
    const max = 250;
    const completion = Math.min(100, ((solved / max) * 100)).toFixed(1);

    if (total) total.textContent = solved;
    if (percent) percent.textContent = completion;
    if (progress) progress.style.width = `${completion}%`;
}

document.getElementById("saveBtn")?.addEventListener("click", () => {
    let currentStreak = Number(streak?.textContent || 1);
    currentStreak++;

    const topicData = {};
    topics.forEach((topic) => {
        const element = document.getElementById(topic);
        if (element) {
            topicData[topic] = element.value || 0;
        }
    });

    const data = {
        easy: easy?.value || 0,
        medium: medium?.value || 0,
        hard: hard?.value || 0,
        streak: currentStreak,
        topics: topicData
    };

    localStorage.setItem("dsaProgress", JSON.stringify(data));
    if (streak) streak.textContent = currentStreak;
    updateStats();
    alert("Progress Saved!");
});

easy?.addEventListener("input", updateStats);
medium?.addEventListener("input", updateStats);
hard?.addEventListener("input", updateStats);

loadData();