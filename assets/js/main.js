/* Portfolio — theme toggle, sticky nav, year */
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('hn-theme'); } catch (e) { /* private mode */ }
  if (stored) root.setAttribute('data-theme', stored);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');

  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hn-theme', next); } catch (e) { /* ignore */ }
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) { btn.addEventListener('click', toggleTheme); });

  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form: works without JS backend; wire Formspree endpoint when configured.
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var action = form.getAttribute('action') || '';
    form.addEventListener('submit', function (e) {
      if (action.indexOf('FORM_ID') !== -1) {
        e.preventDefault();
        if (status) status.textContent = 'Form endpoint not configured yet — use the email link instead.';
      }
    });
  }
})();
