// ── FAQ ACCORDION ──
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all items
    faqItems.forEach(el => el.classList.remove('open'));

    // If the clicked one wasn't open, open it
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});


// ── NAV ACTIVE LINK HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#00e87a';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.feature-card, .price-card, .step');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.22s ease';
  revealObserver.observe(el);
});