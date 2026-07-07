const authForm = document.getElementById('authForm');

if (authForm) {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim() || '';
    const password = document.getElementById('password')?.value || '';

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    localStorage.setItem('prepAIAuth', JSON.stringify({ email, password }));
    window.location.href = 'index.html';
  });
}
