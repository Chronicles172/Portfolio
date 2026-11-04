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
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
  observer.observe(el);
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
      // Finished typing — pause then start deleting
      delay = pauseAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseAfterDelete;
    }

    setTimeout(type, delay);
  }

  type();
})();

/* ── Contact form (client-side only — logs to console until a backend is wired up) ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var status = document.getElementById('form-status');
  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  // Basic validation
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

  // Placeholder — swap this for a real fetch() to a backend / Formspree / EmailJS
  status.textContent = 'Message sent! I\'ll get back to you soon.';
  status.className = 'form-status';
  this.reset();

  // Clear success message after 5 seconds
  setTimeout(function () { status.textContent = ''; }, 5000);
});
