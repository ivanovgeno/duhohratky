
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
    initLightbox(); // Initialize lightbox (v45)

    // Listen for changes from Admin panel (real-time update)
    window.addEventListener('storage', (e) => {
        if (e.key === 'duhohratky_content') {
            console.log('Content updated from another tab');
            loadContent();
        }
    });
});

async function loadContent() {
    console.log('--- Loading Content ---');
    let data;

    // 1. Try LocalStorage (Preview Mode)
    try {
        const localData = localStorage.getItem('duhohratky_content');
        if (localData) {
            data = JSON.parse(localData);
            data.fromLocalStorage = true;
            console.log('Loaded from LocalStorage');
        }
    } catch (e) {
        console.warn('LocalStorage access failed', e);
    }

    // 2. Base content from window.defaultContent
    const baseContent = window.defaultContent || {};

    // 3. Merge if data exists, otherwise use base
    if (data) {

        data = deepMerge(baseContent, data);
    } else {
        data = baseContent;
    }

    // 4. Final safety check
    if (!data || Object.keys(data).length === 0) {
        console.error('No content found anywhere!');
        return;
    }

    // Legacy LocalStorage cleanup done — no longer needed

    // MIGRATION: Ensure gallery is ALWAYS an array
    if (!Array.isArray(data.gallery)) {
        console.warn('Main.js: Gallery is not an array (was ' + typeof data.gallery + '). Resetting to [].');
        data.gallery = [];
    }

    // 5. Apply to DOM
    try {
        applyContent(data);
    } catch (e) {
        console.error('Failed to apply content', e);
    }
}

function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    if (!target || typeof target !== 'object') return source;

    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
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
                // Preserve child elements (e.g. emoji <span>) — only update the text node
                const childSpan = el.querySelector('span');
                if (childSpan) {
                    // Find the last text node after the span and update it
                    let textNode = null;
                    for (let i = el.childNodes.length - 1; i >= 0; i--) {
                        if (el.childNodes[i].nodeType === Node.TEXT_NODE && el.childNodes[i].textContent.trim()) {
                            textNode = el.childNodes[i];
                            break;
                        }
                    }
                    if (textNode) {
                        textNode.textContent = ' ' + value;
                    } else {
                        el.appendChild(document.createTextNode(' ' + value));
                    }
                } else {
                    el.innerText = value;
                }
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

    // Render Upcoming Themes Section
    try {
        const upcomingSection = document.getElementById('upcoming');
        console.log('Rendering upcoming. Visible:', data.upcoming?.visible);
        if (data.upcoming && data.upcoming.visible !== false) {
            if (upcomingSection) upcomingSection.style.display = 'block';
            renderUpcomingThemes(data.upcoming);
        } else {
            console.log('Hiding upcoming section');
            if (upcomingSection) upcomingSection.style.display = 'none';
        }
    } catch (e) {
        console.error('Error rendering upcoming themes:', e);
    }

    // Render Lessons Section
    try {
        if (data.lessons) {
            renderLessons(data.lessons);
        }
    } catch (e) {
        console.error('Error rendering lessons:', e);
    }

    // Render Gallery Page
    try {
        if (data.gallery) {
            renderGalleryPage(data.gallery);
        }
    } catch (e) {
        console.error('Error rendering gallery:', e);
    }
}

