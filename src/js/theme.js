(function() {
  var html = document.documentElement;
  var STORAGE_KEY_THEME = 'carhive-theme';
  var STORAGE_KEY_RTL = 'carhive-rtl';

  function initTheme() {
    var saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) {
      html.setAttribute('data-theme', saved);
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY_THEME, next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var isDark = html.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function initRTL() {
    var saved = localStorage.getItem(STORAGE_KEY_RTL);
    if (saved === 'rtl') {
      html.setAttribute('dir', 'rtl');
    }
    updateRTLIcon();
  }

  function toggleRTL() {
    var current = html.getAttribute('dir');
    var next = current === 'rtl' ? 'ltr' : 'rtl';
    html.setAttribute('dir', next);
    localStorage.setItem(STORAGE_KEY_RTL, next);
    updateRTLIcon();
  }

  function updateRTLIcon() {
    var btn = document.getElementById('rtlToggle');
    if (!btn) return;
    var isRTL = html.getAttribute('dir') === 'rtl';
    btn.innerHTML = isRTL ? 'LTR' : 'RTL';
    btn.setAttribute('title', isRTL ? 'Switch to LTR' : 'Switch to RTL');
  }

  document.addEventListener('click', function(e) {
    var themeBtn = e.target.closest('#themeToggle');
    if (themeBtn) {
      e.preventDefault();
      toggleTheme();
      return;
    }
    var rtlBtn = e.target.closest('#rtlToggle');
    if (rtlBtn) {
      e.preventDefault();
      toggleRTL();
      return;
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(STORAGE_KEY_THEME)) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateThemeIcon();
    }
  });

  window.CarHive = window.CarHive || {};
  window.CarHive.initTheme = initTheme;
  window.CarHive.toggleTheme = toggleTheme;
  window.CarHive.updateThemeIcon = updateThemeIcon;
  window.CarHive.initRTL = initRTL;
  window.CarHive.toggleRTL = toggleRTL;
  window.CarHive.updateRTLIcon = updateRTLIcon;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { initTheme(); initRTL(); });
  } else {
    initTheme();
    initRTL();
  }
})();