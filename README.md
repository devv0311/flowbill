# 💸 FlowBill

**A SaaS marketing landing page for an invoicing tool built for Indian freelancers.**

Live demo → [flowbill-dc.netlify.app](https://flowbill-dc.netlify.app)

---

## Overview

FlowBill is a conversion-focused SaaS landing page for a fictional invoicing product targeting solo freelancers in India. The page is designed to move visitors through a clear journey — from problem awareness in the hero to a sign-up CTA — with a dark, professional aesthetic and electric green accents.

Built as a frontend portfolio project simulating a real SaaS product launch page.

---

## Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky nav with smooth-scroll links and a "Start free" CTA button |
| **Hero** | Headline with product tagline, social proof (2,400+ freelancers, 4.9★), and a live invoice form mockup |
| **Trust Bar** | Logos of freelance platforms (Dribbble, Toptal, Upwork, Fiverr, etc.) |
| **Features** | 6-card grid — one-click invoices, auto reminders, earnings dashboard, UPI/bank ready, branded invoices, client history |
| **How It Works** | 3-step explainer with an animated dashboard mockup (overview, invoices, earnings tabs) |
| **Pricing** | 3-tier table — Free / Pro (₹299/mo) / Studio (₹799/mo) — with feature comparison |
| **FAQ** | Accordion with 5 questions, toggled via vanilla JS |
| **Final CTA** | Sign-up prompt with email capture and a success state on submission |

---

## Features

- Interactive FAQ accordion (open/close toggle via JS)
- Scroll reveal animations using `IntersectionObserver` — no external libraries
- Active nav link highlighting on scroll
- 3-tab dashboard mockup (Overview / Invoices / Earnings) with JS tab switching
- INR pricing with a "Most Popular" badge on the Pro plan
- Email capture with a success confirmation state
- Fully mobile-responsive

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic, section-based structure |
| CSS3 | Dark navy theme, CSS variables, Grid/Flexbox, transitions |
| Vanilla JavaScript | FAQ accordion, scroll reveal, active nav on scroll, tab switching |
| Netlify | Static site deployment |

---

## Project Structure

```
flowbill/
├── index.html
├── style.css
└── script.js
```

---

## Design Decisions

- **Dark navy + electric green** — standard SaaS "premium but approachable" palette, appropriate for a FinTech-adjacent product
- **Live invoice mockup in hero** — shows the product immediately, reduces cognitive load for the visitor
- **INR pricing** — deliberately localized for the Indian freelancer market
- **FAQ addresses real objections** — GST registration, mobile usage, trial expiry, payment flow, cancellation

---

## Getting Started

```bash
git clone https://github.com/devv0311/flowbill.git
```

No dependencies, no build step — open `index.html` in a browser.

---

## Author

**Dev Choudhary** — [github.com/devv0311](https://github.com/devv0311)
