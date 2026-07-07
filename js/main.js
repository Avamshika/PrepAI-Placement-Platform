document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('prepAIUser') || 'null');
  if (user) {
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === 'login.html' || currentPath === 'signup.html') {
      window.location.href = 'dashboard.html';
    }
  }

  const animateStats = () => {
    const statElements = Array.from(document.querySelectorAll('.stat-number'));
    if (!statElements.length) return;

    const formatValue = (value, decimals, prefix = '', suffix = '') => {
      const numericValue = Number(value);
      if (Number.isNaN(numericValue)) return `${prefix}${suffix}`.trim();
      const formatted = numericValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return `${prefix}${formatted}${suffix}`;
    };

    const animateNumber = (element) => {
      const target = Number(element.dataset.target || 0);
      const decimals = Number(element.dataset.decimals || 0);
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      const finalText = element.dataset.final || formatValue(target, decimals, prefix, suffix);

      element.dataset.final = finalText;
      element.textContent = finalText;

      if (element.dataset.animated === 'true') return;

      const startTime = performance.now();
      const duration = 1200;

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * eased;
        element.textContent = formatValue(currentValue, decimals, prefix, suffix);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = finalText;
          element.dataset.animated = 'true';
        }
      };

      requestAnimationFrame(step);
    };

    const runStats = () => {
      statElements.forEach((element) => {
        if (element.dataset.animated === 'true') return;
        animateNumber(element);
      });
    };

    const statsSection = document.getElementById('statistics');
    if (statsSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runStats();
            currentObserver.disconnect();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(statsSection);
    } else {
      runStats();
    }

    window.addEventListener('load', runStats, { once: true });
  };

  animateStats();
});
