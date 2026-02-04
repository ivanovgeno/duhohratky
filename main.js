
const SEASON_CONFIG = {
    SPRING: { theme: 'spring', startMonth: 2, endMonth: 4 }, // March - May
    SUMMER: { theme: 'summer', startMonth: 5, endMonth: 7 }, // June - August
    AUTUMN: { theme: 'autumn', startMonth: 8, endMonth: 10 }, // Sept - Nov
    WINTER: { theme: 'winter', startMonth: 11, endMonth: 1 }  // Dec - Feb
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    updateDynamicBadges();
    initBubbles(); // Start bubbles
});

function updateDynamicBadges() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cards = document.querySelectorAll('.lesson-card');

    cards.forEach(card => {
        const dateAttr = card.getAttribute('data-date'); // Expects YYYY-MM-DD
        if (!dateAttr) return;

        const lessonDate = new Date(dateAttr);
        lessonDate.setHours(0, 0, 0, 0);

        const diffTime = lessonDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let badgeText = '';
        let badgeClass = '';

        if (diffDays === 0) {
            badgeText = 'Dnes';
            badgeClass = 'badge-today';
        } else if (diffDays === 1) {
            badgeText = 'Zítra';
            badgeClass = 'badge-tomorrow';
        } else if (diffDays > 1 && diffDays < 7) {
            const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
            badgeText = days[lessonDate.getDay()];
            badgeClass = 'badge-upcoming';
        } else {
            // Default date format (e.g. 12. 10.)
            badgeText = `${lessonDate.getDate()}. ${lessonDate.getMonth() + 1}.`;
            badgeClass = 'badge-neutral';
        }

        // Find or create badge element
        let badge = card.querySelector('.dynamic-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'dynamic-badge';
            const badgeContainer = card.querySelector('.card-badges');
            if (badgeContainer) badgeContainer.prepend(badge);
        }

        badge.textContent = badgeText;
        badge.className = `dynamic-badge ${badgeClass}`;
    });
}

function formatCzechDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}. ${month}.`;
}

function formatCapacity(registered, capacity) {
    if (registered >= capacity) return 'Obsazeno';
    return `${registered}/${capacity}`;
}

function getDifficultyLabel(difficulty) {
    const map = {
        'beginner': 'Začátečník',
        'intermediate': 'Pokročilý',
        'advanced': 'Expert'
    };
    return map[difficulty] || difficulty;
}


/* ====================================
   FORMATTERS
   ==================================== */

function formatTime(time) {
    if (!time) return '';
    const [h, m] = time.split(':');
    return `${h}:${m}`;
}

function formatPrice(price) {
    return price ? `${price} Kč` : '0 Kč';
}

function formatTeacher(name) {
    return name || 'Neznámý lektor';
}

function parseDuration(durationStr) {
    // Example: "60 min" -> { number: 60, suffix: 'min' }
    const match = durationStr.match(/(\d+)\s*(\D+)/);
    if (!match) return { number: 0, suffix: '' };
    const num = parseInt(match[1], 10);
    const suffix = match[2];
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
        if (bubble.parentElement) bubble.remove();
    }, (duration + delay) * 1000);
}

function popBubble(e) {
    const bubble = e.target;
    if (bubble.classList.contains('popped')) return;

    bubble.classList.add('popped');

    // INSTANTLY HIDE BUBBLE to prevent ghost animations
    bubble.style.visibility = 'hidden';
    bubble.style.opacity = '0';
    bubble.style.pointerEvents = 'none';

    // Play sound (optional, muted for now)
    // const audio = new Audio('pop.mp3');
    // audio.play().catch(() => {});

    // Create Splash Particles
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    createSplash(centerX, centerY);

    setTimeout(() => {
        bubble.remove();
    }, 300);
}

function createSplash(startX, startY) {
    const container = document.getElementById('bubbles');
    if (!container) return;

    const dropletCount = 30;
    const droplets = [];

    // Create droplets
    for (let i = 0; i < dropletCount; i++) {
        const drop = document.createElement('div');
        drop.classList.add('droplet');

        // Random properties
        const size = Math.random() * 6 + 4; // 4-10px

        // Center the droplet on the burst origin
        // (Previously was just startX/Y, which made them top-left aligned)
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${startX - size / 2}px`;
        drop.style.top = `${startY - size / 2}px`;

        // Physics: Radial Burst
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4; // Uniform speed in all directions

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed; // Burst in all directions (not just up)

        container.appendChild(drop);

        droplets.push({ el: drop, x: startX - size / 2, y: startY - size / 2, vx, vy, alpha: 1 });
    }

    function animate() {
        let active = false;
        droplets.forEach(d => {
            if (d.alpha <= 0) return;

            d.x += d.vx;
            d.y += d.vy;
            d.vy += 0.9; // Gravity
            d.alpha -= 0.025; // Fade out

            d.el.style.left = `${d.x}px`;
            d.el.style.top = `${d.y}px`;
            d.el.style.opacity = d.alpha;

            if (d.alpha > 0) active = true;
            else if (d.el.parentElement) d.el.remove();
        });
        if (active) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
