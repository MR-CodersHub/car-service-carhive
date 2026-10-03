(function() {
  window.CarHive = window.CarHive || {};

  var STORAGE_KEY_ADMIN_DATA = 'carhive-admin-data';
  var STORAGE_KEY_USER_DATA = 'carhive-user-data';

  // Default mock datasets
  var defaultData = {
    users: [
      { id: 1, name: 'Daniel Richardson', email: 'daniel.r@example.com', role: 'Customer', vehicles: 2, joined: 'Jan 2024', status: 'Active' },
      { id: 2, name: 'Priya Sharma', email: 'priya.m@example.com', role: 'Customer', vehicles: 1, joined: 'Mar 2024', status: 'Active' },
      { id: 3, name: 'Marcus Vance', email: 'marcus.v@example.com', role: 'Customer', vehicles: 1, joined: 'Nov 2023', status: 'Active' },
      { id: 4, name: 'Jennifer Kim', email: 'jennifer.k@example.com', role: 'Customer', vehicles: 3, joined: 'Feb 2024', status: 'Active' },
      { id: 5, name: 'Robert Lawson', email: 'robert.l@example.com', role: 'Customer', vehicles: 1, joined: 'Apr 2024', status: 'Active' },
      { id: 6, name: 'Amanda Sterling', email: 'amanda.s@example.com', role: 'Customer', vehicles: 2, joined: 'May 2026', status: 'Active' }
    ],
    appointments: [
      { id: 'CH-4821', customer: 'Daniel Richardson', vehicle: 'Audi A6', service: 'Battery Replacement', date: '2026-07-25', time: '09:00 AM', status: 'Active', tech: 'Marcus Vance' },
      { id: 'CH-4822', customer: 'Priya Sharma', vehicle: 'Volvo XC60', service: 'Battery Testing', date: '2026-07-28', time: '11:30 AM', status: 'Pending', tech: 'Elena Rostova' },
      { id: 'CH-4823', customer: 'Marcus Vance', vehicle: 'Ford Mustang', service: 'Roadside Jump-Start', date: '2026-07-22', time: '02:00 PM', status: 'Completed', tech: 'Marcus Vance' },
      { id: 'CH-4824', customer: 'Jennifer Kim', vehicle: 'Toyota Highlander', service: 'Battery Replacement', date: '2026-07-20', time: '10:00 AM', status: 'Completed', tech: 'David Miller' },
      { id: 'CH-4825', customer: 'Robert Lawson', vehicle: 'BMW 5 Series', service: 'Parasitic Drain Diagnosis', date: '2026-07-29', time: '01:30 PM', status: 'Active', tech: 'James Thorne' }
    ],
    invoices: [
      { id: 'INV-4091', customer: 'Marcus Vance', service: 'Roadside Jump-Start', amount: '$49.00', date: 'Jul 22, 2026', status: 'Paid', method: 'Credit Card' },
      { id: 'INV-4092', customer: 'Jennifer Kim', service: 'Battery Replacement (AGM)', amount: '$239.00', date: 'Jul 20, 2026', status: 'Paid', method: 'Apple Pay' },
      { id: 'INV-4093', customer: 'Daniel Richardson', service: 'Battery Testing', amount: '$29.00', date: 'Jul 18, 2026', status: 'Paid', method: 'Credit Card' },
      { id: 'INV-4094', customer: 'Priya Sharma', service: 'Battery Replacement', amount: '$149.00', date: 'Jul 28, 2026', status: 'Pending', method: 'Pending' },
      { id: 'INV-4095', customer: 'Robert Lawson', service: 'Parasitic Drain Diagnosis', amount: '$79.00', date: 'Jul 29, 2026', status: 'Pending', method: 'Pending' }
    ],
    userVehicles: [
      { id: 'VEH-01', make: 'BMW', model: '5 Series', year: '2022', vin: 'WBA53BJ08NFP12948', plate: '7XYZ89', mileage: '34,200 mi', lastService: 'Battery Fitted — Jul 2026', nextService: 'Battery Test — Jul 2028' },
      { id: 'VEH-02', make: 'Honda', model: 'Civic Hatchback', year: '2021', vin: '1HGCR2F83MA049182', plate: '4ABC12', mileage: '42,100 mi', lastService: 'Battery Test — Jun 2026', nextService: 'Replace Battery — Spring 2027' },
      { id: 'VEH-03', make: 'Ford', model: 'F-150 Lariat', year: '2023', vin: '1FTFW1ED8PFB93021', plate: '9LMN45', mileage: '18,500 mi', lastService: 'Jump-Start — May 2026', nextService: 'Battery Test — May 2027' }
    ],
    userHistory: [
      { date: 'Jul 20, 2026', vehicle: 'BMW 5 Series', service: 'Battery Replacement (AGM)', mileage: '34,150 mi', cost: '$239.00', status: 'Completed', tech: 'David Miller' },
      { date: 'Jun 14, 2026', vehicle: 'Honda Civic', service: 'Battery Testing', mileage: '41,800 mi', cost: '$29.00', status: 'Completed', tech: 'James Thorne' },
      { date: 'May 02, 2026', vehicle: 'Ford F-150', service: 'Roadside Jump-Start', mileage: '17,900 mi', cost: '$49.00', status: 'Completed', tech: 'Elena Rostova' }
    ]
  };

  function getData() {
    var stored = localStorage.getItem(STORAGE_KEY_ADMIN_DATA);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { }
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_DATA, JSON.stringify(defaultData));
    return defaultData;
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY_ADMIN_DATA, JSON.stringify(data));
  }

  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/public/pages/') !== -1 || path.indexOf('/public/auth/') !== -1 || path.indexOf('/auth/admin/') !== -1 || path.indexOf('/auth/user/') !== -1) {
      return '../../';
    }
    return './';
  }

  // ── ADMIN DASHBOARD RENDERERS ─────────────────────────────────────────

  function renderAdminDashboard(container, section, data) {
    var basePath = getBasePath();

    if (section === 'dashboard') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Admin Dashboard</h1><p style="color:var(--steel);font-size:14px;">Welcome back, Administrator. Here is your system overview.</p></div>' +
          '<div class="profile-dropdown"><button class="profile-icon" id="profileToggle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></button><div class="dropdown-menu" id="profileDropdown"><a href="' + basePath + 'index.html">Back to Site</a></div></div>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">TOTAL USERS</div><div class="stat-value">' + data.users.length + '</div><div class="stat-change">+12% from last month</div></div>' +
          '<div class="stat-card"><div class="stat-label">ACTIVE REQUESTS</div><div class="stat-value">' + data.appointments.filter(function(a){return a.status !== 'Completed';}).length + '</div><div class="stat-change">+5 today</div></div>' +
          '<div class="stat-card"><div class="stat-label">REVENUE (MTD)</div><div class="stat-value">$84,230</div><div class="stat-change">+18% from last month</div></div>' +
          '<div class="stat-card"><div class="stat-label">SATISFACTION</div><div class="stat-value">4.9</div><div class="stat-change">Out of 5.0</div></div>' +
        '</div>' +
        '<div class="dashboard-grid-2">' +
          '<div class="dashboard-widget"><h3>Recent Requests</h3><table class="dashboard-table"><thead><tr><th>Customer</th><th>Vehicle</th><th>Service</th><th>Status</th></tr></thead><tbody>' +
          data.appointments.slice(0, 5).map(function(a) {
            var stClass = a.status === 'Completed' ? 'completed' : (a.status === 'Pending' ? 'pending' : 'active');
            return '<tr><td>' + a.customer + '</td><td>' + a.vehicle + '</td><td>' + a.service + '</td><td><span class="status-badge ' + stClass + '">' + a.status + '</span></td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="dashboard-widget"><h3>Recent Activity</h3>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">New user registered: Amanda Sterling</div><div class="activity-time">2 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Request booked: Battery Testing for Volvo XC60</div><div class="activity-time">3 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Jump-start completed for Ford Mustang</div><div class="activity-time">5 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Payment received: $49.00 from Marcus Vance</div><div class="activity-time">5 hours ago</div></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="dashboard-widget" style="margin-top:24px;"><h3>Revenue by Battery Service</h3>' +
          '<div style="margin-top:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Battery Replacement</span><span style="color:var(--amber);">$24,500</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:75%"></div></div></div>' +
          '<div style="margin-top:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Battery Testing</span><span style="color:var(--amber);">$18,200</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:58%"></div></div></div>' +
          '<div style="margin-top:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Roadside Jump-Starts</span><span style="color:var(--amber);">$15,800</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:48%"></div></div></div>' +
          '<div style="margin-top:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Drain &amp; EV Diagnostics</span><span style="color:var(--amber);">$12,400</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:38%"></div></div></div>' +
        '</div>';
    } else if (section === 'users') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>User Management</h1><p style="color:var(--steel);font-size:14px;">View, edit, and manage registered customer accounts.</p></div>' +
          '<button class="btn btn-solid" id="btnAddUserModal">+ Add New User</button>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">REGISTERED USERS</div><div class="stat-value">' + data.users.length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">ACTIVE ACCOUNTS</div><div class="stat-value">' + data.users.filter(function(u){return u.status==='Active';}).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">VIP MEMBERS</div><div class="stat-value">24</div></div>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:16px;">' +
            '<h3>All Registered Users</h3>' +
            '<input type="text" id="userSearchInput" placeholder="Search by name or email..." style="background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:8px 16px;font-size:14px;outline:none;width:280px;">' +
          '</div>' +
          '<table class="dashboard-table" id="usersTable"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Vehicles</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead><tbody>' +
          data.users.map(function(u) {
            return '<tr><td><strong>' + u.name + '</strong></td><td>' + u.email + '</td><td><span class="status-badge ' + (u.role==='Admin'?'active':'') + '">' + u.role + '</span></td><td>' + u.vehicles + '</td><td>' + u.joined + '</td><td><span class="status-badge completed">' + u.status + '</span></td><td><button class="btn-delete-user btn" data-id="' + u.id + '" style="padding:4px 10px;font-size:11px;color:var(--error);border-color:var(--error);">Delete</button></td></tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';

      // Event listener for user search
      var searchInput = document.getElementById('userSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', function(e) {
          var query = e.target.value.toLowerCase();
          var rows = document.querySelectorAll('#usersTable tbody tr');
          rows.forEach(function(row) {
            var text = row.innerText.toLowerCase();
            row.style.display = text.indexOf(query) !== -1 ? '' : 'none';
          });
        });
      }

      // Delete user listener
      document.querySelectorAll('.btn-delete-user').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var uid = parseInt(btn.getAttribute('data-id'), 10);
          data.users = data.users.filter(function(u) { return u.id !== uid; });
          saveData(data);
          renderAdminDashboard(container, 'users', data);
          if (window.CarHive.showToast) window.CarHive.showToast('User deleted successfully', 'success');
        });
      });

      // Add user button listener
      var btnAdd = document.getElementById('btnAddUserModal');
      if (btnAdd) {
        btnAdd.addEventListener('click', function() {
          var name = prompt('Enter User Full Name:');
          if (!name || !name.trim()) return;
          var email = prompt('Enter User Email Address:');
          if (!email || !email.trim()) return;
          data.users.unshift({ id: Date.now(), name: name.trim(), email: email.trim(), role: 'Customer', vehicles: 1, joined: 'Just Now', status: 'Active' });
          saveData(data);
          renderAdminDashboard(container, 'users', data);
          if (window.CarHive.showToast) window.CarHive.showToast('User account created!', 'success');
        });
      }
    } else if (section === 'appointments') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Requests Management</h1><p style="color:var(--steel);font-size:14px;">Monitor live visits, update appointment statuses, and assign technicians.</p></div>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">TOTAL BOOKINGS</div><div class="stat-value">' + data.appointments.length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">ACTIVE / ON SITE</div><div class="stat-value">' + data.appointments.filter(function(a){return a.status==='Active';}).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">PENDING</div><div class="stat-value">' + data.appointments.filter(function(a){return a.status==='Pending';}).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">COMPLETED</div><div class="stat-value">' + data.appointments.filter(function(a){return a.status==='Completed';}).length + '</div></div>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<h3>All Scheduled Appointments</h3>' +
          '<table class="dashboard-table" style="margin-top:16px;"><thead><tr><th>ID</th><th>Customer</th><th>Vehicle</th><th>Service</th><th>Date & Time</th><th>Technician</th><th>Status</th></tr></thead><tbody>' +
          data.appointments.map(function(a) {
            return '<tr>' +
              '<td><strong>' + a.id + '</strong></td>' +
              '<td>' + a.customer + '</td>' +
              '<td>' + a.vehicle + '</td>' +
              '<td>' + a.service + '</td>' +
              '<td>' + a.date + ' (' + a.time + ')</td>' +
              '<td>' + a.tech + '</td>' +
              '<td>' +
                '<select class="apt-status-select" data-id="' + a.id + '" style="background:var(--panel-2);color:var(--bone);border:1px solid var(--line);padding:4px 8px;font-size:12px;">' +
                  '<option value="Pending"' + (a.status==='Pending'?' selected':'') + '>Pending</option>' +
                  '<option value="Active"' + (a.status==='Active'?' selected':'') + '>Active</option>' +
                  '<option value="Completed"' + (a.status==='Completed'?' selected':'') + '>Completed</option>' +
                '</select>' +
              '</td>' +
            '</tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';

      // Status change listener
      document.querySelectorAll('.apt-status-select').forEach(function(sel) {
        sel.addEventListener('change', function(e) {
          var aid = sel.getAttribute('data-id');
          var newStatus = e.target.value;
          var found = data.appointments.find(function(a) { return a.id === aid; });
          if (found) {
            found.status = newStatus;
            saveData(data);
            if (window.CarHive.showToast) window.CarHive.showToast('Appointment ' + aid + ' status updated to ' + newStatus, 'success');
          }
        });
      });
    } else if (section === 'invoices') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Invoices & Billing</h1><p style="color:var(--steel);font-size:14px;">Track shop revenue, generated customer dockets, and outstanding balances.</p></div>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">TOTAL INVOICED</div><div class="stat-value">$84,230</div></div>' +
          '<div class="stat-card"><div class="stat-label">PAID STATEMENTS</div><div class="stat-value">' + data.invoices.filter(function(i){return i.status==='Paid';}).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">PENDING PAYMENTS</div><div class="stat-value">' + data.invoices.filter(function(i){return i.status==='Pending';}).length + '</div></div>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<h3>Billing Statements</h3>' +
          '<table class="dashboard-table" style="margin-top:16px;"><thead><tr><th>Invoice #</th><th>Customer</th><th>Service</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Action</th></tr></thead><tbody>' +
          data.invoices.map(function(inv) {
            return '<tr>' +
              '<td><strong>' + inv.id + '</strong></td>' +
              '<td>' + inv.customer + '</td>' +
              '<td>' + inv.service + '</td>' +
              '<td><strong style="color:var(--amber);">' + inv.amount + '</strong></td>' +
              '<td>' + inv.date + '</td>' +
              '<td>' + inv.method + '</td>' +
              '<td><span class="status-badge ' + (inv.status==='Paid'?'completed':'pending') + '">' + inv.status + '</span></td>' +
              '<td><button class="btn btn-download-inv" data-id="' + inv.id + '" style="padding:4px 10px;font-size:11px;">PDF</button></td>' +
            '</tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';

      document.querySelectorAll('.btn-download-inv').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var id = btn.getAttribute('data-id');
          if (window.CarHive.showToast) window.CarHive.showToast('Downloading invoice ' + id + '.pdf...', 'success');
        });
      });
    } else if (section === 'analytics') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Performance Analytics</h1><p style="color:var(--steel);font-size:14px;">Real-time doorstep efficiency, average response times, and customer growth.</p></div>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">AVG RESPONSE TIME</div><div class="stat-value">58 Min</div><div class="stat-change">-2 mins vs target</div></div>' +
          '<div class="stat-card"><div class="stat-label">CUSTOMER RETENTION</div><div class="stat-value">94.2%</div><div class="stat-change">+3.1% YoY</div></div>' +
          '<div class="stat-card"><div class="stat-label">FIRST-VISIT FIX RATE</div><div class="stat-value">97.8%</div><div class="stat-change">Right battery carried</div></div>' +
          '<div class="stat-card"><div class="stat-label">REPLACEMENTS / JOBS</div><div class="stat-value">64%</div><div class="stat-change">Of total volume</div></div>' +
        '</div>' +
        '<div class="dashboard-grid-2">' +
          '<div class="dashboard-widget"><h3>Monthly Revenue Distribution</h3>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Battery Replacements</span><span style="color:var(--amber);">$34,100 (40%)</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:40%"></div></div></div>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Battery Testing</span><span style="color:var(--amber);">$23,900 (28%)</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:28%"></div></div></div>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Roadside Jump-Starts</span><span style="color:var(--amber);">$15,400 (18%)</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:18%"></div></div></div>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Drain &amp; EV Diagnostics</span><span style="color:var(--amber);">$10,830 (14%)</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:14%"></div></div></div>' +
          '</div>' +
          '<div class="dashboard-widget"><h3>Technician Performance Metrics</h3>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text"><strong>Marcus Vance</strong> — Lead Battery Tech</div><div class="activity-time">52 Replacements Signed Off &bull; 99.1% Quality Index</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text"><strong>James Thorne</strong> — Fleet Battery Program</div><div class="activity-time">38 Fleet Visits &bull; 98.6% Quality Index</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text"><strong>Elena Rostova</strong> — EV &amp; Hybrid Specialist</div><div class="activity-time">31 EV Checks &bull; 100% Accuracy Rating</div></div></div>' +
          '</div>' +
        '</div>';
    } else if (section === 'settings') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>System Settings</h1><p style="color:var(--steel);font-size:14px;">Configure dispatch hours, notification triggers, and shop details.</p></div>' +
        '</div>' +
        '<div class="dashboard-widget" style="max-width:680px;">' +
          '<form id="adminSettingsForm">' +
            '<div style="margin-bottom:20px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">WORKSHOP DISPLAY NAME</label><input type="text" value="Car Hive Doorstep Battery Service" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<div style="margin-bottom:20px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">DISPATCH CONTACT PHONE</label><input type="text" value="+1 (312) 555-0148" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<div style="margin-bottom:20px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">AUTOMATED SMS/EMAIL APPOINTMENT REMINDERS</label><select style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"><option value="enabled" selected>Enabled (24 Hours Prior)</option><option value="disabled">Disabled</option></select></div>' +
            '<div style="margin-bottom:24px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">DEFAULT TAX RATE (%)</label><input type="text" value="8.5%" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<button type="submit" class="btn btn-solid">Save System Settings</button>' +
          '</form>' +
        '</div>';

      var settingsForm = document.getElementById('adminSettingsForm');
      if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
          e.preventDefault();
          if (window.CarHive.showToast) window.CarHive.showToast('Settings saved successfully!', 'success');
        });
      }
    }
  }

  // ── USER DASHBOARD RENDERERS ──────────────────────────────────────────

  function renderUserDashboard(container, section, data) {
    var basePath = getBasePath();

    if (section === 'dashboard') {
      var openRequests = data.appointments.filter(function(a) { return a.status !== 'Completed'; }).length;
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>My Requests</h1><p style="color:var(--steel);font-size:14px;">Welcome back, Daniel. Track live visits, battery warranty dates, and past work.</p></div>' +
          '<div class="profile-dropdown"><button class="profile-icon" id="profileToggle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></button><div class="dropdown-menu" id="profileDropdown"><a href="' + basePath + 'index.html">Back to Site</a></div></div>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-label">OPEN REQUESTS</div><div class="stat-value">' + openRequests + '</div><div class="stat-change">Technician assigned</div></div>' +
          '<div class="stat-card"><div class="stat-label">NEXT VISIT</div><div class="stat-value">Jul 28</div><div class="stat-change">Battery Test, 11:30 AM</div></div>' +
          '<div class="stat-card"><div class="stat-label">BATTERIES FITTED</div><div class="stat-value">3</div><div class="stat-change">All under warranty</div></div>' +
          '<div class="stat-card"><div class="stat-label">MEMBER SINCE</div><div class="stat-value">2023</div><div class="stat-change">3 years</div></div>' +
        '</div>' +
        '<div class="dashboard-grid-2">' +
          '<div class="dashboard-widget"><h3>My Vehicles &amp; Battery Warranty</h3><table class="dashboard-table"><thead><tr><th>Vehicle</th><th>Last Battery Work</th><th>Warranty / Next Test</th></tr></thead><tbody>' +
          data.userVehicles.map(function(v) {
            return '<tr><td><strong>' + v.make + ' ' + v.model + '</strong> (' + v.year + ')</td><td>' + v.lastService + '</td><td>' + v.nextService + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="dashboard-widget"><h3>Active Requests &amp; Technician ETAs</h3><table class="dashboard-table"><thead><tr><th>Reference</th><th>Slot</th><th>Request</th><th>Vehicle</th><th>Status</th></tr></thead><tbody>' +
            data.appointments.filter(function(a) { return a.status !== 'Completed'; }).map(function(a) {
              var stClass = a.status === 'Pending' ? 'pending' : 'active';
              return '<tr><td><strong>' + a.id + '</strong><br><span style="font-size:11px;color:var(--steel);">' + a.tech + '</span></td><td>' + a.date + '<br>' + a.time + '</td><td>' + a.service + '</td><td>' + a.vehicle + '</td><td><span class="status-badge ' + stClass + '">' + (a.status === 'Active' ? 'On The Way' : a.status) + '</span></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>' +
        '<div class="dashboard-grid-2" style="margin-top:24px;">' +
          '<div class="dashboard-widget"><h3>Recent Activity</h3>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Battery replaced: AGM fitted for BMW 5 Series</div><div class="activity-time">3 days ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Request scheduled: Battery Test for Honda Civic</div><div class="activity-time">5 days ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot"></div><div><div class="activity-text">Invoice paid: $239.00 for battery replacement</div><div class="activity-time">3 days ago</div></div></div>' +
          '</div>' +
          '<div class="dashboard-widget"><h3>Battery Health Progress</h3>' +
            '<div style="margin-top:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>BMW 5 Series — new AGM</span><span style="color:var(--steel);">100% health</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:100%"></div></div></div>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Honda Civic — tested Jun 2026</span><span style="color:var(--steel);">68% health</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:68%"></div></div></div>' +
            '<div style="margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Ford F-150 — jumped May 2026</span><span style="color:var(--steel);">41% health</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:41%"></div></div></div>' +
          '</div>' +
        '</div>';
    } else if (section === 'vehicles') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>My Vehicles</h1><p style="color:var(--steel);font-size:14px;">Keep each vehicle registered so we bring the right battery, test report, and warranty history.</p></div>' +
          '<button class="btn btn-solid" id="btnAddVehicleModal">+ Add New Vehicle</button>' +
        '</div>' +
        '<div class="vehicle-cards-grid">' +
        data.userVehicles.map(function(v) {
          return '<div class="dashboard-widget" style="border-top:3px solid var(--amber);">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">' +
              '<h3 style="margin:0;">' + v.year + ' ' + v.make + ' ' + v.model + '</h3>' +
              '<span style="font-family:\'Montserrat, Quicksand, sans-serif;font-size:11px;background:var(--panel-2);padding:4px 8px;color:var(--amber);">' + v.plate + '</span>' +
            '</div>' +
            '<div style="font-size:13px;color:var(--steel);line-height:1.7;margin-bottom:20px;">' +
              '<div><strong>VIN:</strong> ' + v.vin + '</div>' +
              '<div><strong>Odometer:</strong> ' + v.mileage + '</div>' +
              '<div><strong>Last Battery Work:</strong> ' + v.lastService + '</div>' +
              '<div><strong>Warranty / Next Test:</strong> <span style="color:var(--amber);">' + v.nextService + '</span></div>' +
            '</div>' +
            '<div style="display:flex;gap:10px;">' +
              '<a href="' + basePath + 'public/pages/booking.html" class="btn btn-solid" style="padding:6px 14px;font-size:12px;">Book Battery Work</a>' +
              '<button class="btn btn-delete-vehicle" data-id="' + v.id + '" style="padding:6px 14px;font-size:12px;color:var(--error);border-color:var(--error);">Remove</button>' +
            '</div>' +
          '</div>';
        }).join('') +
        '</div>';

      document.querySelectorAll('.btn-delete-vehicle').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var vid = btn.getAttribute('data-id');
          data.userVehicles = data.userVehicles.filter(function(v) { return v.id !== vid; });
          saveData(data);
          renderUserDashboard(container, 'vehicles', data);
          if (window.CarHive.showToast) window.CarHive.showToast('Vehicle removed from garage', 'success');
        });
      });

      var btnAddVeh = document.getElementById('btnAddVehicleModal');
      if (btnAddVeh) {
        btnAddVeh.addEventListener('click', function() {
          var make = prompt('Enter Vehicle Make (e.g. Porsche):');
          if (!make || !make.trim()) return;
          var model = prompt('Enter Vehicle Model (e.g. 911 Carrera):');
          if (!model || !model.trim()) return;
          var year = prompt('Enter Vehicle Year (e.g. 2024):') || '2024';
          data.userVehicles.push({
            id: 'VEH-' + Date.now(),
            make: make.trim(),
            model: model.trim(),
            year: year.trim(),
            vin: 'WBA' + Math.random().toString(36).substring(2, 10).toUpperCase(),
            plate: '9PR' + Math.floor(100 + Math.random() * 900),
            mileage: '12,000 mi',
            lastService: 'Initial Registration',
            nextService: 'First Battery Test (6 Mos)'
          });
          saveData(data);
          renderUserDashboard(container, 'vehicles', data);
          if (window.CarHive.showToast) window.CarHive.showToast('New vehicle registered to garage!', 'success');
        });
      }
    } else if (section === 'appointments') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>My Requests</h1><p style="color:var(--steel);font-size:14px;">Every booking you have made, with the technician assigned and their ETA.</p></div>' +
          '<a href="' + basePath + 'public/pages/booking.html" class="btn btn-solid">+ New Doorstep Request</a>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<h3>Scheduled &amp; In-Progress Requests</h3>' +
          '<table class="dashboard-table" style="margin-top:16px;"><thead><tr><th>Reference</th><th>Slot</th><th>Service Requested</th><th>Vehicle</th><th>Assigned Technician</th><th>Status</th></tr></thead><tbody>' +
          data.appointments.map(function(a) {
            var stClass = a.status === 'Completed' ? 'completed' : (a.status === 'Pending' ? 'pending' : 'active');
            return '<tr>' +
              '<td><strong>' + a.id + '</strong></td>' +
              '<td>' + a.date + ' at ' + a.time + '</td>' +
              '<td>' + a.service + '</td>' +
              '<td>' + a.vehicle + '</td>' +
              '<td>' + a.tech + '</td>' +
              '<td><span class="status-badge ' + stClass + '">' + a.status + '</span></td>' +
            '</tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';
    } else if (section === 'history') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Battery Service History</h1><p style="color:var(--steel);font-size:14px;">Signed test reports, warranty records, and technician notes for every visit we have completed.</p></div>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<h3>Completed Battery Reports</h3>' +
          '<table class="dashboard-table" style="margin-top:16px;"><thead><tr><th>Date</th><th>Vehicle</th><th>Service Performed</th><th>Odometer</th><th>Technician</th><th>Total Paid</th><th>Report</th></tr></thead><tbody>' +
          data.userHistory.map(function(h, idx) {
            return '<tr>' +
              '<td>' + h.date + '</td>' +
              '<td><strong>' + h.vehicle + '</strong></td>' +
              '<td>' + h.service + '</td>' +
              '<td>' + h.mileage + '</td>' +
              '<td>' + h.tech + '</td>' +
              '<td><strong style="color:var(--amber);">' + h.cost + '</strong></td>' +
              '<td><button class="btn btn-view-docket" data-idx="' + idx + '" style="padding:4px 10px;font-size:11px;">View Docket</button></td>' +
            '</tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';

      document.querySelectorAll('.btn-view-docket').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var idx = btn.getAttribute('data-idx');
          var item = data.userHistory[idx];
          alert('BATTERY SERVICE REPORT #' + (idx + 101) + '\n\nDate: ' + item.date + '\nVehicle: ' + item.vehicle + '\nService: ' + item.service + '\nTechnician: ' + item.tech + '\nBattery state of health: PASSED / Warranty: 24 months\nStatus: Signed off on site');
        });
      });
    } else if (section === 'invoices') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>My Invoices</h1><p style="color:var(--steel);font-size:14px;">Download billing receipts and statements for your service records.</p></div>' +
        '</div>' +
        '<div class="dashboard-widget">' +
          '<h3>Billing Statements</h3>' +
          '<table class="dashboard-table" style="margin-top:16px;"><thead><tr><th>Invoice #</th><th>Date</th><th>Service</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead><tbody>' +
          data.invoices.map(function(inv) {
            return '<tr>' +
              '<td><strong>' + inv.id + '</strong></td>' +
              '<td>' + inv.date + '</td>' +
              '<td>' + inv.service + '</td>' +
              '<td><strong style="color:var(--amber);">' + inv.amount + '</strong></td>' +
              '<td><span class="status-badge ' + (inv.status==='Paid'?'completed':'pending') + '">' + inv.status + '</span></td>' +
              '<td><button class="btn btn-download-inv" data-id="' + inv.id + '" style="padding:4px 10px;font-size:11px;">Download PDF</button></td>' +
            '</tr>';
          }).join('') +
          '</tbody></table>' +
        '</div>';

      document.querySelectorAll('.btn-download-inv').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var id = btn.getAttribute('data-id');
          if (window.CarHive.showToast) window.CarHive.showToast('Downloading invoice ' + id + '.pdf...', 'success');
        });
      });
    } else if (section === 'profile') {
      container.innerHTML =
        '<div class="dashboard-header">' +
          '<div><h1>Profile & Account Settings</h1><p style="color:var(--steel);font-size:14px;">Update your personal details, contact preferences, and security password.</p></div>' +
        '</div>' +
        '<div class="dashboard-widget" style="max-width:680px;">' +
          '<form id="userProfileForm">' +
            '<div class="profile-form-grid">' +
              '<div><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">FIRST NAME</label><input type="text" value="Daniel" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
              '<div><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">LAST NAME</label><input type="text" value="Richardson" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '</div>' +
            '<div style="margin-bottom:20px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">EMAIL ADDRESS</label><input type="email" value="daniel.r@example.com" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<div style="margin-bottom:20px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">PHONE NUMBER</label><input type="tel" value="+1 (312) 555-0199" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<div style="margin-bottom:24px;"><label style="display:block;font-size:12px;font-family:\'Montserrat, Quicksand, sans-serif;color:var(--steel);margin-bottom:8px;">NEW PASSWORD (LEAVE BLANK TO KEEP CURRENT)</label><input type="password" placeholder="••••••••" style="width:100%;background:var(--panel-2);border:1px solid var(--line);color:var(--bone);padding:10px 14px;font-size:14px;outline:none;"></div>' +
            '<button type="submit" class="btn btn-solid">Save Profile Changes</button>' +
          '</form>' +
        '</div>';

      var profileForm = document.getElementById('userProfileForm');
      if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
          e.preventDefault();
          if (window.CarHive.showToast) window.CarHive.showToast('Profile information updated successfully!', 'success');
        });
      }
    }
  }

  // ── INIT DASHBOARD HANDLER ───────────────────────────────────────────

  function initDashboards() {
    var main = document.querySelector('.dashboard-main');
    if (!main) return;

    var data = getData();
    var isAdmin = window.location.pathname.indexOf('/auth/admin/') !== -1;
    var navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-nav a');

    navLinks.forEach(function(link) {
      var sectionName = link.innerText.trim().toLowerCase();
      if (sectionName.indexOf('overview') !== -1 || sectionName.indexOf('dashboard') !== -1) link.setAttribute('data-section', 'dashboard');
      else if (sectionName.indexOf('users') !== -1) link.setAttribute('data-section', 'users');
      else if (sectionName.indexOf('vehicles') !== -1) link.setAttribute('data-section', 'vehicles');
      else if (sectionName.indexOf('appointments') !== -1 || sectionName.indexOf('request') !== -1) link.setAttribute('data-section', 'appointments');
      else if (sectionName.indexOf('history') !== -1) link.setAttribute('data-section', 'history');
      else if (sectionName.indexOf('invoices') !== -1) link.setAttribute('data-section', 'invoices');
      else if (sectionName.indexOf('analytics') !== -1) link.setAttribute('data-section', 'analytics');
      else if (sectionName.indexOf('settings') !== -1) link.setAttribute('data-section', 'settings');
      else if (sectionName.indexOf('profile') !== -1) link.setAttribute('data-section', 'profile');

      link.addEventListener('click', function(e) {
        var sec = link.getAttribute('data-section');
        if (!sec) return; // e.g. Back to Site link
        e.preventDefault();

        navLinks.forEach(function(l) { l.classList.remove('active'); });
        link.classList.add('active');

        if (isAdmin) {
          renderAdminDashboard(main, sec, data);
        } else {
          renderUserDashboard(main, sec, data);
        }
      });
    });

    // Render default 'dashboard' section initially
    if (isAdmin) {
      renderAdminDashboard(main, 'dashboard', data);
    } else {
      renderUserDashboard(main, 'dashboard', data);
    }
  }

  window.CarHive.initDashboards = initDashboards;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboards);
  } else {
    initDashboards();
  }
})();
