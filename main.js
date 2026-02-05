
const SEASON_CONFIG = {
    SPRING: { theme: 'spring', startMonth: 2, endMonth: 4 }, // March - May
    SUMMER: { theme: 'summer', startMonth: 5, endMonth: 7 }, // June - August
    AUTUMN: { theme: 'autumn', startMonth: 8, endMonth: 10 }, // Sept - Nov
    WINTER: { theme: 'winter', startMonth: 11, endMonth: 1 }  // Dec - Feb
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadContent(); // Load dynamic content
    updateDynamicBadges();
    initBubbles(); // Start bubbles

    // Listen for changes from Admin panel (real-time update)
    window.addEventListener('storage', (e) => {
        if (e.key === 'duhohratky_content') {
            console.log('Content updated from another tab');
            loadContent();
        }
    });
});

async function loadContent() {
    let data;

    // 1. Try LocalStorage (Preview Mode)
    const localData = localStorage.getItem('duhohratky_content');
    if (localData) {
        try {
            data = JSON.parse(localData);
            console.log('Loaded content from LocalStorage (Preview Mode)');
        } catch (e) {
            console.error('Error parsing LocalStorage data', e);
        }
    }

    // 2. Try window.defaultContent (Production Mode / Fallback)
    if (!data && window.defaultContent) {
        data = window.defaultContent;
        console.log('Loaded content from content.js (Production Mode)');
    }

    // 3. Apply Data to DOM
    if (data) {
        applyContent(data);
    }
}

function applyContent(data) {
    const elements = document.querySelectorAll('[data-content]');

    elements.forEach(el => {
        const keyPath = el.dataset.content;
        const value = getValueByPath(data, keyPath);

        if (value === undefined || value === null) return;

        // Handle different element types
        if (el.tagName === 'IMG') {
            if (value) el.src = value;
        } else if (el.tagName === 'A') {
            // If it's a link, we might want to update href or text
            // For now, let's assume if it has data-content it updates text, 
            // unless we specify data-content-href
            if (el.dataset.contentHref) {
                const hrefValue = getValueByPath(data, el.dataset.contentHref);
                if (hrefValue) el.href = hrefValue;
            }
            if (!el.dataset.contentNoText) {
                el.innerText = value;
            }
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = value;
        } else {
            // Regular text elements
            el.innerHTML = value;
        }
    });

    // Special handling for specific sections if needed (like colors or background images)
    // Activities colors
    if (data.activities) {
        // We might want to loop through activities to set colors if they are dynamic
        // But for now the CSS classes handle colors based on HTML structure
        // If we want dynamic colors we need to apply style
        for (let i = 1; i <= 6; i++) {
            const color = data.activities[`act${i}Color`];
            const card = document.querySelector(`.activity-card:nth-child(${i})`);
            if (card && color) {
                card.dataset.color = color;
            }
        }
    }

    // Tips gradients
    if (data.tips) {
        for (let i = 1; i <= 3; i++) {
            const color = data.tips[`tip${i}Color`];
            const imgContainer = document.querySelector(`.tip-card[data-id="tip${i}"] .tip-image`);
            if (imgContainer && color) {
                imgContainer.style.background = color;
            }
        }
    }

    // Render Lessons Section
    if (data.lessons) {
        renderLessons(data.lessons);
    }
}

