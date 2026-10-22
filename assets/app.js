(() => {
  'use strict';
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu() {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menü öffnen');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {closeMenu();menu.focus();}
  });
  $$('#main-nav a').forEach(a => a.addEventListener('click', closeMenu));
  matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const top = $('.back-top');
  const updateTop = () => top.classList.toggle('visible', scrollY > 600);
  window.addEventListener('scroll', updateTop, {passive: true});
  updateTop();
  top.addEventListener('click', () => window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));


  // Homepage image slider: each photo has its own German headline, description and service link.
  // Keep the same four-second timing and controls as before.
  const heroCopy = [
    {
      eyebrow: 'WINTERGARTEN · HELLER WOHNRAUM',
      line1: 'Mehr Raum.',
      line2: 'Mehr Zuhause.',
      description: 'Ein Wintergarten bringt Licht, Offenheit und zusätzlichen Wohnkomfort – individuell geplant und passend zu Ihrem Zuhause umgesetzt.',
      serviceLabel: 'Wintergärten ansehen',
      serviceHref: 'wintergarten.html'
    },
    {
      eyebrow: 'TERRASSENÜBERDACHUNG · MODERNER WETTERSCHUTZ',
      line1: 'Ihre Terrasse.',
      line2: 'Neu gedacht.',
      description: 'Moderne Glaslösungen schützen Ihren Außenbereich und sorgen für eine elegante Verbindung zwischen Haus, Terrasse und Garten.',
      serviceLabel: 'Terrassendächer ansehen',
      serviceHref: 'terrassenueberdachung.html'
    },
    {
      eyebrow: 'ROLLLÄDEN · SCHUTZ & PRIVATSPHÄRE',
      line1: 'Mehr Schutz.',
      line2: 'Mehr Komfort.',
      description: 'Hochwertige Rollläden verbessern Sichtschutz, Beschattung und Wohnkomfort – funktional, langlebig und optisch passend zur Fassade.',
      serviceLabel: 'Rollläden entdecken',
      serviceHref: 'rollladen.html'
    }
  ];
  const heroSlides = $$('.hero-slide');
  if (heroSlides.length > 1) {
    const dots = $$('.hero-dot');
    let currentSlide = 0;
    let sliderTimer;
    const heroContent = $('.hero-content');
    const heroTitle = $('.hero h1');
    const heroEyebrow = $('.hero .eyebrow');
    const heroDescription = $('.hero-description');
    const heroServiceLink = $('.hero-buttons .button-outline');
    function showSlide(nextIndex) {
      currentSlide = (nextIndex + heroSlides.length) % heroSlides.length;
      const copy = heroCopy[currentSlide];
      if (copy && heroTitle && heroEyebrow && heroDescription && heroServiceLink) {
        heroEyebrow.textContent = copy.eyebrow;
        const line2 = document.createElement('span');
        line2.textContent = copy.line2;
        heroTitle.replaceChildren(document.createTextNode(copy.line1), document.createElement('br'), line2);
        heroDescription.textContent = copy.description;
        heroServiceLink.textContent = copy.serviceLabel;
        heroServiceLink.href = copy.serviceHref;
        // Brief, non-blocking caption transition; disabled for reduced-motion users.
        if (heroContent) {
          heroContent.classList.remove('hero-copy-updated');
          void heroContent.offsetWidth;
          heroContent.classList.add('hero-copy-updated');
        }
      }
      heroSlides.forEach((photo, index) => {
        const active = index === currentSlide;
        photo.classList.toggle('is-active', active);
        photo.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, index) => {
        const active = index === currentSlide;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });
    }
    function startSlideshow() {
      clearInterval(sliderTimer);
      if (!document.hidden) sliderTimer = window.setInterval(() => showSlide(currentSlide + 1), 4000);
    }
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
      showSlide(index);
      startSlideshow();
    }));
    document.addEventListener('visibilitychange', startSlideshow);
    startSlideshow();
  }

  const lightbox = $('#lightbox');
  if (lightbox) {
    const items = $$('.gallery-item');
    let visible = items.slice();
    let current = 0;
    let opener = null;
    const render = () => {
      const item = visible[current];
      $('#lightbox-img').src = item.dataset.image;
      $('#lightbox-img').alt = item.dataset.caption;
      $('#lightbox-caption').textContent = item.dataset.caption;

      $('.lightbox-next').hidden = visible.length < 2;
      $('.lightbox-prev').hidden = visible.length < 2;
    };
    items.forEach(item => item.addEventListener('click', () => {
      visible = items.filter(el => !el.hidden);
      current = visible.indexOf(item);
      opener = item;
      render();
      lightbox.showModal();
      document.body.classList.add('modal-open');
    }));
    const move = amount => {current = (current + amount + visible.length) % visible.length;render();};
    $('.lightbox-close').addEventListener('click', () => lightbox.close());
    $('.lightbox-next').addEventListener('click', () => move(1));
    $('.lightbox-prev').addEventListener('click', () => move(-1));
    lightbox.addEventListener('click', e => {if (e.target === lightbox) lightbox.close();});
    lightbox.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {e.preventDefault();move(1);}
      if (e.key === 'ArrowLeft') {e.preventDefault();move(-1);}
    });
    lightbox.addEventListener('close', () => {document.body.classList.remove('modal-open');opener?.focus();});
    $$('.filter-button').forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      $$('.filter-button').forEach(b => {b.classList.toggle('active', b === button);b.setAttribute('aria-pressed', String(b === button));});
      items.forEach(item => item.hidden = filter !== 'all' && item.dataset.category !== filter);
      $('#gallery-status').textContent = filter === 'all' ? 'Alle Bilder angezeigt' : `${button.textContent.trim()} angezeigt`;
    }));
  }



  // Datenschutzhinweis / Hinweis zu technisch notwendigen Cookies
  const NOTICE_KEY = 'hmPrivacyNoticeDismissed';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldShowPrivacyNotice = (() => {
    try {
      return localStorage.getItem(NOTICE_KEY) !== '1';
    } catch {
      return true;
    }
  })();

  if (shouldShowPrivacyNotice) {
    const notice = document.createElement('section');
    notice.className = 'privacy-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-live', 'polite');
    notice.setAttribute('aria-label', 'Datenschutzhinweis');
    notice.innerHTML = `
      <div class="privacy-notice__inner">
        <h2 class="privacy-notice__title">Datenschutzhinweis</h2>
        <p class="privacy-notice__text">Diese Website verwendet ausschließlich technisch notwendige Cookies bzw. lokale Speicherfunktionen, damit grundlegende Funktionen und die Sicherheit der Website gewährleistet werden. Es werden keine Statistik-, Marketing- oder Tracking-Cookies ohne Ihre Einwilligung gesetzt.</p>
        <div class="privacy-notice__links">
          <a href="datenschutz.html">Datenschutzerklärung</a>
          <a href="impressum.html">Impressum</a>
        </div>
        <button class="privacy-notice__button" type="button">Hinweis schließen</button>
      </div>
    `;

    const closeNotice = () => {
      notice.classList.add('is-hiding');
      const removeNotice = () => notice.remove();
      if (prefersReducedMotion) {
        removeNotice();
      } else {
        notice.addEventListener('transitionend', removeNotice, {once: true});
        window.setTimeout(removeNotice, 260);
      }
      try {
        localStorage.setItem(NOTICE_KEY, '1');
      } catch {}
    };

    document.body.append(notice);
    requestAnimationFrame(() => notice.classList.add('is-visible'));
    const closeButton = notice.querySelector('.privacy-notice__button');
    closeButton?.addEventListener('click', closeNotice);
    notice.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeNotice();
      }
    });
  }

  // Website-Kontaktformular: Versenden über FormSubmit ohne externen E-Mail-Client.
  const form = $('#inquiry-form');
  if (form) {
    const services = {
      terrassenueberdachung: 'Terrassenüberdachung',
      wintergarten: 'Wintergarten',
      insektenschutz: 'Insektenschutz & Fliegengitter',
      fenster: 'Fenster',
      rollladen: 'Rollläden',
      garagentore: 'Garagentore',
      markisen: 'Markisen',
      vordaecher: 'Vordächer'
    };
    const selected = new URLSearchParams(location.search).get('service');
    const option = services[selected] || selected;
    if (option && [...$('#service').options].some(item => item.value === option)) {
      $('#service').value = option;
    }

    const status = $('#form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = submitButton.querySelector('.submit-label');
    const normalButtonText = submitLabel.textContent;
    const contactEmail = 'info@hm-bauelemente24.de';
    const ajaxEndpoint = 'https://formsubmit.co/ajax/' + contactEmail;
    let sending = false;

    const setFeedback = (kind, text) => {
      status.hidden = false;
      status.classList.toggle('is-success', kind === 'success');
      status.classList.toggle('is-error', kind === 'error');
      status.textContent = text;
      status.focus({preventScroll: true});
    };

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending || !form.reportValidity()) return;
      // A filled honeypot is an automated submission: do not send data.
      if (form.querySelector('[name="_honey"]').value.trim()) return;

      sending = true;
      status.hidden = true;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitLabel.textContent = 'Anfrage wird gesendet …';

      const details = new FormData(form);
      details.set('_replyto', String(details.get('email') || ''));
      details.set('_url', location.href.split('#')[0]);
      const data = Object.fromEntries(details.entries());
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);

      try {
        const response = await fetch(ajaxEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data),
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== 'true')) {
          throw new Error('FormSubmit did not confirm submission');
        }
        form.reset();
        setFeedback('success', 'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns so bald wie möglich bei Ihnen.');
      } catch {
        // Do not claim a failed or successful delivery on an ambiguous network result.
        setFeedback('error', 'Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an ' + contactEmail + '.');
      } finally {
        window.clearTimeout(timeout);
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        submitLabel.textContent = normalButtonText;
        sending = false;
      }
    });
  }
})();
