// =============================
// PrepAI AI Roadmap Generator
// =============================

const roadmapForm = document.getElementById("roadmapForm");
const roadmapResult = document.getElementById("roadmapResult");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let allQuestions = [];

function loadQuestions() {
    fetch("coding_questions.json")
        .then((response) => response.json())
        .then((data) => {
            allQuestions = data;
        })
        .catch(() => {
            allQuestions = [];
        });
}

function buildPracticePlan(level, company, year, hours) {
    const baseQuestions = [...allQuestions];

    const preferredTopicOrder = level === "Beginner"
        ? ["Arrays", "Strings", "Linked List", "Trees", "Binary Search", "Graphs", "DP"]
        : level === "Intermediate"
            ? ["Arrays", "Strings", "Trees", "Graphs", "DP", "Heap", "Binary Search"]
            : ["DP", "Graphs", "Trees", "Binary Search", "Heap", "Strings", "Arrays"];

    const topicFiltered = baseQuestions
        .filter((question) => preferredTopicOrder.includes(question.topic))
        .sort((a, b) => preferredTopicOrder.indexOf(a.topic) - preferredTopicOrder.indexOf(b.topic));

    const companyAdjusted = topicFiltered.map((question) => ({
        ...question,
        companyPriority: question.company === company ? 0 : 1
    })).sort((a, b) => a.companyPriority - b.companyPriority || a.difficulty.localeCompare(b.difficulty));

    const levelAdjusted = companyAdjusted.filter((question) => {
        if (level === "Beginner") return question.difficulty === "Easy" || question.difficulty === "Medium";
        if (level === "Intermediate") return question.difficulty !== "Hard";
        return true;
    });

    const timeAdjusted = levelAdjusted.slice(0, Math.min(16 + Math.max(0, hours - 1), 24));

    const yearBoost = year.includes("1st") ? 2 : year.includes("2nd") ? 3 : year.includes("3rd") ? 4 : 5;
    const boosted = timeAdjusted.map((question, index) => ({
        ...question,
        order: index + yearBoost
    }));

    return boosted.sort((a, b) => a.order - b.order).slice(0, 12);
}

// Load saved roadmap
window.onload = () => {
    loadQuestions();
    const savedRoadmap = localStorage.getItem("roadmapHTML");

    if (savedRoadmap) {
        roadmapResult.innerHTML = savedRoadmap;
        restoreCheckboxes();
        updateProgress();
    }
};

// Generate Roadmap
roadmapForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const year = document.getElementById("year").value;
    const company = document.getElementById("company").value;
    const level = document.getElementById("level").value;
    const hours = document.getElementById("hours").value;

    const practicePlan = buildPracticePlan(level, company, year, Number(hours));

    let roadmap = [];

    if (level === "Beginner") {
        roadmap = [
            {
                week: "Week 1",
                tasks: [
                    "Learn C++ / Java Basics",
                    "Arrays Practice: " + practicePlan[0].title,
                    "Strings Practice: " + practicePlan[1].title,
                    "Time Complexity"
                ]
            },
            {
                week: "Week 2",
                tasks: [
                    "Linked List Practice: " + practicePlan[2].title,
                    "Trees Practice: " + practicePlan[3].title,
                    "Binary Search Practice: " + practicePlan[4].title
                ]
            },
            {
                week: "Week 3",
                tasks: [
                    "Graphs Practice: " + practicePlan[5].title,
                    "DP Practice: " + practicePlan[6].title,
                    "Resume Building"
                ]
            },
            {
                week: "Week 4",
                tasks: [
                    "Mixed Practice: " + practicePlan[7].title,
                    "Mock Interview",
                    "Company Focus: " + company + " Patterns"
                ]
            }
        ];
    }
    else if (level === "Intermediate") {
        roadmap = [
            {
                week: "Week 1",
                tasks: [
                    "Advanced Arrays Practice: " + practicePlan[0].title,
                    "Sliding Window Practice: " + practicePlan[1].title,
                    "HashMap Practice: " + practicePlan[2].title
                ]
            },
            {
                week: "Week 2",
                tasks: [
                    "Trees Practice: " + practicePlan[3].title,
                    "BST Practice: " + practicePlan[4].title,
                    "Heap Practice: " + practicePlan[5].title
                ]
            },
            {
                week: "Week 3",
                tasks: [
                    "Graphs Practice: " + practicePlan[6].title,
                    "Greedy Practice: " + practicePlan[7].title,
                    "Backtracking Practice: " + practicePlan[8].title
                ]
            },
            {
                week: "Week 4",
                tasks: [
                    "Dynamic Programming Practice: " + practicePlan[9].title,
                    "Resume ATS",
                    "Mock Interview"
                ]
            }
        ];
    }
    else {
        roadmap = [
            {
                week: "Week 1",
                tasks: [
                    "Advanced DP Practice: " + practicePlan[0].title,
                    "Trie Practice: " + practicePlan[1].title,
                    "Segment Tree Practice: " + practicePlan[2].title
                ]
            },
            {
                week: "Week 2",
                tasks: [
                    "Graph Algorithms Practice: " + practicePlan[3].title,
                    "Union Find Practice: " + practicePlan[4].title,
                    "Shortest Path Practice: " + practicePlan[5].title
                ]
            },
            {
                week: "Week 3",
                tasks: [
                    "System Design",
                    "OS",
                    "DBMS"
                ]
            },
            {
                week: "Week 4",
                tasks: [
                    company + " Interview Questions",
                    "HR Interview",
                    "Resume Revision"
                ]
            }
        ];
    }

    renderRoadmap(year, company, hours, roadmap);
});

// =============================
// Render Roadmap
// =============================

function renderRoadmap(year, company, hours, roadmap) {

    let html = "";

    html += `
        <div class="week">
            <h3>🎯 Goal</h3>
            <p><strong>${year}</strong></p>
            <p>Dream Company : <strong>${company}</strong></p>
            <p>Daily Study : <strong>${hours} Hours</strong></p>
        </div>
    `;

    roadmap.forEach((week, index) => {

        html += `
            <div class="week">

                <h3>${week.week}</h3>
        `;

        week.tasks.forEach((task, taskIndex) => {

            html += `
                <div class="task">

                    <input
                        type="checkbox"
                        class="taskCheck"
                        id="task${index}${taskIndex}"
                    >

                    <label for="task${index}${taskIndex}">
                        ${task}
                    </label>

                </div>
            `;

        });

        html += `</div>`;

    });

    roadmapResult.innerHTML = html;

    saveRoadmap();

    restoreCheckboxes();

    updateProgress();

}

// =============================
// Save HTML
// =============================

function saveRoadmap() {

    localStorage.setItem(
        "roadmapHTML",
        roadmapResult.innerHTML
    );

}

// =============================
// Restore Checkbox State
// =============================

function restoreCheckboxes() {

    const checks = document.querySelectorAll(".taskCheck");

    checks.forEach((check, index) => {

        const value = localStorage.getItem("check" + index);

        if (value === "true")
            check.checked = true;

        check.addEventListener("change", () => {

            localStorage.setItem(
                "check" + index,
                check.checked
            );

            updateProgress();

        });

    });

}

// =============================
// Progress
// =============================

function updateProgress() {

    const checks = document.querySelectorAll(".taskCheck");

    if (checks.length === 0)
        return;

    let completed = 0;

    checks.forEach(check => {

        if (check.checked)
            completed++;

    });

    const percent = Math.round(
        (completed / checks.length) * 100
    );

    progressFill.style.width = percent + "%";

    progressText.innerHTML =
        percent + "% Completed";

}