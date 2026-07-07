document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const college = document.getElementById('college').value.trim();
    const year = document.getElementById('year').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !password || !college || !year) {
      alert('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    const userData = { fullName, email, password, college, year };
    localStorage.setItem('prepAIUser', JSON.stringify(userData));
    window.location.href = 'dashboard.html';
  });
});
