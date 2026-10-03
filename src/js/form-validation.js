(function() {
  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;
    var errorEl = group.querySelector('.form-error');
    var isValid = true;
    var message = '';

    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      message = 'This field is required';
    } else if (input.type === 'email' && input.value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    } else if (input.type === 'tel' && input.value) {
      if (!/^[\d\s\-\+\(\)]{7,}$/.test(input.value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
      }
    } else if (input.type === 'password' && input.dataset.minlength) {
      if (input.value.length < parseInt(input.dataset.minlength)) {
        isValid = false;
        message = 'Password must be at least ' + input.dataset.minlength + ' characters';
      }
    } else if (input.placeholder && input.placeholder.toLowerCase().indexOf('confirm') !== -1) {
      var pwdInput = input.form ? input.form.querySelector('input[type="password"]:not([placeholder*="Confirm"])') : null;
      if (pwdInput && pwdInput.value !== input.value) {
        isValid = false;
        message = 'Passwords do not match';
      }
    }

    if (isValid) {
      group.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    } else {
      group.classList.add('error');
      if (errorEl) errorEl.textContent = message;
    }
    return isValid;
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll('input, textarea, select');
    var allValid = true;
    inputs.forEach(function(input) {
      if (input.type === 'hidden' || input.type === 'checkbox') return;
      if (!validateField(input)) allValid = false;
    });
    return allValid;
  }

  function attachRealtimeValidation(form) {
    form.querySelectorAll('input, textarea, select').forEach(function(input) {
      input.addEventListener('blur', function() { validateField(input); });
      input.addEventListener('input', function() {
        var group = input.closest('.form-group');
        if (group && group.classList.contains('error')) {
          validateField(input);
        }
      });
    });
  }

  function showToast(message, type) {
    type = type || 'success';
    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    var icon = type === 'success'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span class="toast-message">' + message + '</span><button class="toast-close" onclick="this.parentElement.remove()">&times;</button>';
    container.appendChild(toast);
    setTimeout(function() {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(function() { toast.remove(); }, 300);
      }
    }, 4000);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    if (form.classList.contains('newsletter-form') || form.dataset.type === 'newsletter') {
      return;
    }
    if (validateForm(form)) {
      var formType = form.dataset.type || 'form';
      var messages = {
        contact: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        newsletter: 'Successfully subscribed to our newsletter!',
        login: 'Login successful! Opening your requests...',
        signup: 'Account created successfully! Opening your requests...',
        booking: 'Service booking confirmed! Check your email for details.'
      };
      showToast(messages[formType] || 'Form submitted successfully!', 'success');
      form.reset();
      form.querySelectorAll('.form-group').forEach(function(g) { g.classList.remove('error'); });

      if (formType === 'login' || formType === 'signup') {
        var path = window.location.pathname;
        var isNested = path.indexOf('/public/auth/') !== -1 || path.indexOf('/public/pages/') !== -1 || path.indexOf('/auth/') !== -1;
        var dashboardUrl = isNested ? '../../auth/user/user-dashboard.html' : './auth/user/user-dashboard.html';
        var homeUrl = isNested ? '../../index.html' : './index.html';
        setTimeout(function() {
          window.location.href = formType === 'login' ? dashboardUrl : homeUrl;
        }, 1000);
      }
    }
  }

  function initForms() {
    document.querySelectorAll('form[data-type]').forEach(function(form) {
      attachRealtimeValidation(form);
      form.addEventListener('submit', handleFormSubmit);
    });

    document.querySelectorAll('.auth-social-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var provider = btn.textContent.replace('Continue with ', '').trim();
        showToast('Signed in with ' + provider + '! Redirecting to home page...', 'success');
        var path = window.location.pathname;
        var homeUrl = (path.indexOf('/public/auth/') !== -1 || path.indexOf('/public/pages/') !== -1 || path.indexOf('/auth/') !== -1) ? '../../index.html' : './index.html';
        setTimeout(function() {
          window.location.href = homeUrl;
        }, 1000);
      });
    });
  }

  window.CarHive = window.CarHive || {};
  window.CarHive.validateForm = validateForm;
  window.CarHive.showToast = showToast;
  window.CarHive.initForms = initForms;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();