// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu
      document.querySelector('.nav-links')?.classList.remove('open');
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Scroll-based active nav link + fade-up animations
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let currentId = '';
  const scrollY = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY >= offset && scrollY < offset + height) {
      currentId = sec.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Fade-up intersection observer
const fadeEls = document.querySelectorAll('.fade-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}

// Cursor glow
const glow = document.querySelector('.cursor-glow');
if (glow) {
  window.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 90}px)`;
  });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// Counters
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const isPercent = String(target).includes('.');
    let current = 0;
    const duration = 1400;
    const startTime = performance.now();

    function update(ts) {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * progress;
      counter.textContent = isPercent
        ? value.toFixed(1) + '%'
        : Math.round(value) + '%';
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

if ('IntersectionObserver' in window) {
  const kpiObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          kpiObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const kpiSection = document.querySelector('.kpi-wrap');
  if (kpiSection) kpiObserver.observe(kpiSection);
} else {
  startCounters();
}

// Testimonials slider
const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

function updateSlider() {
  if (!track || cards.length === 0) return;
  const total = cards.length;
  currentSlide = ((currentSlide % total) + total) % total;
  const translateX = -currentSlide * (track.clientWidth / 3);
  track.style.transform = `translateX(${translateX}px)`;
}

if (prevBtn && nextBtn && track && cards.length) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  });

  // Auto play
  setInterval(() => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  }, 6000);

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

// AI widget toggle
const aiToggle = document.querySelector('.ai-toggle');
const aiPanel = document.querySelector('.ai-panel');
const aiClose = document.querySelector('.ai-close');

if (aiToggle && aiPanel) {
  aiToggle.addEventListener('click', () => {
    aiPanel.classList.toggle('open');
  });
}

if (aiClose && aiPanel) {
  aiClose.addEventListener('click', () => {
    aiPanel.classList.remove('open');
  });
}

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const updateCounter = () => {
      const target = +counter.dataset.target;
      const current = +counter.innerText.replace("%", "");

      const speed = 40; 
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment + "%";
        setTimeout(updateCounter, 40);
      } else {
        counter.innerText = target + "%";
      }
    };

    updateCounter();
  });
});
