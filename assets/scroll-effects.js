(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  if (header) {
    let isTicking = false;
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      isTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        isTicking = true;
        window.requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
    updateHeader();
  }

  if (reducedMotion || !('IntersectionObserver' in window)) return;

  // A small, deliberate set of targets keeps the design readable and scrolling fluid.
  // No whole-page scroll handlers, parallax, forced smooth wheel scrolling, or layout shifts.
  const selectors = [
    '.services-section .section-head', '.services-section .service-card',
    '.benefits-section .section-head', '.benefits-section .benefit',
    '.section-head', '.home-gallery .gallery-item',
    '.process-section .step',
    '.home-faq-intro', '.home-faq-list details',
    '.hm-feature-main', '.hm-feature-side',
    '.cta-inner', '.option-card', '.about-values article',
    '.gallery-grid .gallery-item',
    '.split-section > div', '.split-section > figure',
    '.detail-benefits > .container > div',
    '.contact-page-grid > *', '.page-intro',
    '.detail-hero > div', '.detail-hero > figure'
  ];
  const targets = Array.from(new Set(
    selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)))
  )).filter(el => !el.closest('.hero') && !el.closest('dialog') && !el.matches('[hidden]'));

  if (!targets.length) return;
  targets.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    const group = el.parentElement;
    const siblings = Array.from(group?.children || []).filter(e => targets.includes(e));
    const within = siblings.indexOf(el);
    // Short stagger; never force visitors to wait for a distant grid item.
    const delay = within >= 0 ? Math.min(within % 4, 3) * 65 : 0;
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { root: null, rootMargin: '0px 0px -35px 0px', threshold: 0.06 });
  targets.forEach(el => observer.observe(el));
  document.documentElement.classList.add('has-reveal');
})();
