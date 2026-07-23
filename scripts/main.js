document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.contact__tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', String(isActive));
        t.tabIndex = isActive ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !isActive;
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact__form--brief');
  if (!form) return;

  const nameInput = form.querySelector('#brief-name');
  const emailInput = form.querySelector('#brief-email');
  const budgetInput = form.querySelector('#brief-budget');
  const timelineInput = form.querySelector('#brief-timeline');
  const needChecks = form.querySelectorAll('input[name="need[]"]');
  const needFieldset = form.querySelector('.contact__project-types');
  const formBody = form.querySelector('.contact__form-body');
  const confirmation = form.querySelector('.contact__confirmation');

  function showError(input, message) {
    const wrapper = input.closest('div') || input.parentElement;
    let error = wrapper.querySelector('.contact__error');
    if (!error) {
      error = document.createElement('p');
      error.className = 'contact__error';
      error.setAttribute('aria-live', 'polite');
      wrapper.appendChild(error);
    }
    error.textContent = message;
    input.classList.add('contact__input--error');
  }

  function clearError(input) {
    const wrapper = input.closest('div') || input.parentElement;
    const error = wrapper.querySelector('.contact__error');
    if (error) error.remove();
    input.classList.remove('contact__input--error');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearNeedError() {
    const error = needFieldset.querySelector('.contact__error');
    if (error) error.remove();
  }

  function validateForm() {
    let isValid = true;

    [nameInput, emailInput, budgetInput, timelineInput].forEach(clearError);
    clearNeedError();

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required.');
      isValid = false;
    }

    const email = emailInput.value.trim();
    if (!email) {
      showError(emailInput, 'Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!Array.from(needChecks).some(c => c.checked)) {
      const error = document.createElement('p');
      error.className = 'contact__error';
      error.textContent = 'Please select at least one option.';
      needFieldset.appendChild(error);
      isValid = false;
    }

    if (!budgetInput.value) {
      showError(budgetInput, 'Please select a budget.');
      isValid = false;
    }

    if (!timelineInput.value) {
      showError(timelineInput, 'Please select a timeline.');
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formBody.hidden = true;
        confirmation.hidden = false;
      } else {
        showError(emailInput, 'Something went wrong — please try again or email me directly.');
        submitButton.disabled = false;
      }
    } catch {
      showError(emailInput, 'Something went wrong — please try again or email me directly.');
      submitButton.disabled = false;
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('contact__input--error')) clearError(emailInput);
  });

  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('contact__input--error')) clearError(nameInput);
  });

  budgetInput.addEventListener('change', () => clearError(budgetInput));
  timelineInput.addEventListener('change', () => clearError(timelineInput));
  needChecks.forEach(c => c.addEventListener('change', clearNeedError));

  form.querySelectorAll('.pill-select').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.remove('pill-bounce');
      void pill.offsetWidth;
      pill.classList.add('pill-bounce');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  function revealAndSettle(el) {
    el.addEventListener('animationend', () => {
      el.classList.add('reveal-settled');
    }, { once: true });
    el.classList.add('is-visible');
  }

  function setUpScrollReveal(section, itemsSelector, threshold = 0.2) {
    if (!section) return;

    const items = section.querySelectorAll(itemsSelector);
    section.classList.add('js-reveal-ready');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        items.forEach(revealAndSettle);
        obs.unobserve(entry.target);
      });
    }, { threshold });

    observer.observe(section);
  }

  setUpScrollReveal(document.querySelector('.services'), 'h2');
  setUpScrollReveal(document.querySelector('#work'), '.eyebrow, h2, .card--project');
  setUpScrollReveal(document.querySelector('#how-i-work'), 'h2, .hero__subtext, .card');
  setUpScrollReveal(
    document.querySelector('#about'),
    '.about__text, .about__image-frame, .about__text .hero__greeting, .about__text h2, .about__text p:not(.hero__greeting)'
  );
  setUpScrollReveal(document.querySelector('.skills'), '.skills__heading, .skill-pill');
  setUpScrollReveal(document.querySelector('.tool-stack'), '.tool-card');
  setUpScrollReveal(document.querySelector('.contact'), 'h2, .contact__subtext, .contact__form');
  setUpScrollReveal(document.querySelector('.page-everiithing .case-study-hero'), '.case-study-hero__media');
  setUpScrollReveal(
    document.querySelector('.page-everiithing .case-study-editorial--top'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(
    document.querySelector('.page-everiithing .case-study-editorial--reverse'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(document.querySelector('.page-everiithing .case-study-gallery'), '.mockup');
  setUpScrollReveal(document.querySelector('.page-bizcore .case-study-hero'), '.case-study-hero__media');
  setUpScrollReveal(
    document.querySelector('.page-bizcore .case-study-editorial--top'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(
    document.querySelector('.page-bizcore .case-study-editorial--reverse'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(document.querySelector('.page-ceembee .case-study-hero'), '.case-study-hero__media');
  setUpScrollReveal(
    document.querySelector('.page-ceembee .case-study-editorial--top'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(document.querySelector('.page-mikhiyah .case-study-hero'), '.case-study-hero__media');
  setUpScrollReveal(
    document.querySelector('.page-mikhiyah .case-study-editorial--top'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(
    document.querySelector('.page-mikhiyah .case-study-editorial--reverse'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(document.querySelector('.page-receiptvault .case-study-hero'), '.case-study-hero__media');
  setUpScrollReveal(
    document.querySelector('.page-receiptvault .case-study-editorial--top'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(
    document.querySelector('.page-receiptvault .case-study-editorial--reverse'),
    '.case-study-editorial__media, .case-study-editorial__content'
  );
  setUpScrollReveal(document.querySelector('.page-receiptvault .case-study-gallery'), '.mockup');

  setUpScrollReveal(document.querySelector('.page-stackit .case-study-hero'), '.pill--status, h1, .hero__subtext');
  document.querySelectorAll('.page-stackit .case-study-section').forEach(section => {
    if (section.querySelector('.case-study-gallery')) return;
    setUpScrollReveal(section, 'h2, p, .stat-block, .card, .mockup');
  });
  setUpScrollReveal(document.querySelector('.page-stackit .case-study-gallery'), '.mockup');
});

/* "How I Work" step cards (Discover, Define, Design) — border draw-in.
   Each card gets its own IntersectionObserver so the trace fires as that
   specific card enters the viewport (not all three at once, and independent
   of the section-level fade/slide reveal set up above). The SVG rect's
   pathLength="1" normalizes stroke-dasharray/stroke-dashoffset to 0–1
   regardless of the card's actual perimeter, so animating dashoffset 1 -> 0
   draws the outline in one continuous stroke. Once that transition ends,
   .is-drawn hands off to the real CSS border and fades the title/description
   in. */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#how-i-work .card--step');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-drawn'));
    return;
  }

  function sizeBorder(card) {
    const svg = card.querySelector('.card__border-draw');
    const rect = svg.querySelector('rect');
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    if (!w || !h) return;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    rect.setAttribute('width', Math.max(w - 1, 0));
    rect.setAttribute('height', Math.max(h - 1, 0));
  }

  cards.forEach(sizeBorder);

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => sizeBorder(entry.target));
    });
    cards.forEach(card => resizeObserver.observe(card));
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const rect = card.querySelector('.card__border-draw rect');

      sizeBorder(card);
      void card.offsetWidth;
      card.classList.add('is-drawing');

      rect.addEventListener('transitionend', function onDrawEnd(e) {
        if (e.propertyName !== 'stroke-dashoffset') return;
        rect.removeEventListener('transitionend', onDrawEnd);
        card.classList.add('is-drawn');
      });

      obs.unobserve(card);
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
});

/* Selected Work collapsing-header accordion — mobile only. Each card is
   wrapped in a .work-accordion__slot whose height is fixed once (to the
   card's own natural height) and never changes again, so the section's
   total scrollable length stays constant even as content collapses.
   Letting the *containing block* itself shrink live (an earlier attempt:
   cards sat directly in the track with no slot) caused the section to run
   out of real scroll room before later cards got their turn — headers
   overlapped and the whole stack un-stuck early. With a fixed-size slot as
   its containing block, each card sticks just below the floating nav only
   while the user scrolls through that card's own slot: its body
   (thumbnail + description) shrinks in real height (not just opacity)
   during that window, then rides along collapsed until the slot ends and
   the next card's slot takes over — an accordion panel closing, one at a
   time. Progress is computed from window.scrollY against each slot's own
   natural document-coordinate anchor captured once in measure() — never
   from live rects of the elements being animated, which would create a
   feedback loop as shrinking content pulls later elements upward. */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#work');
  const track = section && section.querySelector('.card-grid--work');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(':scope > .card--project'));
  if (cards.length < 2) return;

  const slots = cards.map(card => {
    const slot = document.createElement('div');
    slot.className = 'work-accordion__slot';
    card.parentNode.insertBefore(slot, card);
    slot.appendChild(card);
    return slot;
  });

  const mobileQuery = window.matchMedia('(max-width: 639px)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

  let active = false;
  let metrics = [];
  let ticking = false;
  let resizeTimer;

  function remToPx(value) {
    const rem = parseFloat(value);
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return (Number.isNaN(rem) ? 1 : rem) * rootPx;
  }

  function resetInlineStyles() {
    slots.forEach(slot => slot.style.removeProperty('--work-slot-height'));
    cards.forEach(card => {
      card.style.removeProperty('--work-clearance');
      const thumb = card.querySelector('.card__thumb');
      const desc = card.querySelector('p');
      if (thumb) {
        thumb.style.removeProperty('--work-thumb-max');
        thumb.style.removeProperty('--work-gap');
        thumb.style.removeProperty('--work-body-opacity');
      }
      if (desc) {
        desc.style.removeProperty('--work-desc-max');
        desc.style.removeProperty('--work-gap');
        desc.style.removeProperty('--work-body-opacity');
      }
    });
  }

  function measure() {
    resetInlineStyles();

    const navFloat = document.querySelector('.site-nav__float');
    const navClearance = navFloat ? navFloat.getBoundingClientRect().height + 12 : 0;
    const gapPx = remToPx(getComputedStyle(document.documentElement).getPropertyValue('--space-sm'));
    const marginBottomPx = remToPx(getComputedStyle(document.documentElement).getPropertyValue('--space-md'));

    let naturalDocTop = slots[0].getBoundingClientRect().top + window.scrollY;

    metrics = cards.map((card, index) => {
      const slot = slots[index];
      const thumb = card.querySelector('.card__thumb');
      const desc = card.querySelector('p');

      const fullHeight = card.offsetHeight;
      const thumbHeight = thumb ? thumb.offsetHeight : 0;
      const descHeight = desc ? desc.offsetHeight : 0;
      const bodyHeight = Math.max(thumbHeight + descHeight + gapPx * 2, 1);
      const slotHeight = fullHeight + marginBottomPx;
      const docTop = naturalDocTop;
      const isLast = index === cards.length - 1;

      naturalDocTop += slotHeight;

      return { card, slot, thumb, desc, docTop, bodyHeight, thumbHeight, descHeight, gapPx, slotHeight, navClearance, isLast };
    });

    metrics.forEach(m => {
      m.slot.style.setProperty('--work-slot-height', `${m.slotHeight}px`);
      if (!m.isLast) {
        m.card.style.setProperty('--work-clearance', `${m.navClearance}px`);
      }
    });
  }

  function updateStack() {
    const scrollY = window.scrollY;

    metrics.forEach(m => {
      if (m.isLast) return; // last card: nothing follows it, stays fully expanded

      const beginAt = m.docTop - m.navClearance;
      const progress = Math.min(Math.max((scrollY - beginAt) / m.bodyHeight, 0), 1);
      const remaining = 1 - progress;

      if (m.thumb) {
        m.thumb.style.setProperty('--work-thumb-max', `${m.thumbHeight * remaining}px`);
        m.thumb.style.setProperty('--work-gap', `${m.gapPx * remaining}px`);
        m.thumb.style.setProperty('--work-body-opacity', String(remaining));
      }
      if (m.desc) {
        m.desc.style.setProperty('--work-desc-max', `${m.descHeight * remaining}px`);
        m.desc.style.setProperty('--work-gap', `${m.gapPx * remaining}px`);
        m.desc.style.setProperty('--work-body-opacity', String(remaining));
      }
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateStack();
      ticking = false;
    });
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (active) {
        measure();
        updateStack();
      }
    }, 150);
  }

  function activate() {
    if (active) return;
    active = true;
    measure();
    updateStack();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    resetInlineStyles();
  }

  function evaluate() {
    if (mobileQuery.matches && motionQuery.matches) {
      activate();
    } else {
      deactivate();
    }
  }

  mobileQuery.addEventListener('change', evaluate);
  motionQuery.addEventListener('change', evaluate);
  evaluate();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (active) {
        measure();
        updateStack();
      }
    });
  }
});

/* Skill-pill row entrance — kept separate from setUpScrollReveal above because
   that helper unobserves after the first reveal (load-once), while this one
   needs to replay every time the grid re-enters the viewport: it resets each
   pill's classes on exit so the next intersection starts the animation fresh. */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.services__grid');
  if (!grid) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const pills = Array.from(grid.querySelectorAll('.service-pill'));
  grid.classList.add('pills-reveal-ready');

  pills.forEach(pill => {
    pill.addEventListener('animationend', () => {
      pill.classList.remove('is-entering');
      pill.classList.add('reveal-settled');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pills.forEach(pill => pill.classList.remove('is-entering', 'reveal-settled'));
        void grid.offsetWidth;
        pills.forEach(pill => pill.classList.add('is-entering'));
      } else {
        pills.forEach(pill => pill.classList.remove('is-entering', 'reveal-settled'));
      }
    });
  }, { threshold: 0.2 });

  observer.observe(grid);
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.site-nav__float-toggle');
  const panel = document.querySelector('.site-nav__panel');
  const closeButton = panel && panel.querySelector('.site-nav__panel-close');
  if (!toggle || !panel) return;

  let hideTimeout;

  function closePanel() {
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      panel.hidden = true;
    }, 240);
  }

  function openPanel() {
    clearTimeout(hideTimeout);
    panel.hidden = false;
    void panel.offsetWidth;
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closePanel(); else openPanel();
  });

  if (closeButton) {
    closeButton.addEventListener('click', closePanel);
  }

  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) closePanel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      closePanel();
      toggle.focus();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const headline = document.querySelector('.hero__headline');
  if (!headline) return;

  const isMobile = window.matchMedia('(max-width: 639px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isMobile || prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const BASE_DELAY = 45;
  const PAUSE_AFTER = { ',': 120, '.': 200 };

  const textNodes = [];
  const walker = document.createTreeWalker(headline, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  const charSpans = [];
  textNodes.forEach(textNode => {
    const frag = document.createDocumentFragment();
    Array.from(textNode.textContent).forEach(ch => {
      const span = document.createElement('span');
      span.className = 'tw-char';
      span.textContent = ch;
      span.setAttribute('aria-hidden', 'true');
      frag.appendChild(span);
      charSpans.push(span);
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });

  headline.setAttribute('aria-label', headline.textContent);

  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  headline.insertBefore(cursor, headline.firstChild);

  let started = false;

  function typeNext(i) {
    if (i >= charSpans.length) {
      cursor.remove();
      return;
    }
    const span = charSpans[i];
    span.classList.add('is-visible');
    span.insertAdjacentElement('afterend', cursor);
    const delay = BASE_DELAY + (PAUSE_AFTER[span.textContent] || 0);
    setTimeout(() => typeNext(i + 1), delay);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeNext(0);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(headline);
});

document.addEventListener('DOMContentLoaded', () => {
  const pillList = document.querySelector('.skills__list');
  if (!pillList) return;

  const isMobile = window.matchMedia('(max-width: 639px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isMobile || prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const pills = Array.from(pillList.querySelectorAll('.skill-pill'));
  if (!pills.length) return;

  const CHAR_DELAY = 28;
  const PILL_GAP = 150;

  // Same technique as the hero headline: characters are pre-split into spans
  // and only toggle opacity, so each pill's width is fixed from first paint
  // and typing never causes layout shift. Unlike the (block-level) hero
  // headline, .skill-pill is a flex row, so every char span must share one
  // wrapper element — otherwise each char becomes its own flex item and the
  // pill's flex `gap` gets applied between every letter instead of just
  // between the dot and the label.
  const pillCharSpans = pills.map(pill => {
    const label = pill.textContent.trim();
    pill.setAttribute('aria-label', label);

    const textNodes = [];
    const walker = document.createTreeWalker(pill, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    const charSpans = [];
    textNodes.forEach(textNode => {
      const wrapper = document.createElement('span');
      Array.from(textNode.textContent).forEach(ch => {
        const span = document.createElement('span');
        span.className = 'tw-char';
        span.textContent = ch;
        span.setAttribute('aria-hidden', 'true');
        wrapper.appendChild(span);
        charSpans.push(span);
      });
      textNode.parentNode.replaceChild(wrapper, textNode);
    });

    return charSpans;
  });

  function typePillChar(pillIndex, charIndex, cursor) {
    const charSpans = pillCharSpans[pillIndex];

    if (charIndex >= charSpans.length) {
      cursor.remove();
      const nextPill = pillIndex + 1;
      if (nextPill < pills.length) {
        setTimeout(() => startPill(nextPill), PILL_GAP);
      }
      return;
    }

    const span = charSpans[charIndex];
    span.classList.add('is-visible');
    span.insertAdjacentElement('afterend', cursor);
    setTimeout(() => typePillChar(pillIndex, charIndex + 1, cursor), CHAR_DELAY);
  }

  function startPill(pillIndex) {
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    pillCharSpans[pillIndex][0].insertAdjacentElement('beforebegin', cursor);
    typePillChar(pillIndex, 0, cursor);
  }

  let started = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(() => startPill(0), 250);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(pillList);
});

document.addEventListener('DOMContentLoaded', () => {
  const headline = document.querySelector('.hero__headline');
  if (!headline) return;

  const isMobile = window.matchMedia('(max-width: 639px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isMobile || prefersReducedMotion) return;

  const FADE_START = 100; // px from viewport top where the exit begins
  const FADE_DISTANCE = 140; // px of further scroll to reach full fade
  const MAX_TRANSLATE = 24; // px of upward drift at full fade

  headline.style.willChange = 'opacity, transform';

  let ticking = false;

  function updateExit() {
    ticking = false;
    const top = headline.getBoundingClientRect().top;
    const progress = Math.min(Math.max((FADE_START - top) / FADE_DISTANCE, 0), 1);
    headline.style.opacity = String(1 - progress);
    headline.style.transform = progress > 0 ? `translateY(${-progress * MAX_TRANSLATE}px)` : '';
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateExit);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateExit();
});

document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('.site-footer__clock');
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  function updateClock() {
    clock.textContent = `Lagos, Nigeria, ${formatter.format(new Date())} WAT`;
  }

  updateClock();
  setInterval(updateClock, 1000);
});