function renderLessons(lessonsData) {
    const container = document.getElementById('lessons-grid');
    if (!container) return;

    container.innerHTML = '';

    if (!lessonsData) return;

    // Iterate through fixed 5 slots
    for (let i = 1; i <= 5; i++) {
        const key = `lesson${i}`;
        const item = lessonsData[key];

        if (item && item.active) {
            const card = document.createElement('div');
            card.className = 'lesson-card glass-card';

            // Smart Date Logic
            let badgeHtml = '';
            let dateLabel = '';

            if (item.date) {
                // Parse date manually to avoid UTC conversion issues with "YYYY-MM-DD"
                const [y, m, d] = item.date.split('-').map(Number);
                const itemDate = new Date(y, m - 1, d); // Local midnight

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Diff in milliseconds
                const diffTime = itemDate - today;
                // Diff in days (round helpful for DST switches)
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                dateLabel = formatCzechDate(item.date);

                if (diffDays === 0) {
                    badgeHtml = '<span class="lesson-badge badge-today">Dnes</span>';
                } else if (diffDays === 1) {
                    badgeHtml = '<span class="lesson-badge badge-tomorrow">Zítra</span>';
                } else if (diffDays > 1 && diffDays < 7) {
                    const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
                    badgeHtml = `<span class="lesson-badge badge-upcoming">${days[itemDate.getDay()]}</span>`;
                } else {
                    // Standard date badge
                    badgeHtml = `<span class="lesson-badge badge-neutral">${dateLabel}</span>`;
                }
            }

            // Collect separate times
            const times = [];
            for (let t = 1; t <= 5; t++) {
                if (item[`time${t}`] && item[`time${t}`].trim() !== '') {
                    times.push(item[`time${t}`]);
                }
            }

            let timesHtml = '';
            if (times.length > 0) {
                timesHtml = `<div class="lesson-times">`;
                times.forEach(time => {
                    timesHtml += `<span class="time-badge">🕒 ${time}</span>`;
                });
                timesHtml += `</div>`;
            }

            // Status Tag Logic
            let statusHtml = '';
            if (item.tag === 'free_spots') {
                statusHtml = '<span style="display:inline-block; padding: 4px 12px; border-radius: 20px; background: #e8f5e9; color: #2e7d32; font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem;">✅ Volná místa</span>';
            } else if (item.tag === 'full') {
                statusHtml = '<span style="display:inline-block; padding: 4px 12px; border-radius: 20px; background: #ffebee; color: #c62828; font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem;">❌ Obsazeno</span>';
            } else if (item.tag === 'cancelled') {
                statusHtml = '<span style="display:inline-block; padding: 4px 12px; border-radius: 20px; background: #f5f5f5; color: #666; font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem;">⚠️ Zrušeno</span>';
            }

            card.innerHTML = `
                ${badgeHtml}
                <div class="card-content" style="padding-top: ${badgeHtml ? '1rem' : '1.5rem'}">
                    <div style="margin-bottom: 0.5rem;">
                        <span class="lesson-date" style="color: #888; font-size: 0.9rem; display: block; font-weight: bold;">${item.location || ''}</span>
                        ${item.address ? `<span style="display: block; font-size: 0.8rem; color: #aaa;">${item.address}</span>` : ''}
                    </div>
                    <h3 style="margin: 0.5rem 0;">${item.title || 'Bez názvu'}</h3>
                    ${timesHtml}
                    ${statusHtml}
                    <p style="margin-bottom: 1rem;">${item.description || ''}</p>
                    ${item.link ? `<a href="${item.link}" class="btn btn-secondary btn-small">Rezervovat</a>` : ''}
                </div>
            `;

            container.appendChild(card);
        }
    }
}

function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

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

    // Store Hue for Splash Color
    bubble.dataset.hue = hue;

    // Apply styles
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    // COLOR ENHANCEMENT (V46):
    // 1. Stronger HUE saturation (1.4 -> 1.5)
    // 2. Colored border to define edge
    // 3. Colored inner glow (box-shadow) to fill it with color
    bubble.style.border = `1px solid hsl(${hue}, 80%, 60%)`;
    bubble.style.boxShadow = `inset 0 0 15px hsl(${hue}, 80%, 65%), 0 5px 15px rgba(0,0,0,0.1)`;
    bubble.style.filter = `hue-rotate(${hue}deg) saturate(1.5) drop-shadow(0 2px 5px rgba(255, 255, 255, 0.4))`;

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

    // 1. CAPTURE COORDINATES FROM MOUSE (MOST RELIABLE)
    let centerX, centerY;

    if (e.clientX !== undefined && e.clientY !== undefined && e.clientX !== 0 && e.clientY !== 0) {
        centerX = e.clientX;
        centerY = e.clientY;
    } else {
        const rect = bubble.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
    }

    // Capture Hue for Splash
    const hue = parseInt(bubble.dataset.hue || '0');

    // 2. Hide Bubble Layout
    bubble.classList.add('popped');
    bubble.style.visibility = 'hidden';
    bubble.style.opacity = '0';
    bubble.style.pointerEvents = 'none';

    // 3. Create Splash
    createSplash(centerX, centerY, hue);

    // 4. Remove element later
    setTimeout(() => {
        bubble.remove();
    }, 300);
}

function createSplash(startX, startY, parentHue) {
    const container = document.getElementById('bubbles');
    if (!container) return;

    const dropletCount = 12;
    const droplets = [];

    // Create droplets
    for (let i = 0; i < dropletCount; i++) {
        const drop = document.createElement('div');
        drop.classList.add('droplet');

        // Random properties
        const size = Math.random() * 3 + 2; // 2-5px

        // Offset
        const randomOffsetX = (Math.random() - 0.5) * 20;
        const randomOffsetY = (Math.random() - 0.5) * 20;

        // Position
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${startX + randomOffsetX - size / 2}px`;
        drop.style.top = `${startY + randomOffsetY - size / 2}px`;

        // COLOR: Match parent bubble hue - VIVID MATCH
        // Using 90% sat and 60% lightness for strong, clean color
        drop.style.backgroundColor = `hsl(${parentHue}, 90%, 60%)`;
        drop.style.boxShadow = `0 0 6px hsl(${parentHue}, 90%, 50%)`; // Glow

        // Physics
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        container.appendChild(drop);

        droplets.push({ el: drop, x: startX + randomOffsetX - size / 2, y: startY + randomOffsetY - size / 2, vx, vy, alpha: 1 });
    }

    function animate() {
        let active = false;
        droplets.forEach(d => {
            if (d.alpha <= 0) return;

            d.x += d.vx;
            d.y += d.vy;
            d.vy += 0.6; // Gravity
            d.alpha -= 0.03; // Fade out

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
