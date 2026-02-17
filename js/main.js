/* ============================================
   DAMAN MOKHA — Portfolio JS
   Vanilla JS | 2026 Edition
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initActiveNav();
    initContactForm();
    initCountUp();
  }

  /* ---------- Navbar Scroll ---------- */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  function initActiveNav() {
    var sections = document.querySelectorAll('.section[id]');
    var navLinks = document.querySelectorAll('.navbar__links a');
    if (!sections.length || !navLinks.length) return;

    function onScroll() {
      var scrollPos = window.scrollY + 120;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Count Up Animation ---------- */
  function initCountUp() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* ---------- Contact Form ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var fields = {
      name: {
        el: form.querySelector('#formName'),
        error: form.querySelector('#formNameError'),
        validate: function (v) {
          if (!v.trim()) return 'Name is required';
          if (v.trim().length < 2) return 'Name must be at least 2 characters';
          return '';
        }
      },
      email: {
        el: form.querySelector('#formEmail'),
        error: form.querySelector('#formEmailError'),
        validate: function (v) {
          if (!v.trim()) return 'Email is required';
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(v.trim())) return 'Please enter a valid email address';
          return '';
        }
      },
      phone: {
        el: form.querySelector('#formPhone'),
        error: form.querySelector('#formPhoneError'),
        validate: function (v) {
          if (!v.trim()) return 'Phone number is required';
          if (!v.trim().startsWith('+')) return 'Phone must start with + and country code';
          var digits = v.replace(/\D/g, '');
          if (digits.length < 10) return 'Phone must have at least 10 digits';
          return '';
        }
      },
      company: {
        el: form.querySelector('#formCompany'),
        error: form.querySelector('#formCompanyError'),
        validate: function (v) {
          if (!v.trim()) return 'Company name is required';
          return '';
        }
      },
      content: {
        el: form.querySelector('#formContent'),
        error: form.querySelector('#formContentError'),
        validate: function (v) {
          if (!v.trim()) return 'Message is required';
          if (v.trim().length < 10) return 'Message must be at least 10 characters';
          return '';
        }
      }
    };

    var submitBtn = form.querySelector('.form__submit');
    var successMsg = form.querySelector('.form__message--success');
    var errorMsg = form.querySelector('.form__message--error');

    // Real-time validation on blur
    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (!f.el) return;

      f.el.addEventListener('blur', function () {
        validateField(f);
      });

      f.el.addEventListener('input', function () {
        if (f.el.classList.contains('error')) {
          validateField(f);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Hide previous messages
      hideMessage(successMsg);
      hideMessage(errorMsg);

      // Validate all
      var isValid = true;
      Object.keys(fields).forEach(function (key) {
        if (!validateField(fields[key])) {
          isValid = false;
        }
      });

      if (!isValid) return;

      // Submit
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('btn--loading');

      var payload = {
        name: fields.name.el.value.trim(),
        email: fields.email.el.value.trim(),
        phone: fields.phone.el.value.trim(),
        company: fields.company.el.value.trim(),
        content: fields.content.el.value.trim()
      };

      fetch('https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-6247d364-cb3a-48ac-a3a7-146e59a10cbf/default/website-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            showMessage(successMsg, 'Message sent successfully! I\'ll get back to you soon.');
            form.reset();
            // Clear error states
            Object.keys(fields).forEach(function (key) {
              var f = fields[key];
              if (f.el) {
                f.el.classList.remove('error');
              }
              if (f.error) {
                f.error.classList.remove('visible');
                f.error.textContent = '';
              }
            });
          } else {
            // Check for brevo phone error
            var msg = 'Something went wrong. Please try again.';
            if (result.data && result.data.message) {
              if (result.data.message.toLowerCase().indexOf('phone') > -1) {
                msg = 'Invalid phone number format. Please use international format (e.g., +91XXXXXXXXXX).';
              } else {
                msg = result.data.message;
              }
            }
            showMessage(errorMsg, msg);
          }
        })
        .catch(function () {
          showMessage(errorMsg, 'Network error. Please check your connection and try again.');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('btn--loading');
        });
    });

    function validateField(f) {
      if (!f.el) return true;
      var msg = f.validate(f.el.value);
      if (msg) {
        f.el.classList.add('error');
        if (f.error) {
          f.error.textContent = msg;
          f.error.classList.add('visible');
        }
        return false;
      } else {
        f.el.classList.remove('error');
        if (f.error) {
          f.error.textContent = '';
          f.error.classList.remove('visible');
        }
        return true;
      }
    }

    function showMessage(el, text) {
      if (!el) return;
      el.innerHTML = '<i class="fa-solid fa-circle-info"></i> ' + text;
      el.classList.add('visible');
    }

    function hideMessage(el) {
      if (!el) return;
      el.classList.remove('visible');
      el.textContent = '';
    }
  }
})();
