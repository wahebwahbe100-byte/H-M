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

  const form = $('#inquiry-form');
  if (form) {
    const services = {terrassenueberdachung: 'Terrassenüberdachung', wintergarten: 'Wintergarten', insektenschutz: 'Insektenschutz & Fliegengitter', fenster: 'Fenster', rollladen: 'Rollläden', garagentore: 'Garagentore'};
    const selected = new URLSearchParams(location.search).get('service');
    const option = services[selected] || selected;
    if (option && [...$('#service').options].some(o => o.value === option)) $('#service').value = option;
    const dialog = $('#inquiry-dialog');
    const summary = $('#inquiry-summary');
    let message = '';
    const config = window.HM_CONFIG || {};
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail || '');
    if (hasEmail) {
      $('.form-note').textContent = 'Ihre Anfrage wird für Ihr E-Mail-Programm vorbereitet. Sie prüfen und versenden die Nachricht anschließend selbst.';
      const note = $('.contact-preview-notice');
      if (note) {
        note.replaceChildren();
        const title = document.createElement('strong'); title.textContent = 'Direkter Kontakt'; note.append(title);
        const email = document.createElement('a'); email.href = 'mailto:' + config.contactEmail; email.textContent = config.contactEmail;
        const p = document.createElement('p'); p.append(email); note.append(p);
        if (config.phone) {const p = document.createElement('p'); const a = document.createElement('a');a.href = 'tel:' + config.phone.replace(/[^+\d]/g, '');a.textContent = config.phone;p.append(a);note.append(p);}
        if (config.address) {const p = document.createElement('p');p.textContent = config.address;note.append(p);}
      }
      $('h2 + p', dialog).textContent = 'Ihre Anfrage ist bereit. Öffnen Sie sie in Ihrem E-Mail-Programm, prüfen Sie den Inhalt und versenden Sie sie selbst. Alternativ können Sie den Text kopieren oder herunterladen.';
      const mail = document.createElement('a');mail.className = 'button';mail.id = 'email-inquiry';mail.textContent = 'Im E-Mail-Programm öffnen';$('.dialog-actions').prepend(mail);
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      message = `Projektanfrage an H&M Bauelemente\n\nLeistung: ${data.get('service')}\nName: ${data.get('name').trim()}\nE-Mail: ${data.get('email').trim()}\nTelefon: ${data.get('phone').trim() || 'Nicht angegeben'}\n\nMein Projekt:\n${data.get('message').trim()}\n\nBitte kontaktieren Sie mich für ein persönliches Beratungsgespräch.`;
      summary.textContent = message;
      $('#copy-status').textContent = '';
      if (hasEmail) $('#email-inquiry').href = `mailto:${config.contactEmail}?subject=${encodeURIComponent('Projektanfrage: ' + data.get('service'))}&body=${encodeURIComponent(message)}`;
      dialog.showModal();document.body.classList.add('modal-open');
    });
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      const r = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    $('#copy-inquiry').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message);
        $('#copy-status').textContent = 'Ihre Anfrage wurde in die Zwischenablage kopiert.';
      } catch {
        const selection = window.getSelection();const range = document.createRange();range.selectNodeContents(summary);selection.removeAllRanges();selection.addRange(range);
        $('#copy-status').textContent = 'Der Text ist markiert. Sie können ihn jetzt manuell kopieren.';
      }
    });
    $('#download-inquiry').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob(['\uFEFF' + message], {type: 'text/plain;charset=utf-8'}));
      const a = document.createElement('a');a.href = url;a.download = 'HM-Bauelemente-Projektanfrage.txt';document.body.append(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(url), 1000);
      $('#copy-status').textContent = 'Der Download Ihrer Anfrage wurde gestartet.';
    });
  }
})();
