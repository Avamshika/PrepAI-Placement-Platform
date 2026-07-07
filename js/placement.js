document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('placementForm');
  const resultCard = document.getElementById('resultCard');
  const chanceText = document.getElementById('chanceText');
  const salaryText = document.getElementById('salaryText');
  const suggestionsList = document.getElementById('suggestionsList');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cgpa = parseFloat(document.getElementById('cgpa').value) || 0;
    const internships = parseFloat(document.getElementById('internships').value) || 0;
    const projects = parseFloat(document.getElementById('projects').value) || 0;
    const certifications = parseFloat(document.getElementById('certifications').value) || 0;
    const coding = parseFloat(document.getElementById('coding').value) || 0;
    const aptitude = parseFloat(document.getElementById('aptitude').value) || 0;
    const communication = parseFloat(document.getElementById('communication').value) || 0;
    const logical = parseFloat(document.getElementById('logical').value) || 0;
    const mock = parseFloat(document.getElementById('mock').value) || 0;
    const backlogs = parseFloat(document.getElementById('backlogs').value) || 0;
    const studyHours = parseFloat(document.getElementById('studyHours').value) || 0;

    const score =
      cgpa * 5 +
      coding * 0.25 +
      aptitude * 0.15 +
      projects * 3 +
      internships * 4 +
      certifications * 1.5 +
      communication * 0.2 +
      logical * 0.18 +
      mock * 0.22 +
      studyHours * 2 -
      backlogs * 8;

    const chance = Math.min(96, Math.max(20, Math.round(score / 10)));
    const salary = (8 + cgpa * 0.5 + internships * 0.7 + projects * 0.5 + coding * 0.02).toFixed(1);

    chanceText.textContent = `Placement Chance: ${chance}%`;
    salaryText.textContent = `Expected Salary: ₹${salary} LPA`;

    const suggestions = [];

if (coding < 70)
    suggestions.push("Practice DSA daily");

if (communication < 70)
    suggestions.push("Improve communication skills");

if (projects < 3)
    suggestions.push("Build more real-world projects");

if (internships === 0)
    suggestions.push("Apply for internships");

if (backlogs > 0)
    suggestions.push("Clear all backlogs");

if (studyHours < 3)
    suggestions.push("Increase study hours");
    
    resultCard.style.display = 'block';
if (suggestions.length === 0) {
    suggestions.push("Excellent profile! Keep practicing consistently. 🎉");
}
const prediction = {
    chance,
    salary,
    cgpa,
    internships,
    projects,
    coding,
    communication,
    aptitude,
    logical
};

localStorage.setItem(
    "placementPrediction",
    JSON.stringify(prediction)
);
let status = "";

if (chance >= 85) {
    status = "🟢 Excellent Placement Chances";
} else if (chance >= 70) {
    status = "🟡 Good Placement Chances";
} else if (chance >= 50) {
    status = "🟠 Moderate Placement Chances";
} else {
    status = "🔴 Needs Improvement";
}
chanceText.innerHTML = `
<h3>${status}</h3>
Placement Chance: <strong>${chance}%</strong>
`;
suggestionsList.innerHTML = suggestions
    .map(item => `<li>✔ ${item}</li>`)
    .join("");
    const ctx = document.getElementById('radarChart');
    if (ctx) {
      if (window.placementChart) {
        window.placementChart.destroy();
      }
      window.placementChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Coding', 'Projects', 'Communication', 'Leadership', 'Aptitude', 'Logical'],
          datasets: [{
            label: 'Profile Strength',
            data: [coding / 100 * 10, projects / 10 * 10, communication / 100 * 10, Math.min(10, certifications + internships), aptitude / 100 * 10, logical / 100 * 10],
            backgroundColor: 'rgba(56, 189, 248, 0.25)',
            borderColor: '#38bdf8',
            borderWidth: 2
          }]
        },
        options: {
          scales: { r: { min: 0, max: 10 } },
          plugins: { legend: { display: false } }
        }
      });
    }
  });
});
