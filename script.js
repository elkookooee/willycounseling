// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  })
);

// Header shadow on scroll
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form
// There is no server behind this static site, so the form opens the visitor's
// email app with the message pre-filled. To receive submissions directly,
// connect a form service (e.g. Formspree or Netlify Forms) and post to it here.
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.classList.remove('error');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.name.closest('.field').classList.toggle('invalid', !name);
  form.email.closest('.field').classList.toggle('invalid', !emailOk);

  if (!name || !emailOk) {
    status.textContent = 'Please enter your name and a valid email address.';
    status.classList.add('error');
    return;
  }

  const subject = `New inquiry: ${form.interest.value}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${form.phone.value.trim() || '—'}`,
    `Interested in: ${form.interest.value}`,
    '',
    form.message.value.trim(),
  ].join('\n');

  window.location.href =
    `mailto:Cecilia@willycounseling.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = 'Thank you! Your email app should open so you can send your message.';
  form.reset();
});
