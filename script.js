/* ── Mobile menu ── */
document.getElementById('menu-btn').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('open');
});

document.querySelectorAll('#menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('menu').classList.remove('open');
  });
});

/* ── Scroll reveal ── */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

/* ── Active nav highlight on scroll ── */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('#menu a');

var navObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(function (section) {
  navObserver.observe(section);
});

/* ── Back to top ── */
var backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Typewriter effect ── */
(function () {
  var phrases = [
    'a Computer Engineering Student.',
    'a Web Developer.',
    'learning Cloud on AWS.',
    'open to opportunities.',
    'passionate about tech.'
  ];
  var el = document.getElementById('typewriter');
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 80;
  var deletingSpeed = 45;
  var pauseAfterType = 1800;
  var pauseAfterDelete = 400;

  function type() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseAfterDelete;
    }

    setTimeout(type, delay);
  }

  type();
})();

/* ── Contact form ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var status  = document.getElementById('form-status');
  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.className = 'form-status error';
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status error';
    return;
  }

  var submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch('https://formspree.io/f/mpppbpep', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(this)
  })
  .then(function (res) {
    if (res.ok) {
      status.textContent = "Message sent! I'll get back to you soon.";
      status.className = 'form-status';
      document.getElementById('contact-form').reset();
    } else {
      return res.json().then(function (data) {
        throw new Error(data.errors ? data.errors.map(function(e){ return e.message; }).join(', ') : 'Something went wrong.');
      });
    }
  })
  .catch(function (err) {
    status.textContent = 'Failed to send: ' + err.message;
    status.className = 'form-status error';
  })
  .finally(function () {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    setTimeout(function () { status.textContent = ''; }, 6000);
  });
});
