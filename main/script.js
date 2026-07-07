const form = document.getElementById("onboardingForm");

if (form) {
    const skillInput = document.querySelector(".input-box input");
    const addBtn = document.querySelector(".add-btn");
    const listContainer = document.getElementById("list-container");

    let skills = [];

    const renderSkills = () => {
        if (!listContainer) return;
        listContainer.innerHTML = "";
        skills.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            listContainer.appendChild(li);
        });
    };

    addBtn?.addEventListener("click", () => {
        const skill = skillInput?.value.trim();
        if (!skill) return;
        if (skills.includes(skill)) {
            alert("Skill already added");
            return;
        }
        skills.push(skill);
        renderSkills();
        if (skillInput) skillInput.value = "";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const userData = {
            college: document.getElementById("college")?.value || "",
            branch: document.getElementById("branch")?.value || "",
            semester: document.getElementById("semester")?.value || "",
            company: document.getElementById("company")?.value || "",
            goal: document.querySelector('input[name="goal"]:checked')?.value || "",
            study: document.getElementById("study")?.value || "",
            graduationYear: document.getElementById("gy")?.value || "",
            cgpa: parseFloat(document.getElementById("cgpa")?.value || 0),
            projects: parseInt(document.getElementById("projects")?.value || 0, 10),
            internships: parseInt(document.getElementById("internships")?.value || 0, 10),
            coding: parseInt(document.getElementById("coding")?.value || 0, 10),
            aptitude: parseInt(document.getElementById("aptitude")?.value || 0, 10),
            communication: parseInt(document.getElementById("communication")?.value || 0, 10),
            mock: parseInt(document.getElementById("mock")?.value || 0, 10),
            skills
        };

        localStorage.setItem("prepAIUser", JSON.stringify(userData));
        window.location.href = "roadmap.html";
    });
}