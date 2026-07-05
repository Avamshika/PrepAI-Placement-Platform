const roadmap = document.getElementById("roadmap");
const score = document.getElementById("score");
const scoreMessage = document.getElementById("scoreMessage");
const strengths = document.getElementById("strengths");
const weaknesses = document.getElementById("weaknesses");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("download");

const user = JSON.parse(localStorage.getItem("prepAIUser") || "null");
const savedProgress = JSON.parse(localStorage.getItem("roadmapProgress") || "null");
let progressValue = savedProgress?.progress || 0;

function populateProfile() {
    if (!user) return;
    document.getElementById("college").textContent = user.college || "-";
    document.getElementById("branch").textContent = user.branch || "-";
    document.getElementById("semester").textContent = user.semester || "-";
    document.getElementById("company").textContent = user.company || "-";
    document.getElementById("goal").textContent = user.goal || "-";
    document.getElementById("study").textContent = user.study || "-";
    document.getElementById("gy").textContent = user.graduationYear || "-";
    document.getElementById("cgpa").textContent = user.cgpa || "-";
    document.getElementById("projects").textContent = user.projects || "-";
    document.getElementById("internships").textContent = user.internships || "-";

    const skillsList = document.getElementById("skills");
    if (skillsList && Array.isArray(user.skills) && user.skills.length) {
        skillsList.innerHTML = user.skills.map((skill) => `<li>${skill}</li>`).join("");
    } else if (skillsList) {
        skillsList.innerHTML = "<li>No skills added yet.</li>";
    }
}

function calculateScore() {
    if (!user) return 0;
    const cgpa = Number(user.cgpa || 0);
    const projects = Number(user.projects || 0);
    const internships = Number(user.internships || 0);
    const coding = Number(user.coding || 0);
    const aptitude = Number(user.aptitude || 0);
    const communication = Number(user.communication || 0);
    const mock = Number(user.mock || 0);

    const scoreValue = Math.min(100, Math.round(
        cgpa * 4 + projects * 4 + internships * 5 + coding * 0.25 + aptitude * 0.2 + communication * 0.2 + mock * 0.25
    ));

    return scoreValue;
}

function renderRoadmap() {
    const value = calculateScore();
    score.textContent = `${value}/100`;

    if (value >= 85) {
        scoreMessage.textContent = "Excellent readiness — you are on track for top-tier placements.";
    } else if (value >= 70) {
        scoreMessage.textContent = "Strong progress — focus on project depth and mock interview practice.";
    } else {
        scoreMessage.textContent = "You are building momentum — prioritize DSA, communication, and internships.";
    }

    const strengthsList = [
        value >= 70 ? "Solid academic foundation" : "Keep improving fundamentals",
        user?.skills?.length ? `Focused on ${user.skills.slice(0, 2).join(" and ")}` : "Add more target skills"
    ];
    const weaknessList = [
        "Improve at least one project or internship",
        "Practice mock interviews and communication"
    ];

    strengths.innerHTML = strengthsList.map((item) => `<li>${item}</li>`).join("");
    weaknesses.innerHTML = weaknessList.map((item) => `<li>${item}</li>`).join("");

    roadmap.innerHTML = `
        <div class="week">
            <h3>Week 1</h3>
            <ul>
                <li>Revise core DSA patterns and solve 3–5 questions daily.</li>
                <li>Prepare one strong project story and refine your resume.</li>
            </ul>
        </div>
        <div class="week">
            <h3>Week 2</h3>
            <ul>
                <li>Practice aptitude drills and communication responses.</li>
                <li>Complete one mock interview and note weak areas.</li>
            </ul>
        </div>
        <div class="week">
            <h3>Week 3</h3>
            <ul>
                <li>Build or revise a portfolio project tied to your target company.</li>
                <li>Review company-specific interview patterns and coding rounds.</li>
            </ul>
        </div>
    `;

    updateProgress();
}

function updateProgress() {
    progressBar.value = progressValue;
    progressText.textContent = `${progressValue}% Completed`;
}

startBtn?.addEventListener("click", () => {
    progressValue = Math.min(100, progressValue + 10);
    localStorage.setItem("roadmapProgress", JSON.stringify({ progress: progressValue }));
    updateProgress();
});

resetBtn?.addEventListener("click", () => {
    progressValue = 0;
    localStorage.setItem("roadmapProgress", JSON.stringify({ progress: progressValue }));
    updateProgress();
});

downloadBtn?.addEventListener("click", () => {
    const content = `PrepAI Roadmap\n\nCollege: ${user?.college || "-"}\nTarget Company: ${user?.company || "-"}\nScore: ${score.textContent}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "prepai-roadmap.txt";
    link.click();
});

populateProfile();
renderRoadmap();