document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('prepAIUser') || 'null');
  const welcomeText = document.getElementById('welcomeText');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  welcomeText.textContent = `👋 Welcome, ${user.fullName}`;

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('prepAIUser');
    window.location.href = 'login.html';
  });
});
