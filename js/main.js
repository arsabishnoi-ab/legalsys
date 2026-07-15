/**
 * Main interactions for PS Viswanathan Advocate landing page.
 */

import { REVIEWS } from './reviews.js';

const SITE = {
  phone: '09741594041',
  phoneIntl: '919741594041',
  email: 'psviswanathan.advocate@gmail.com',
  name: 'PS Viswanathan',
};

/* ── 1. Footer year ─────────────────────────────────────────────── */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* ── 2. Header scroll state ─────────────────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── 3. Mobile navigation ───────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeNav();
    else openNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

/* ── 4. Scrollspy ─────────────────────────────────────────────────── */
function initScrollspy() {
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!navLinks.length || !sections.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) linkMap.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((l) => l.classList.remove('is-active'));
        const active = linkMap.get(id);
        if (active) active.classList.add('is-active');
      });
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ── 5. Scroll reveal ───────────────────────────────────────────── */
let revealObserver = null;

function observeRevealElements(elements) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = elements || document.querySelectorAll('.reveal:not([data-reveal-observed])');
  if (!items.length) return;

  if (prefersReduced) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }

  items.forEach((el) => {
    el.dataset.revealObserved = 'true';
    revealObserver.observe(el);
  });
}

function initScrollReveal() {
  observeRevealElements();
}

/* ── 6. Animated stat counters ──────────────────────────────────── */
function initStatCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}${suffix}`;
    };

    requestAnimationFrame(tick);
  };

  const showFinal = (el) => {
    const target = el.dataset.count || '0';
    const suffix = el.dataset.suffix || '';
    el.textContent = `${target}${suffix}`;
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (prefersReduced) showFinal(entry.target);
        else animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ── 7. Reviews module ──────────────────────────────────────────── */
function initReviews() {
  const grid = document.getElementById('reviews-grid');
  const loadMoreBtn = document.getElementById('load-more-reviews');
  const filterBtns = document.querySelectorAll('[data-review-filter]');
  if (!grid || !loadMoreBtn) return;

  const PAGE_SIZE = 6;
  let activeFilter = 'All';
  let visibleCount = 0;

  const filtered = () =>
    activeFilter === 'All' ? REVIEWS : REVIEWS.filter((r) => r.tag === activeFilter);

  const initials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const stars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const renderCard = (review) => `
    <article class="review-card reveal">
      <div class="review-stars" aria-label="${review.rating} out of 5 stars">${stars(review.rating)}</div>
      <blockquote class="review-text">"${review.text}"</blockquote>
      <div class="review-author">
        <div class="review-avatar" aria-hidden="true">${initials(review.name)}</div>
        <div>
          <p class="review-name">${review.name}</p>
          <p class="review-tag">[${review.tag}] Matter</p>
        </div>
      </div>
    </article>
  `;

  const updateLoadMore = (total) => {
    loadMoreBtn.hidden = visibleCount >= total;
  };

  const render = (append = false) => {
    const list = filtered();

    if (list.length === 0) {
      grid.innerHTML = '<p class="reviews-empty">No reviews found for this category.</p>';
      loadMoreBtn.hidden = true;
      visibleCount = 0;
      return;
    }

    if (!append) {
      grid.innerHTML = '';
      visibleCount = 0;
    }

    const batch = list.slice(visibleCount, visibleCount + PAGE_SIZE);
    grid.insertAdjacentHTML('beforeend', batch.map(renderCard).join(''));
    visibleCount += batch.length;
    updateLoadMore(list.length);

    observeRevealElements(grid.querySelectorAll('.review-card.reveal:not([data-reveal-observed])'));
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.reviewFilter || 'All';
      filterBtns.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      render(false);
    });
  });

  loadMoreBtn.addEventListener('click', () => render(true));

  render(false);
}

/* ── 8 & 9. Contact form validation & submit ────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  const fields = {
    name: form.querySelector('#contact-name'),
    phone: form.querySelector('#contact-phone'),
    matter: form.querySelector('#contact-matter'),
    message: form.querySelector('#contact-message'),
  };

  const clearInvalid = (field) => field?.classList.remove('is-invalid');

  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => clearInvalid(field));
    field.addEventListener('change', () => clearInvalid(field));
  });

  const validate = () => {
    let valid = true;
    ['name', 'phone', 'message'].forEach((key) => {
      const field = fields[key];
      if (!field) return;
      const empty = !field.value.trim();
      field.classList.toggle('is-invalid', empty);
      if (empty) valid = false;
    });
    return valid;
  };

  const buildBody = () => {
    const matter = fields.matter?.value || 'Not specified';
    return [
      `Name: ${fields.name?.value.trim()}`,
      `Phone: ${fields.phone?.value.trim()}`,
      `Type of Matter: ${matter}`,
      '',
      'Brief Description:',
      fields.message?.value.trim(),
    ].join('\n');
  };

  const setStatus = (msg, type = '') => {
    if (!status) return;
    status.textContent = msg;
    status.className = `form-status ${type}`.trim();
  };

  form.querySelector('[data-action="email"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('Please fill in all required fields.', 'error');
      return;
    }
    const subject = encodeURIComponent(`Legal Consultation Request — ${fields.name.value.trim()}`);
    const body = encodeURIComponent(buildBody());
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus('Opening your email client…', 'success');
  });

  form.querySelector('[data-action="whatsapp"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('Please fill in all required fields.', 'error');
      return;
    }
    const text = encodeURIComponent(
      `Hello ${SITE.name}, I would like a legal consultation.\n\n${buildBody()}`
    );
    window.open(`https://wa.me/${SITE.phoneIntl}?text=${text}`, '_blank', 'noopener');
    setStatus('Opening WhatsApp…', 'success');
  });
}

/* ── Init ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFooterYear();
  initHeaderScroll();
  initMobileNav();
  initScrollspy();
  initScrollReveal();
  initStatCounters();
  initReviews();
  initContactForm();
});