function renderUpcomingThemes(upcomingData) {
    const container = document.getElementById('upcoming-themes-grid');
    if (!container) return;

    container.innerHTML = '';
    if (!upcomingData || !upcomingData.items) return;

    // Ensure items is an array (handle corrupt LocalStorage data)
    let items = upcomingData.items;
    if (!Array.isArray(items)) {
        items = Object.values(items);
    }

    items.forEach(item => {
        // Skip inactive items
        if (item.active === false) return;

        const themeCard = document.createElement('div');
        themeCard.className = 'upcoming-card glass-card';
        themeCard.innerHTML = `
            <div class="upcoming-icon">${item.icon || '✨'}</div>
            <div class="upcoming-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        container.appendChild(themeCard);
    });
}

function renderGalleryPage(galleryData) {
    const container = document.querySelector('.gallery-grid-large');
    if (!container) return;

    // 1. Check if we have dynamic data (from LocalStorage or content.js)
    if (galleryData && galleryData.length > 0) {
        console.log('Rendering Dynamic Gallery (count: ' + galleryData.length + ')');
        container.innerHTML = ''; // Clear static placeholders

        // Render items
        galleryData.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item-large';
            item.dataset.category = img.category;
            item.style.animation = 'fadeIn 0.5s ease';

            // Handle timestamp for caching
            const src = img.src.startsWith('http') ? img.src : img.src + '?t=' + (img.timestamp || Date.now());

            item.innerHTML = `
                <div class="gallery-image-container">
                     <img src="${src}" alt="${img.category}" loading="lazy">
                </div>
                <div class="gallery-overlay">
                    <span class="badge ${img.category}">${getCategoryLabel(img.category)}</span>
                    ${img.description ? `<h3>${img.description}</h3>` : ''}
                </div>
            `;
            container.appendChild(item);
        });

        // Initialize pagination for these newly created items
        initGalleryPagination();
    } else {
        // 2. CHECK LOCAL STORAGE FALLBACK (For Admin users who lost server data)
        const localContent = localStorage.getItem('duhohratky_content');
        if (localContent) {
            try {
                const parsedLocal = JSON.parse(localContent);
                if (parsedLocal.gallery && parsedLocal.gallery.length > 0) {
                    console.log('Rendering LocalStorage Gallery (Recovery Mode, count: ' + parsedLocal.gallery.length + ')');
                    container.innerHTML = '';

                    parsedLocal.gallery.forEach(img => {
                        const item = document.createElement('div');
                        item.className = 'gallery-item-large';
                        item.dataset.category = img.category;
                        item.style.animation = 'fadeIn 0.5s ease';

                        const src = img.src.startsWith('http') ? img.src : img.src + '?t=' + (img.timestamp || Date.now());

                        item.innerHTML = `
                            <div class="gallery-image-container">
                                <img src="${src}" alt="${img.category}" loading="lazy">
                            </div>
                            <div class="gallery-overlay">
                                <span class="badge ${img.category}">${getCategoryLabel(img.category)}</span>
                                ${img.description ? `<h3>${img.description}</h3>` : ''}
                            </div>
                        `;
                        container.appendChild(item);
                    });

                    initGalleryPagination();
                    return; // Exit, success
                }
            } catch (e) {
                console.error('Local storage parse error:', e);
            }
        }

        // 3. Fallback to Static HTML (if no dynamic data anywhere)
        console.log('Rendering Static Gallery (fallback)');
        initGalleryPagination();
    }
}

function getCategoryLabel(cat) {
    const map = {
        'sensory': 'Sensory Play',
        'montessori': 'Montessori',
        'creative': 'Kreativní',
        'party': 'Oslavy'
    };
    return map[cat] || cat;
}

let galleryPaginationState = {
    itemsPerPage: 12,
    currentPage: 1,
    currentFilter: 'all'
};

function initGalleryPagination() {
    const items = document.querySelectorAll('.gallery-item-large');
    const loadMoreBtn = document.getElementById('gallery-load-more-btn');
    const loadMoreContainer = document.getElementById('gallery-load-more-container');

    if (items.length === 0) return;

    // Initial Filter Setup
    initGalleryFilters();

    // Show first batch
    updateGalleryVisibility();

    // Load More Listener
    if (loadMoreBtn) {
        // Clone to remove old listeners
        const newBtn = loadMoreBtn.cloneNode(true);
        loadMoreBtn.parentNode.replaceChild(newBtn, loadMoreBtn);

        newBtn.addEventListener('click', () => {
            galleryPaginationState.currentPage++;
            updateGalleryVisibility();
        });
    }
}

function updateGalleryVisibility() {
    const items = document.querySelectorAll('.gallery-item-large');
    const loadMoreContainer = document.getElementById('gallery-load-more-container');

    let visibleCount = 0;
    let totalInFilter = 0;
    const limit = galleryPaginationState.currentPage * galleryPaginationState.itemsPerPage;

    items.forEach(item => {
        const category = item.dataset.category;
        const matchesFilter = galleryPaginationState.currentFilter === 'all' || category === galleryPaginationState.currentFilter;

        if (matchesFilter) {
            totalInFilter++;
            if (visibleCount < limit) {
                item.classList.remove('gallery-item-hidden');
                item.style.display = 'block'; // Ensure it's visible if it was hidden by filter
                item.style.animation = 'fadeIn 0.5s ease backwards';
                // Stagger only new items technically, but resetting animation is fine
                visibleCount++;
            } else {
                item.classList.add('gallery-item-hidden');
                item.style.display = 'none'; // Ensure hidden
            }
        } else {
            item.classList.add('gallery-item-hidden');
            item.style.display = 'none';
        }
    });

    // Update Button Visibility
    if (loadMoreContainer) {
        if (visibleCount < totalInFilter) {
            loadMoreContainer.style.display = 'block';
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
}

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            // Update active visually
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Reset pagination
            galleryPaginationState.currentFilter = btn.dataset.filter;
            galleryPaginationState.currentPage = 1;

            updateGalleryVisibility();
        };
    });
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
                    // Use generic style (monochrome) but keep specific label
                    badgeHtml = `<span class="lesson-badge badge-date">${days[itemDate.getDay()]}</span>`;
                } else {
                    // Standard date badge (monochrome)
                    badgeHtml = `<span class="lesson-badge badge-date">${dateLabel}</span>`;
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
            // Status Logic (Moved to Top Badge)
            let statusBadgeHtml = '';
            if (item.tag === 'free_spots') {
                statusBadgeHtml = `<span class="lesson-badge badge-free" style="right: 20px; left: auto;">✅ Volná místa</span>`;
            } else if (item.tag === 'full') {
                statusBadgeHtml = `<span class="lesson-badge badge-full" style="right: 20px; left: auto;">❌ Obsazeno</span>`;
            } else if (item.tag === 'cancelled') {
                statusBadgeHtml = `<span class="lesson-badge badge-cancelled" style="right: 20px; left: auto;">⚠️ Zrušeno</span>`;
            }

            // Adjust date badge to LEFT side
            if (badgeHtml) {
                // Safer replacement that doesn't break classes
                badgeHtml = badgeHtml.replace('<span ', '<span style="left: 20px; right: auto;" ');
            }

            card.innerHTML = `
                ${badgeHtml}
                ${statusBadgeHtml}
                <div class="card-content" style="padding-top: ${(badgeHtml || statusBadgeHtml) ? '1.5rem' : '1.5rem'}">
                    <div style="margin-bottom: 0.5rem;">
                        <span class="location-badge">📍 ${item.location || ''}</span>
                        ${item.address ? `<span style="display: block; font-size: 0.8rem; color: #aaa; margin-top: 4px; margin-left: 4px;">${item.address}</span>` : ''}
                    </div>
                    <h3 style="margin: 0.5rem 0;">${item.title || 'Bez názvu'}</h3>
                    ${timesHtml}
                    ${item.price ? `<div style="margin-bottom: 0.5rem; font-weight: bold; color: #444; background: rgba(0,0,0,0.03); padding: 4px 10px; border-radius: 4px; display: inline-block;">💰 ${item.price}</div>` : ''}
                    <p style="margin-bottom: 1rem;">${item.description || ''}</p>
                    ${item.link ? `<a href="${item.link}" class="btn btn-cta" style="width: 100%; text-align: center; margin-top: 0.5rem; justify-content: center;">Rezervovat</a>` : ''}
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

/* ====================================
   LIGHTBOX LOGIC (Added v45)
   ==================================== */
function initLightbox() {
    // 1. Create DOM Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Full Screen Image">
        <div class="lightbox-caption"></div>
    `;

    document.body.appendChild(lightbox);

    // 2. Event Listeners
    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target !== img) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // 3. Delegate Click on Gallery Items
    // Use event delegation on document or a specific container to handle dynamic items
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item-large');
        if (item) {
            const thumb = item.querySelector('img');
            if (thumb) {
                // Get high-res src (remove cache bust query for cleaner URL, or keep it)
                // Actually, keep it to ensure we get the right image
                const fullSrc = thumb.src;
                const caption = item.querySelector('h3')?.textContent || '';
                openLightbox(fullSrc, caption);
            }
        }
    });
}

function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('img');
    const captionEl = lightbox.querySelector('.lightbox-caption');

    img.src = src;
    captionEl.textContent = caption;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling

    // Cleanup src after transition to prevent "flash" of old image next time
    setTimeout(() => {
        const img = lightbox.querySelector('img');
        if (img) img.src = '';
    }, 300);
}
