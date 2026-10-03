(function() {
  window.CarHive = window.CarHive || {};

  window.CarHive.team = [
    {
      id: 'marcus-vance',
      name: 'Marcus Vance',
      role: 'Lead Mobile Battery Technician',
      bio: 'Master-certified battery specialist with 16+ years on-site experience. Leads the Car Hive doorstep fleet and handles the hardest cold-start diagnostics.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'EV & Hybrid Battery Specialist',
      bio: 'Factory-certified in high-voltage systems. Handles 12V auxiliary and traction battery health checks for electric and plug-in hybrid vehicles.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'david-miller',
      name: 'David Miller',
      role: 'Dispatch & Service Manager',
      bio: 'Runs Car Hive dispatch, scheduling, and quality checks. If you booked it, he makes sure a technician is on site with the right battery.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'james-thorne',
      name: 'James Thorne',
      role: 'Fleet Battery Program Manager',
      bio: 'Builds scheduled battery health programs for commercial fleets, including overnight and weekend visits with annual reporting.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  window.CarHive.services = [
    {
      id: 'battery-test',
      code: 'SVC / 01',
      title: 'Battery Health Testing',
      category: 'testing',
      shortDesc: 'Full load test, CCA check, and alternator output reading on-site in 20 minutes.',
      description: 'Our certified technicians bring professional battery testing equipment directly to your vehicle. We measure cold-cranking amps, state of health, and alternator charge output. You get a clear written report — no guesswork.',
      image: 'assets/img/battery-service.jpg',
      features: ['CCA Load Test', 'Alternator Output Check', 'State of Health Report', 'On-Site in 20 Minutes', 'No Workshop Visit Required'],
      pricing: [
        { tier: 'Battery Test', price: '$29', desc: 'Full health scan & written report' },
        { tier: 'Test + Alternator Check', price: '$45', desc: 'Full system health audit' }
      ],
      faqs: [
        { q: 'How long does a battery test take?', a: 'Most battery health tests are completed in 15–20 minutes on-site at your vehicle.' }
      ]
    },
    {
      id: 'battery-replace',
      code: 'SVC / 02',
      title: 'Battery Replacement',
      category: 'replacement',
      shortDesc: 'OEM-spec battery fitted and registered on-site. Old battery collected for recycling.',
      description: 'We carry OEM and premium aftermarket batteries for all makes and models in our stocked vans. Fitting, registration, and system reset are included. Old battery is taken away and responsibly recycled.',
      image: 'assets/img/diagnostics-service.jpg',
      features: ['OEM-Spec Battery Supplied', 'On-Site Fitting & Registration', 'ECU Reset Included', 'Old Battery Disposal', '24-Month Parts & Labour Warranty'],
      pricing: [
        { tier: 'Standard Replacement', price: 'From $149', desc: 'Battery + fitting + disposal' },
        { tier: 'EFB / AGM Replacement', price: 'From $219', desc: 'Start-stop & premium batteries' }
      ],
      faqs: [
        { q: 'Do you carry batteries for my car?', a: 'Our vans stock batteries for over 95% of vehicles. We confirm availability before dispatch.' }
      ]
    },
    {
      id: 'jump-start',
      code: 'SVC / 03',
      title: 'Roadside Jump-Start',
      category: 'jumpstart',
      shortDesc: 'Fast dispatch, safe lithium booster jump-start for petrol, diesel, and mild-hybrid vehicles.',
      description: 'Stranded with a flat battery? We dispatch a technician to your exact location. Using professional lithium jump-start boosters, we safely start your vehicle — then run a full battery test to advise whether a replacement is needed.',
      image: 'assets/img/oil-service.jpg',
      features: ['45-Minute Dispatch', 'Safe Lithium Booster', 'Petrol, Diesel & Mild-Hybrid', 'Free Battery Test Included', 'No Towing Needed'],
      pricing: [
        { tier: 'Jump-Start', price: '$49', desc: 'Dispatch + booster start + battery test' }
      ],
      faqs: [
        { q: 'Does jump-starting damage modern cars?', a: 'Our lithium professional boosters are safe for all modern vehicles including those with sensitive electronics.' }
      ]
    },
    {
      id: 'ev-battery',
      code: 'SVC / 04',
      title: 'EV & Hybrid Battery Check',
      category: 'extra',
      shortDesc: 'Hybrid 12V auxiliary and HV pre-check diagnostics for EV and plug-in hybrid vehicles.',
      description: 'Electric and hybrid vehicles have both a high-voltage traction battery and a conventional 12V auxiliary battery. We test both systems and provide a health report so you can stay reliably on the road between dealer visits.',
      image: 'assets/img/brake-service.jpg',
      features: ['12V Auxiliary Battery Test', 'HV System Pre-Check', 'State of Charge Report', 'Hybrid & EV Compatible', 'Written Health Certificate'],
      pricing: [
        { tier: 'EV/Hybrid Battery Check', price: '$59', desc: 'Full 12V + HV pre-check report' }
      ],
      faqs: [
        { q: 'Can you replace EV 12V auxiliary batteries?', a: 'Yes — we stock 12V auxiliary batteries for all major EV and hybrid models and fit them on-site.' }
      ]
    },
    {
      id: 'fleet-plan',
      code: 'SVC / 05',
      title: 'Fleet Battery Plans',
      category: 'extra',
      shortDesc: 'Proactive scheduled battery inspections across your entire commercial fleet.',
      description: 'Prevent unexpected downtime with scheduled proactive battery health checks across your full fleet. We come overnight or on weekends to minimise disruption. Annual health reports and priority replacement slots included.',
      image: 'assets/img/vehicle-fleet.jpg',
      features: ['Scheduled Fleet Visits', 'Priority Replacement Slots', 'Annual Health Reports', 'Overnight & Weekend Available', 'Dedicated Account Manager'],
      pricing: [
        { tier: 'Fleet Health Check', price: 'Custom', desc: 'Per-vehicle pricing for 5+ vehicles' }
      ],
      faqs: [
        { q: 'What is the minimum fleet size?', a: 'We offer fleet plans for businesses with 5 or more vehicles. Contact us for a custom quote.' }
      ]
    },
    {
      id: 'drain-diagnosis',
      code: 'SVC / 06',
      title: 'Parasitic Drain Diagnosis',
      category: 'extra',
      shortDesc: 'Recurring flat battery? We trace the hidden electrical drain and provide a clear written report.',
      description: 'If your car battery keeps going flat despite being relatively new, there is likely an unwanted current draw from a faulty component. We use professional current clamp meters to identify the source and provide a clear diagnosis report before any repair work is authorised.',
      image: 'assets/img/tyre-service.jpg',
      features: ['Current Clamp Drain Test', 'Circuit-by-Circuit Analysis', 'Written Diagnosis Report', 'No Parts Swapped Without Approval', 'On-Site at Your Location'],
      pricing: [
        { tier: 'Drain Diagnosis', price: '$79', desc: 'Full parasitic draw test & written report' }
      ],
      faqs: [
        { q: 'How long does a parasitic drain diagnosis take?', a: 'Most drain tests take 45 minutes to 1.5 hours depending on the number of circuits involved.' }
      ]
    }
  ];

  window.CarHive.pricingPlans = {
    monthly: [
      {
        name: 'Starter',
        price: '$9',
        period: '/mo',
        save: null,
        description: 'Peace of mind for casual drivers who want expert battery care on demand.',
        features: ['1 Free Battery Test / Year', '10% Off All Services', 'Priority Booking Access', 'SMS Service Reminders'],
        featured: false
      },
      {
        name: 'Driver+',
        price: '$24',
        period: '/mo',
        save: 'Save $60/yr',
        description: 'Our most popular plan for everyday drivers and commuters.',
        features: ['2 Free Battery Tests / Year', '1 Free Jump-Start / Year', '15% Off Replacements', 'Priority Same-Day Dispatch', 'Dedicated Support Line'],
        featured: true
      },
      {
        name: 'Fleet Pro',
        price: '$69',
        period: '/mo',
        save: null,
        description: 'Comprehensive coverage for small businesses and multi-vehicle households.',
        features: ['Unlimited Battery Tests', '3 Free Jump-Starts / Year', '20% Off All Replacements', 'Overnight Fleet Visits', 'Annual Fleet Health Reports', 'Dedicated Account Manager'],
        featured: false
      }
    ],
    annual: [
      {
        name: 'Starter',
        price: '$89',
        period: '/yr',
        save: '1 Month Free',
        description: 'Peace of mind for casual drivers who want expert battery care on demand.',
        features: ['1 Free Battery Test / Year', '10% Off All Services', 'Priority Booking Access', 'SMS Service Reminders'],
        featured: false
      },
      {
        name: 'Driver+',
        price: '$239',
        period: '/yr',
        save: 'Save $120/yr',
        description: 'Our most popular plan for everyday drivers and commuters.',
        features: ['2 Free Battery Tests / Year', '1 Free Jump-Start / Year', '15% Off Replacements', 'Priority Same-Day Dispatch', 'Dedicated Support Line'],
        featured: true
      },
      {
        name: 'Fleet Pro',
        price: '$689',
        period: '/yr',
        save: 'Save $390/yr',
        description: 'Comprehensive coverage for small businesses and multi-vehicle households.',
        features: ['Unlimited Battery Tests', '3 Free Jump-Starts / Year', '20% Off All Replacements', 'Overnight Fleet Visits', 'Annual Fleet Health Reports', 'Dedicated Account Manager'],
        featured: false
      }
    ]
  };

  window.CarHive.blogPosts = [
    {
      id: 'signs-battery-needs-replacing',
      title: '6 Signs Your Car Battery Is About To Fail',
      category: 'Battery Care',
      date: 'June 18, 2026',
      readTime: '4 min read',
      excerpt: 'Slow cranking, dim lights, a swollen case — a flat battery rarely arrives without warning. Here is what to watch for.',
      image: 'assets/img/battery.jpg',
      content: '<p>Most drivers only notice a battery when the car will not start. The truth is that a failing battery usually gives weeks of warning first. Catching it early turns a stressful 7am breakdown into a ten-minute doorstep replacement.</p>' +
        '<h3>1. Slow, Laboured Cranking</h3>' +
        '<p>The starter motor turns the engine over sluggishly and takes noticeably longer than usual. This is usually the first sign that internal resistance has risen inside the battery cells.</p>' +
        '<h3>2. Lights That Dim When You Turn the Key</h3>' +
        '<p>If headlights, dashboard lighting, or the radio noticeably fade while the engine is cranking, the battery cannot hold voltage under load. That is a clear warning to test it.</p>' +
        '<h3>3. A Swollen, Bulging, or Smelly Case</h3>' +
        '<p>Heat and age cause the electrolyte inside to gas out. A case that looks puffed or cracked has lost internal volume and should be replaced immediately — it can fail without warning.</p>' +
        '<h3>4. Corroded or Loose Terminals</h3>' +
        '<p>White, green, or blue-green powder around the battery posts means moisture has been getting in. Corrosion raises resistance at the connection and is often mistaken for a bad battery when the real fix is cleaning.</p>' +
        '<h3>5. Short Trips Only</h3>' +
        '<p>If your battery is rarely allowed a full charge cycle — lots of short commutes, frequent engine restarts — lead-acid chemistry degrades faster. A weekly 30-minute drive is often enough to keep it healthy.</p>' +
        '<h3>6. A Battery Older Than Four Years</h3>' +
        '<p>Typical lifespan is three to five years. Once your battery passes four, treat a load test as annual maintenance rather than something to wait for.</p>' +
        '<div style="background:var(--panel-2);border-left:4px solid var(--amber);padding:20px;margin:30px 0;">' +
        '<strong style="color:var(--amber);display:block;margin-bottom:6px;">CAR HIVE ADVICE:</strong>' +
        '<p style="margin:0;font-size:14px;color:var(--steel);">A $29 doorstep load test tells you the truth in 20 minutes, with a written report. If it fails, we can fit a replacement at the same visit.</p>' +
        '</div>'
    },
    {
      id: 'winter-battery-care',
      title: 'Why Batteries Die In Winter (And How To Beat It)',
      category: 'Seasonal',
      date: 'November 24, 2025',
      readTime: '5 min read',
      excerpt: 'Cold does not kill batteries — it exposes them. Capacity drops about 60% at freezing, so marginal batteries finally reveal themselves.',
      image: 'assets/img/battery-service.jpg',
      content: '<p>Cold weather does not drain a healthy battery. It removes the margin a tired battery has been living on. At 0&deg;C a lead-acid battery delivers roughly 40% less cranking power than at 25&deg;C, which is why a marginal battery that started fine all autumn suddenly refuses on the first freezing morning.</p>' +
        '<h3>The Chemistry Behind Cold Failures</h3>' +
        '<p>Chemical reactions inside a lead-acid cell slow down in the cold. Discharge reactions slow further, so available capacity falls. The engine, meanwhile, needs more energy to start because oil thickens and air density drops.</p>' +
        '<h3>Cold-Soaked Electronics Are a Separate Problem</h3>' +
        '<p>Below freezing, moisture condenses on connectors and can freeze in harnesses and infotainment modules, drawing current overnight. This is one of the most common causes of a battery that is flat every morning but tests fine during the day.</p>' +
        '<h3>Four Things That Actually Help</h3>' +
        '<p>Keep the battery clean and dry, tighten the terminal clamp, park indoors where possible, and drive long enough after starting to bring the alternator to full charge. A smart charger or a monthly maintainer is the single most effective winter upgrade.</p>' +
        '<h3>Prepare Before The First Cold Snap</h3>' +
        '<p>Get the load test done in autumn rather than waiting for a breakdown. If your battery is already three years old, replacing it before winter is far cheaper than a roadside jump-start you do not need.</p>' +
        '<div style="background:var(--panel-2);border-left:4px solid var(--amber);padding:20px;margin:30px 0;">' +
        '<strong style="color:var(--amber);display:block;margin-bottom:6px;">WINTER PREP PACKAGE:</strong>' +
        '<p style="margin:0;font-size:14px;color:var(--steel);">Book a test plus a terminal clean before winter. If the battery fails the test on the spot, we fit a replacement in the same visit with no extra callout fee.</p>' +
        '</div>'
    },
    {
      id: 'jump-start-or-replace',
      title: 'Jump-Start Or Replace? How To Tell Instantly',
      category: 'How-To',
      date: 'March 09, 2026',
      readTime: '4 min read',
      excerpt: 'A jump-start gets you moving today. Sometimes that is the whole answer — and sometimes it is a $40 mistake waiting to happen.',
      image: 'assets/img/car-banner.jpg',
      content: '<p>Every jump-start we attend includes a free battery condition check, because the two outcomes are very different. One leaves you driving a healthy car. The other leaves you standing in the same car park next week.</p>' +
        '<h3>When a Jump-Start Is the Right Answer</h3>' +
        '<p>Your battery is three years old or younger, the car has been parked for a long time, or you rarely drive it. Lights were on overnight. In these cases the battery just needs a charge, and a booster start restores it to full.</p>' +
        '<h3>When You Need a Replacement</h3>' +
        '<p>The car struggled to start before going flat, the battery is warm to the touch, the case is swollen, or it has been jump-started already. A load test below 70% capacity means the battery will keep failing regardless of how many boosters you use.</p>' +
        '<h3>What We Do After Every Boost</h3>' +
        '<p>We measure cranking amps and state of health, then check the alternator output. A battery that passes but leaves the car flat on a short drive is not a battery problem at all — it is usually an alternator fault or a parasitic drain.</p>' +
        '<h3>Do It Yourself Safely</h3>' +
        '<p>Connect the positive clamp first, then the negative clamp to an unpainted ground point away from the battery. Never connect the second clamp to the negative terminal — modern vehicles can be damaged by the load spike.</p>' +
        '<div style="background:var(--panel-2);border-left:4px solid var(--amber);padding:20px;margin:30px 0;">' +
        '<strong style="color:var(--amber);display:block;margin-bottom:6px;">STRANDED RIGHT NOW?</strong>' +
        '<p style="margin:0;font-size:14px;color:var(--steel);">Call +1 (312) 555-0148 for a 45-minute dispatch, or book a $49 jump-start online. The battery test is included either way.</p>' +
        '</div>'
    }  ];
})();
