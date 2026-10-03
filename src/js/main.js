(function() {
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = btn.closest('.faq-item');
        if (!item) return;
        var isActive = item.classList.contains('active');
        var container = item.closest('.faq-container');
        if (container) {
          container.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
        }
        if (!isActive) item.classList.add('active');
      });
    });
  }

  function initPricing() {
    var monthlyBtn = document.getElementById('pricingMonthly');
    var annualBtn = document.getElementById('pricingAnnual');
    var grid = document.getElementById('pricingGrid');
    if (!monthlyBtn || !annualBtn || !grid || !window.CarHive) return;

    function renderPricing(period) {
      var plans = window.CarHive.pricingPlans[period];
      grid.innerHTML = plans.map(function(plan) {
        return '<div class="pricing-card' + (plan.featured ? ' featured' : '') + '">' +
          '<h3>' + plan.name + '</h3>' +
          '<div class="price">' + plan.price + '<span>' + plan.period + '</span></div>' +
          (plan.save ? '<div class="text-amber" style="font-size:12px;margin-bottom:8px;">' + plan.save + '</div>' : '') +
          '<p class="price-note">' + plan.description + '</p>' +
          '<ul class="pricing-features">' + plan.features.map(function(f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
          '<a href="contact.html" class="btn' + (plan.featured ? ' btn-solid' : '') + '" style="width:100%;text-align:center;">Get Started</a>' +
        '</div>';
      }).join('');
    }

    monthlyBtn.addEventListener('click', function() {
      monthlyBtn.classList.add('active');
      annualBtn.classList.remove('active');
      renderPricing('monthly');
    });
    annualBtn.addEventListener('click', function() {
      annualBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      renderPricing('annual');
    });
    renderPricing('monthly');
  }

  function initCountdown() {
    var countdown = document.getElementById('countdown');
    if (!countdown) return;
    var target = new Date();
    target.setDate(target.getDate() + 30);
    function update() {
      var diff = target - new Date();
      if (diff <= 0) return;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      var items = countdown.querySelectorAll('.countdown-num');
      if (items.length >= 4) {
        items[0].textContent = String(days).padStart(2, '0');
        items[1].textContent = String(hours).padStart(2, '0');
        items[2].textContent = String(mins).padStart(2, '0');
        items[3].textContent = String(secs).padStart(2, '0');
      }
    }
    update();
    setInterval(update, 1000);
  }

  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/public/pages/') !== -1 || path.indexOf('/public/auth/') !== -1 || path.indexOf('/auth/') !== -1) return '../../';
    return './';
  }

  function initServiceDetail() {
    var container = document.getElementById('serviceDetail');
    if (!container || !window.CarHive) return;
    var params = new URLSearchParams(window.location.search);
    var serviceId = params.get('id');
    var services = window.CarHive.services;
    var service = services.find(function(s) { return s.id === serviceId; }) || services[0];
    var basePath = getBasePath();
    document.title = service.title + ' — CAR HIVE';

    container.innerHTML =
      '<div class="wrap section-padding">' +
        '<div class="breadcrumb">' +
          '<a href="' + basePath + 'index.html">Home</a> <span class="sep">/</span> ' +
          '<a href="' + basePath + 'public/pages/services.html">Services</a> <span class="sep">/</span> ' +
          '<span>' + service.title + '</span>' +
        '</div>' +
        '<div class="service-detail-hero">' +
          '<div class="service-detail-img"><img src="' + ((service.image.indexOf('http') === 0 || service.image.indexOf('/') === 0) ? service.image : (basePath + service.image)) + '" alt="' + service.title + '"></div>' +
          '<div>' +
            '<span class="sec-tag">' + service.code + '</span>' +
            '<h1 style="font-size:clamp(32px,4vw,48px);margin-bottom:20px;">' + service.title + '</h1>' +
            '<p style="color:var(--steel);font-size:16px;line-height:1.7;margin-bottom:30px;">' + service.description + '</p>' +
            '<a href="' + basePath + 'public/pages/booking.html" class="btn btn-solid">Book This Service</a>' +
          '</div>' +
        '</div>' +
        '<div class="detail-features-grid" style="margin-top:80px;">' +
          '<div>' +
            '<span class="sec-tag">FEATURES</span>' +
            '<h2 style="font-size:28px;margin-bottom:24px;">What\'s Included</h2>' +
            '<ul class="service-features">' + service.features.map(function(f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
          '</div>' +
          '<div>' +
            '<span class="sec-tag">PRICING TIERS</span>' +
            '<h2 style="font-size:28px;margin-bottom:24px;">Service Options</h2>' +
            '<table class="service-pricing-table"><thead><tr><th>Tier</th><th>Price</th><th>Details</th></tr></thead><tbody>' +
            service.pricing.map(function(p) { return '<tr><td>' + p.tier + '</td><td>' + p.price + '</td><td>' + p.desc + '</td></tr>'; }).join('') +
            '</tbody></table>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:80px;">' +
          '<span class="sec-tag">FAQ</span>' +
          '<h2 style="font-size:28px;margin-bottom:30px;">Frequently Asked Questions</h2>' +
          '<div class="faq-container">' +
          service.faqs.map(function(faq, i) {
            return '<div class="faq-item' + (i === 0 ? ' active' : '') + '"><button class="faq-question">' + faq.q + '</button><div class="faq-answer"><p>' + faq.a + '</p></div></div>';
          }).join('') +
          '</div></div>' +
      '</div>';
    initFAQ();
  }

  function initBlogDetail() {
    var container = document.getElementById('blogDetail');
    if (!container || !window.CarHive) return;
    var params = new URLSearchParams(window.location.search);
    var rawId = params.get('id') || '';
    var normalizedId = decodeURIComponent(rawId).trim().toLowerCase().replace(/\s+/g, '-');
    var posts = window.CarHive.blogPosts;
    var post = posts.find(function(p) {
      var pid = p.id.toLowerCase();
      return pid === normalizedId || pid === rawId.toLowerCase() || pid === decodeURIComponent(rawId).toLowerCase();
    }) || posts[0];

    var basePath = getBasePath();
    document.title = post.title + ' — CAR HIVE';

    var imgUrl = (post.image.indexOf('http') === 0 || post.image.indexOf('/') === 0) ? post.image : (basePath + post.image);

    container.innerHTML =
      '<div class="wrap section-padding">' +
        '<div class="breadcrumb">' +
          '<a href="' + basePath + 'index.html">Home</a> <span class="sep">/</span> ' +
          '<a href="' + basePath + 'public/pages/blog.html">Blog</a> <span class="sep">/</span> ' +
          '<span>' + post.title + '</span>' +
        '</div>' +
        '<div class="blog-layout">' +
          '<div class="blog-main">' +
            '<div class="blog-detail-header">' +
              '<span class="blog-tag" style="display:inline-block;margin-bottom:16px;">' + post.category + '</span>' +
              '<h1>' + post.title + '</h1>' +
              '<div class="blog-detail-meta"><span>Published ' + post.date + '</span> &bull; <span>' + post.readTime + '</span></div>' +
              '<div class="blog-detail-img" style="margin:24px 0 40px;border:1px solid var(--line);overflow:hidden;">' +
                '<img src="' + imgUrl + '" alt="' + post.title + '" style="width:100%;height:380px;object-fit:cover;display:block;">' +
              '</div>' +
            '</div>' +
            '<div class="blog-detail-content">' + post.content + '</div>' +
            '<div style="margin-top:50px;padding-top:30px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">' +
              '<a href="blog.html" class="btn">← Back to Blog</a>' +
              '<div style="display:flex;gap:12px;align-items:center;"><span style="color:var(--steel);font-size:14px;">Share:</span>' +
              '<a href="#" style="color:var(--amber);">Twitter</a><a href="#" style="color:var(--amber);">LinkedIn</a></div>' +
            '</div>' +
          '</div>' +
          '<aside class="blog-sidebar">' +
            '<div class="sidebar-widget"><h4>Categories</h4><div class="sidebar-categories">' +
            (function() {
              var cats = [];
              posts.forEach(function(p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
              return cats.map(function(cat) {
                return '<a href="blog.html?category=' + encodeURIComponent(cat) + '">' + cat + ' <span class="count">' + posts.filter(function(p) { return p.category === cat; }).length + '</span></a>';
              }).join('');
            })() +
            '</div></div>' +
            '<div class="sidebar-widget"><h4>Recent Posts</h4>' +
            posts.filter(function(p) { return p.id !== post.id; }).slice(0, 3).map(function(p) {
              return '<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--line);"><a href="blog-details.html?id=' + p.id + '" style="font-size:14px;font-weight:600;display:block;margin-bottom:6px;">' + p.title + '</a><span style="font-size:12px;color:var(--steel);">' + p.date + '</span></div>';
            }).join('') +
            '</div></aside>' +
        '</div>' +
      '</div>';
  }

  function initNewsletter() {
    window.CarHive = window.CarHive || {};
    if (!window.CarHive.showToast) {
      window.CarHive.showToast = function(message, type) {
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
      };
    }

    document.querySelectorAll('.newsletter-form, form[data-type="newsletter"]').forEach(function(form) {
      if (form.dataset.carhiveSubscribed) return;
      form.dataset.carhiveSubscribed = 'true';

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"], input');
        var button = form.querySelector('button[type="submit"], button');
        if (!input) return;

        var email = input.value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
          window.CarHive.showToast('Please enter your email address.', 'error');
          input.focus();
          return;
        }

        if (!emailRegex.test(email)) {
          window.CarHive.showToast('Please enter a valid email address (e.g. name@example.com).', 'error');
          input.focus();
          return;
        }

        var subscribers = [];
        try {
          subscribers = JSON.parse(localStorage.getItem('carhive_newsletter_subscribers') || '[]');
        } catch (err) {
          subscribers = [];
        }

        if (subscribers.indexOf(email.toLowerCase()) !== -1) {
          window.CarHive.showToast('This email is already subscribed to our newsletter!', 'success');
          return;
        }

        var origBtnText = button ? button.textContent : 'Subscribe';
        if (button) {
          button.disabled = true;
          button.textContent = 'Subscribing...';
        }

        setTimeout(function() {
          subscribers.push(email.toLowerCase());
          try {
            localStorage.setItem('carhive_newsletter_subscribers', JSON.stringify(subscribers));
          } catch (err) {}

          window.CarHive.showToast('Thank you for subscribing! Confirmation sent to ' + email, 'success');

          if (button) {
            button.disabled = false;
            button.textContent = 'Subscribed!';
            setTimeout(function() {
              button.textContent = origBtnText;
            }, 3000);
          }

          var existingNotice = form.parentNode.querySelector('.newsletter-success-notice');
          if (existingNotice) existingNotice.remove();

          var notice = document.createElement('div');
          notice.className = 'newsletter-success-notice';
          notice.style.color = 'var(--success)';
          notice.style.fontSize = '13px';
          notice.style.marginTop = '10px';
          notice.style.fontFamily = "'Montserrat', 'Quicksand', sans-serif";
          notice.style.textAlign = 'center';
          notice.innerHTML = '✓ You are subscribed! Welcome to CarHive updates.';
          form.parentNode.appendChild(notice);

          setTimeout(function() {
            if (notice && notice.parentNode) notice.remove();
          }, 5000);

          input.value = '';
        }, 400);
      });
    });
  }

  function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.svc-card, .blog-card, .testi-card, .step, .pricing-card, .team-card, .faq-item').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  function initServiceGrid() {
    var grid = document.getElementById('servicesPageGrid');
    if (!grid || !window.CarHive) return;
    var basePath = getBasePath();
    var services = window.CarHive.services;

    function render(filter) {
      var filtered = filter === 'all' ? services : services.filter(function(s) { return s.category === filter; });

      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--steel);border:1px solid var(--line);background:var(--panel);">No services found in this category.</div>';
        grid.style.gridTemplateColumns = '1fr';
        return;
      }

      if (filtered.length < 3) {
        grid.style.gridTemplateColumns = 'repeat(' + filtered.length + ', 1fr)';
      } else {
        grid.style.gridTemplateColumns = '';
      }

      grid.innerHTML = filtered.map(function(s) {
        var imgUrl = (s.image.indexOf('http') === 0 || s.image.indexOf('/') === 0) ? s.image : (basePath + s.image);
        return '<div class="svc-card"><div class="svc-img"><span class="svc-code">' + s.code + '</span><a href="' + basePath + 'public/pages/service-details.html?id=' + s.id + '"><img src="' + imgUrl + '" alt="' + s.title + '"></a></div><div class="svc-body"><h3>' + s.title + '</h3><p>' + s.shortDesc + '</p><a href="' + basePath + 'public/pages/service-details.html?id=' + s.id + '" class="svc-link">Learn more →</a></div></div>';
      }).join('');
    }

    document.querySelectorAll('.services-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.services-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        render(btn.dataset.filter || 'all');
      });
    });
    render('all');
  }

  function initTeamGrid() {
    var grid = document.getElementById('teamGrid');
    if (!grid || !window.CarHive || !window.CarHive.team) return;
    var basePath = getBasePath();
    var team = window.CarHive.team;
    grid.innerHTML = team.map(function(member) {
      var imgUrl = (member.image.indexOf('http') === 0 || member.image.indexOf('/') === 0) ? member.image : (basePath + member.image);
      return '<div class="team-card">' +
        '<div class="team-img"><img src="' + imgUrl + '" alt="' + member.name + '" loading="lazy"></div>' +
        '<div class="team-info">' +
          '<h3 class="team-name">' + member.name + '</h3>' +
          '<span class="team-role">' + member.role + '</span>' +
          '<p class="team-bio">' + member.bio + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function initAll() {
    initFAQ();
    initPricing();
    initCountdown();
    initServiceDetail();
    initBlogDetail();
    initNewsletter();
    initServiceGrid();
    initTeamGrid();
    setTimeout(initScrollAnimations, 200);
  }

  window.CarHive = window.CarHive || {};
  window.CarHive.initAll = initAll;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();