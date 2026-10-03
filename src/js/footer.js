(function() {
  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/public/pages/') !== -1 || path.indexOf('/public/auth/') !== -1 || path.indexOf('/auth/admin/') !== -1 || path.indexOf('/auth/user/') !== -1) {
      return '../../';
    }
    return './';
  }

  function renderFooter() {
    if (document.querySelector('.dashboard-layout')) return;

    var existingFooter = document.querySelector('footer.site-footer');
    var basePath = getBasePath();
    var footerHTML = 
      '<footer class="site-footer">' +
        '<div class="wrap">' +
          '<div class="foot-top">' +
            '<div class="foot-brand">' +
              '<a href="' + basePath + 'index.html" class="logo"><img src="' + basePath + 'assets/img/logo.png" alt="Car Hive Logo" class="logo-img"><span class="logo-text-group"><span class="logo-brand-title">CAR HIVE</span></span></a>' +
              '<p>Doorstep battery testing, replacement, and jump-starts for all makes and models. A certified technician comes to your home, office, or roadside — usually within the hour.</p>' +
              '<div class="foot-emergency-box">' +
                '<span class="foot-emergency-label">24/7 EMERGENCY &amp; JUMP-START:</span>' +
                '<a href="tel:+13125550148" class="foot-emergency-phone">+1 (312) 555-0148</a>' +
              '</div>' +
            '</div>' +
            '<div class="foot-col">' +
              '<h5>Battery Services</h5>' +
              '<a href="' + basePath + 'public/pages/service-details.html?id=battery-test">Battery Testing — $29</a>' +
              '<a href="' + basePath + 'public/pages/service-details.html?id=battery-replace">Battery Replacement — from $149</a>' +
              '<a href="' + basePath + 'public/pages/service-details.html?id=jump-start">Roadside Jump-Start — $49</a>' +
              '<a href="' + basePath + 'public/pages/service-details.html?id=ev-battery">EV &amp; Hybrid Battery</a>' +
              '<a href="' + basePath + 'public/pages/service-details.html?id=drain-diagnosis">Parasitic Drain Diagnosis</a>' +
            '</div>' +
            '<div class="foot-col">' +
              '<h5>Book &amp; Manage</h5>' +
              '<a href="' + basePath + 'public/pages/booking.html">Book a Doorstep Visit</a>' +
              '<a href="' + basePath + 'public/pages/pricing.html">Pricing Guide</a>' +
              '<a href="' + basePath + 'public/auth/login.html">Login to My Requests</a>' +
              '<a href="' + basePath + 'auth/user/user-dashboard.html">Request Dashboard</a>' +
              '<a href="' + basePath + 'public/pages/faq.html">FAQs</a>' +
            '</div>' +
            '<div class="foot-col">' +
              '<h5>Service Hours</h5>' +
              '<p style="color:var(--steel);font-size:13px;margin-bottom:8px;"><strong>Mon - Fri:</strong> 7:00 AM – 9:00 PM</p>' +
              '<p style="color:var(--steel);font-size:13px;margin-bottom:8px;"><strong>Sat - Sun:</strong> 8:00 AM – 6:00 PM</p>' +
              '<p style="color:var(--steel);font-size:13px;margin-bottom:12px;"><strong>Emergency Jump-Starts:</strong> 24/7</p>' +
              '<p style="color:var(--steel);font-size:12px;line-height:1.5;">help@carhive.co</p>' +
            '</div>' +
          '</div>' +
          '<div class="foot-bottom">' +
            '<span>&copy; 2026 CAR HIVE — DOORSTEP BATTERY SERVICE. ALL RIGHTS RESERVED.</span>' +
            '<span>Certified Mobile Technicians &nbsp;&bull;&nbsp; 24-Month Warranty on All Parts</span>' +
          '</div>' +
        '</div>' +
      '</footer>';

    if (existingFooter) {
      existingFooter.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }

  window.CarHive = window.CarHive || {};
  window.CarHive.renderFooter = renderFooter;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }
})();
