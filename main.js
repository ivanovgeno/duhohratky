/* ====================================
   DUHOHRATKY - JavaScript
   Sensory Play & Montessori Website
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Load content from admin panel first
    loadContentFromAdmin();

    // Initialize all components
    initBubbles();
    initNavigation();
    initScrollEffects();
    initReservio();
    initCounterAnimation();
    updateDynamicBadges();
});

/* ====================================
   ANIMATED NUMBER COUNTER
   ==================================== */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const suffix = element.dataset.suffix || '';

        // Duration proportional to target - smaller numbers finish faster
        // 5 -> ~800ms, 8 -> ~800ms, 20 -> ~800ms, 500 -> ~2500ms
        const duration = Math.min(Math.max(target * 5, 800), 2500);
        const startTime = performance.now();

        // Easing function for smooth animation
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (!element.classList.contains('counted')) {
                    element.classList.add('counted');
                    // Start animation immediately - no delay
                    animateCounter(element);
                }
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

/* ====================================
   LOAD CONTENT FROM ADMIN PANEL
   ==================================== */
function loadContentFromAdmin() {
    const stored = localStorage.getItem('duhohratky_content');
    if (!stored) return;

    try {
        const data = JSON.parse(stored);

        // Hero Section
        if (data.hero) {
            updateText('.hero-badge', data.hero.badge);
            updateText('.hero-title', `${data.hero.title} <span class="rainbow-text">${data.hero.titleHighlight}</span>`);
            updateText('.hero-subtitle', data.hero.subtitle);
            updateText('.hero-description', data.hero.description);

            // Stats - update data-target for animation
            const stats = document.querySelectorAll('.stat');
            if (stats[0] && data.hero.stat1Number) {
                const num = stats[0].querySelector('.stat-number');
                const parsed = parseStatValue(data.hero.stat1Number);
                num.dataset.target = parsed.number;
                num.dataset.suffix = parsed.suffix;
                num.querySelector('.stat-label').textContent = data.hero.stat1Label;
            }
            // ... (other stats logic simplified for stability)
        }
    } catch (e) {
        console.warn('Failed to load admin content', e);
    }
}

function updateText(selector, html) {
    const el = document.querySelector(selector);
    if (el && html) el.innerHTML = html;
}

function parseStatValue(val) {
    if (!val) return { number: 0, suffix: '' };
    const num = parseInt(val.replace(/\D/g, ''));
    const suffix = val.replace(/[0-9]/g, '');
    return { number: num || 0, suffix: suffix || '' };
}

/* ====================================
   BUBBLE SYSTEM (ATOMIC)
   ==================================== */
function initBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;

    // Create bubbles less frequently to improve performance
    setInterval(() => {
        if (document.hidden) return;
        createBubble(container);
    }, 1200);
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Random properties
    const size = Math.random() * 60 + 30; // 30-90px
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 13; // 13-25s (15% faster than before)
    const delay = Math.random() * 5;
    const hue = Math.floor(Math.random() * 360); // Unique color shift

    // Apply styles
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 2px 5px rgba(255, 255, 255, 0.4))`;

    // Interaction
    bubble.addEventListener('click', popBubble);
    bubble.addEventListener('mouseover', popBubble);

    container.appendChild(bubble);

    // Cleanup
    setTimeout(() => {
        if (bubble.parentElement) {
            bubble.remove();
        }
    }, (duration + delay) * 1000);
}

function popBubble(e) {
    const bubble = e.target;
    if (bubble.classList.contains('popped')) return;

    bubble.classList.add('popped');

    // Play sound (optional, muted for now)
    // const audio = new Audio('pop.mp3');
    // audio.play().catch(() => {});

    setTimeout(() => {
        bubble.remove();
    }, 300);
}

/* ====================================
   NAVIGATION
   ==================================== */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ====================================
   SCROLL REVEAL
   ==================================== */
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ====================================
   RESERVIO INTEGRATION
   ====================================, */
function initReservio() {
    // Logic handled by iframe integration mainly
    // But we can check if admin provided a custom URL
}

/* ====================================
   DYNAMIC BADGES (FLEXIBLE)
   ==================================== */
function updateDynamicBadges() {
    // Select cards with either data-day-index or data-date
    const cards = document.querySelectorAll('.lesson-card[data-day-index], .lesson-card[data-date]');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    cards.forEach(card => {
        const badge = card.querySelector('.lesson-badge');
        if (!badge) return;

        let targetDate = new Date();
        let diffDays = 0;

        // 1. Try Specific Date (Priority)
        if (card.dataset.date) {
            targetDate = new Date(card.dataset.date);
            targetDate.setHours(0, 0, 0, 0);

            // Calculate difference in days
            const diffTime = targetDate.getTime() - today.getTime();
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        }
        // 2. Fallback to Day Index (Weekly schedule)
        else if (card.dataset.dayIndex) {
            const currentDayIndex = today.getDay(); // 0-6
            const targetDayIndex = parseInt(card.dataset.dayIndex);

            diffDays = targetDayIndex - currentDayIndex;
            if (diffDays < 0) diffDays += 7; // Next week

            targetDate.setDate(today.getDate() + diffDays);
        }

        // Generate Label & Color
        let label = '';
        let color = '';
        let animation = 'none';

        if (diffDays === 0) {
            label = 'DNES!';
            color = 'var(--gradient-rainbow)';
            animation = 'bounce-small 2s infinite, rainbow-shift 3s infinite linear';
        } else if (diffDays === 1) {
            label = 'ZÍTRA';
            color = 'var(--color-blue)';
        } else if (diffDays === 2) {
            label = 'POZÍTŘÍ';
            color = 'var(--color-green)';
        } else {
            // Format: 24.11.
            const d = targetDate.getDate();
            const m = targetDate.getMonth() + 1;
            label = `${d}.${m}.`;
            color = 'var(--color-gray-500)';
        }

        // Apply
        badge.textContent = label;
        badge.style.background = color;
        badge.style.animation = animation;
    });
}
