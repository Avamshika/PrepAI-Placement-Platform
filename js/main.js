document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('prepAIUser') || 'null');
  if (user) {
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === 'login.html' || currentPath === 'signup.html') {
      window.location.href = 'dashboard.html';
    }
  }
});
