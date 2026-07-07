document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
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

    const storedUser = JSON.parse(localStorage.getItem('prepAIUser') || 'null');
    if (!storedUser) {
      alert('No account found. Please sign up first.');
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password.');
    }
  });
});
