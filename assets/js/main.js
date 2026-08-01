/* ==========================================================================
   BrandUpMe - homepage behaviour
   No dependencies. No build step. Loaded with `defer`.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Sticky header shadow ---------- */
  var hdr = document.getElementById('hdr');
  function onScroll() {
    if (hdr) hdr.classList.toggle('is-stuck', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close after tapping any link inside the menu
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- 3. Scroll-reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Failsafe: nothing may stay hidden. If an element was never revealed
  // (observer misfire, unusual viewport, zoom, print), force it visible.
  window.setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }, 2500);

  /* ---------- 4. Accordion - one open at a time, per group ---------- */
  document.querySelectorAll('.q-list').forEach(function (group) {
    var items = group.querySelectorAll('details.q');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (other) { if (other !== d) other.open = false; });
      });
    });
  });

  /* ---------- 5. Active nav link on scroll (scroll-spy) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 6. Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ==========================================================================
     7. REGISTRATION FORM
     --------------------------------------------------------------------------
     BACKEND INTEGRATION POINT - currently unwired, pending client decision.

     The form posts to whatever URL is in the <form action="..."> attribute.
     To go live, replace that action with one of:

       Formspree    https://formspree.io/f/YOUR_FORM_ID
       Web3Forms    https://api.web3forms.com/submit   (+ hidden access_key input)
       Custom PHP   /submit.php   (set FORM_MODE below to 'php')

     Until a real endpoint is set, the form validates and then shows a
     "not yet connected" notice instead of silently failing.
     ========================================================================== */

  var MAX_LOGO_MB = 5;
  var MAX_PROFILE_MB = 10;

  var form = document.getElementById('partnerForm');
  if (!form) return;

  var msg = document.getElementById('formMsg');
  var submitBtn = document.getElementById('submitBtn');
  var consentErr = document.getElementById('consentErr');

  function setInvalid(field, bad) {
    var wrap = field.closest('.field');
    if (wrap) wrap.classList.toggle('is-invalid', bad);
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  function validPhone(v) {
    var digits = v.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  function fileTooBig(input, maxMb) {
    return !!(input && input.files && input.files[0] && input.files[0].size > maxMb * 1024 * 1024);
  }

  function showMsg(text, ok) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'form-msg ' + (ok ? 'ok' : 'bad');
  }

  // Clear the error state as soon as the user starts fixing a field
  form.addEventListener('input', function (e) {
    if (e.target.matches('input, select, textarea')) setInvalid(e.target, false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstBad = null;
    var ok = true;

    // Required text / select fields
    form.querySelectorAll('[required]').forEach(function (field) {
      if (field.type === 'checkbox') return; // handled separately
      var bad = !field.value.trim();

      if (!bad && field.type === 'email') bad = !validEmail(field.value);
      if (!bad && field.type === 'tel') bad = !validPhone(field.value);

      setInvalid(field, bad);
      if (bad) {
        ok = false;
        if (!firstBad) firstBad = field;
      }
    });

    // Optional WhatsApp number - validate only if filled
    var wa = document.getElementById('whatsapp');
    if (wa && wa.value.trim() && !validPhone(wa.value)) {
      setInvalid(wa, true);
      ok = false;
      if (!firstBad) firstBad = wa;
    }

    // Consent
    var consent = document.getElementById('consent');
    if (consent && !consent.checked) {
      ok = false;
      if (consentErr) consentErr.style.display = 'block';
      if (!firstBad) firstBad = consent;
    } else if (consentErr) {
      consentErr.style.display = 'none';
    }

    // File sizes
    if (fileTooBig(document.getElementById('logo'), MAX_LOGO_MB)) {
      showMsg('Your logo file is larger than ' + MAX_LOGO_MB + ' MB. Please upload a smaller file.', false);
      return;
    }
    if (fileTooBig(document.getElementById('profile'), MAX_PROFILE_MB)) {
      showMsg('Your company profile is larger than ' + MAX_PROFILE_MB + ' MB. Please upload a smaller file.', false);
      return;
    }

    if (!ok) {
      showMsg('Please complete the highlighted fields before submitting.', false);
      if (firstBad) {
        firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstBad.focus({ preventScroll: true });
      }
      return;
    }

    var action = form.getAttribute('action') || '';

    // Guard: endpoint not configured yet
    if (!action || action.indexOf('REPLACE_WITH_YOUR_FORM_ID') !== -1) {
      showMsg(
        'Form is validated but the submission endpoint is not connected yet. ' +
        'Set the form "action" URL in index.html to go live.',
        false
      );
      return;
    }

    submitBtn.disabled = true;
    var originalHTML = submitBtn.innerHTML;
    submitBtn.textContent = 'Submitting…';

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed with status ' + res.status);
        window.location.href = 'thank-you.html';
      })
      .catch(function () {
        showMsg(
          'Sorry - we could not submit your registration. Please try again, ' +
          'or WhatsApp us on +971 50 123 4567 and we will register you manually.',
          false
        );
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      });
  });
})();
