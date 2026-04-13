/* ─────────────────────────────────────────
   FlowBill — script.js
   1. Interactive invoice builder
   2. FAQ accordion
   3. How-it-works tabs
   4. Signup form with validation
   5. Scroll reveal
   6. Nav active link on scroll
   7. Toast notifications
───────────────────────────────────────── */

// ── 1. INVOICE BUILDER ──────────────────

const GST_RATE = 0.18;
let itemCount = 0;

function formatINR(val) {
  return '₹' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function addItem(description = '', qty = '', rate = '') {
  itemCount++;
  const list = document.getElementById('inv-items-list');

  const row = document.createElement('div');
  row.className = 'inv-item';
  row.dataset.id = itemCount;
  row.innerHTML = `
    <input type="text" placeholder="Description" class="item-desc" value="${description}" />
    <input type="number" placeholder="Qty" class="item-qty" min="1" value="${qty}" />
    <input type="number" placeholder="Rate (₹)" class="item-rate" min="0" value="${rate}" />
    <button class="btn-remove-item" title="Remove" onclick="removeItem(this)">×</button>
  `;

  // Live recalc on any input change
  row.querySelectorAll('input').forEach(inp => inp.addEventListener('input', recalc));
  list.appendChild(row);
  recalc();
}

function removeItem(btn) {
  btn.closest('.inv-item').remove();
  recalc();
}

function recalc() {
  const rows = document.querySelectorAll('.inv-item');
  let subtotal = 0;

  rows.forEach(row => {
    const qty  = parseFloat(row.querySelector('.item-qty')?.value)  || 0;
    const rate = parseFloat(row.querySelector('.item-rate')?.value) || 0;
    subtotal += qty * rate;
  });

  const gst   = subtotal * GST_RATE;
  const total = subtotal + gst;

  document.getElementById('inv-subtotal').textContent = formatINR(subtotal);
  document.getElementById('inv-gst').textContent      = formatINR(gst);
  document.getElementById('inv-total').textContent    = formatINR(total);
}

// Send invoice button
document.getElementById('btn-send-invoice')?.addEventListener('click', () => {
  const client = document.getElementById('inv-client')?.value?.trim();
  const items  = document.querySelectorAll('.inv-item');
  const total  = document.getElementById('inv-total')?.textContent;

  if (!client) {
    showToast('⚠️', 'Please enter a client name first.');
    document.getElementById('inv-client')?.focus();
    return;
  }
  if (!items.length) {
    showToast('⚠️', 'Add at least one line item.');
    return;
  }

  showToast('✅', `Invoice sent to ${client} for ${total}!`);
});

// Preview/download button
document.getElementById('btn-preview-invoice')?.addEventListener('click', () => {
  const client = document.getElementById('inv-client')?.value?.trim() || 'Client';
  const total  = document.getElementById('inv-total')?.textContent || '₹0';
  showToast('📄', `Preview ready — ${client} · ${total}`);
});


// ── 2. FAQ ACCORDION ─────────────────────

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.querySelector('.faq-question')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});


// ── 3. HOW-IT-WORKS TABS ─────────────────

const tabs    = document.querySelectorAll('.how-tab');
const tabPanes = document.querySelectorAll('.how-tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});


// ── 4. SIGNUP FORM ───────────────────────

const signupForm    = document.getElementById('signup-form');
const signupInput   = document.getElementById('signup-email');
const signupSuccess = document.getElementById('signup-success');

signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupInput?.value?.trim();

  if (!email || !email.includes('@') || !email.includes('.')) {
    showToast('⚠️', 'Please enter a valid email address.');
    signupInput?.focus();
    return;
  }

  // Simulate async signup
  const btn = signupForm.querySelector('button[type="submit"]');
  btn.textContent = 'Starting…';
  btn.disabled = true;

  setTimeout(() => {
    signupForm.style.display = 'none';
    signupSuccess.classList.add('show');
    showToast('🎉', `Welcome aboard! Check ${email} for your link.`);
  }, 900);
});


// ── 5. SCROLL REVEAL ─────────────────────

const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 60}ms`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));


// ── 6. NAV ACTIVE HIGHLIGHT ──────────────

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--green)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObs.observe(s));


// ── 7. TOAST ─────────────────────────────

let toastTimer;
function showToast(icon, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent  = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}


// ── INIT ──────────────────────────────────

// Seed two default line items so mockup isn't empty
addItem('UI Design — 3 screens', 1, 9000);
addItem('Revisions (2 rounds)',  1, 2500);