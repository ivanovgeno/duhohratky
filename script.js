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
                num.textContent = '0';
                stats[0].querySelector('.stat-label').textContent = data.hero.stat1Label;
            }
            if (stats[1] && data.hero.stat2Number) {
                const num = stats[1].querySelector('.stat-number');
                const parsed = parseStatValue(data.hero.stat2Number);
                num.dataset.target = parsed.number;
                num.dataset.suffix = parsed.suffix;
                num.textContent = '0';
                stats[1].querySelector('.stat-label').textContent = data.hero.stat2Label;
            }
            if (stats[2] && data.hero.stat3Number) {
                const num = stats[2].querySelector('.stat-number');
                const parsed = parseStatValue(data.hero.stat3Number);
                num.dataset.target = parsed.number;
                num.dataset.suffix = parsed.suffix;
                num.textContent = '0';
                stats[2].querySelector('.stat-label').textContent = data.hero.stat3Label;
            }
            if (stats[3] && data.hero.stat4Number) {
                const num = stats[3].querySelector('.stat-number');
                const parsed = parseStatValue(data.hero.stat4Number);
                num.dataset.target = parsed.number;
                num.dataset.suffix = parsed.suffix;
                num.textContent = '0';
                stats[3].querySelector('.stat-label').textContent = data.hero.stat4Label;
            }

            // Buttons
            const heroButtons = document.querySelectorAll('.hero-buttons .btn');
            if (heroButtons[0]) {
                heroButtons[0].innerHTML = data.hero.btn1Text;
                heroButtons[0].href = data.hero.btn1Link;
            }
            if (heroButtons[1]) {
                heroButtons[1].innerHTML = data.hero.btn2Text;
                heroButtons[1].href = data.hero.btn2Link;
            }
        }

        // About Section
        if (data.about) {
            const aboutCards = document.querySelectorAll('.about-card');
            if (aboutCards[0]) {
                aboutCards[0].querySelector('.about-icon').textContent = data.about.card1Icon;
                aboutCards[0].querySelector('h3').textContent = data.about.card1Title;
                aboutCards[0].querySelector('p').textContent = data.about.card1Text;
            }
            if (aboutCards[1]) {
                aboutCards[1].querySelector('.about-icon').textContent = data.about.card2Icon;
                aboutCards[1].querySelector('h3').textContent = data.about.card2Title;
                aboutCards[1].querySelector('p').textContent = data.about.card2Text;
            }
            if (aboutCards[2]) {
                aboutCards[2].querySelector('.about-icon').textContent = data.about.card3Icon;
                aboutCards[2].querySelector('h3').textContent = data.about.card3Title;
                aboutCards[2].querySelector('p').textContent = data.about.card3Text;
            }
            if (aboutCards[3]) {
                aboutCards[3].querySelector('.about-icon').textContent = data.about.card4Icon;
                aboutCards[3].querySelector('h3').textContent = data.about.card4Title;
                aboutCards[3].querySelector('p').textContent = data.about.card4Text;
            }

            // Story
            const storyContent = document.querySelector('.story-content');
            if (storyContent) {
                storyContent.querySelector('h3').textContent = data.about.storyTitle;
                storyContent.querySelector('p').textContent = data.about.storyText;
            }
        }

        // Activities Section
        if (data.activities) {
            const actCards = document.querySelectorAll('.activity-card');
            for (let i = 1; i <= 6; i++) {
                if (actCards[i - 1]) {
                    actCards[i - 1].querySelector('.activity-icon').textContent = data.activities[`act${i}Icon`];
                    actCards[i - 1].querySelector('h3').textContent = data.activities[`act${i}Title`];
                    actCards[i - 1].querySelector('p').textContent = data.activities[`act${i}Text`];
                    actCards[i - 1].querySelector('.activity-age').textContent = data.activities[`act${i}Age`];
                    actCards[i - 1].dataset.color = data.activities[`act${i}Color`];
                }
            }
        }

        // Gallery Section
        if (data.gallery) {
            const galleryItems = document.querySelectorAll('.gallery-item');
            for (let i = 1; i <= 6; i++) {
                if (galleryItems[i - 1] && data.gallery[`img${i}Url`]) {
                    const placeholder = galleryItems[i - 1].querySelector('.gallery-placeholder');
                    if (placeholder && data.gallery[`img${i}Url`]) {
                        placeholder.innerHTML = `<img src="${data.gallery[`img${i}Url`]}" alt="${data.gallery[`img${i}Label`]}" style="width:100%;height:100%;object-fit:cover;">`;
                    }
                }
                if (galleryItems[i - 1]) {
                    galleryItems[i - 1].querySelector('.gallery-overlay span').textContent = data.gallery[`img${i}Label`];
                }
            }
        }

        // Contact Section
        if (data.contact) {
            const contactCards = document.querySelectorAll('.contact-card');
            if (contactCards[0]) {
                contactCards[0].querySelector('p').innerHTML = `${data.contact.address1}<br>${data.contact.address2}`;
            }
            if (contactCards[1]) {
                contactCards[1].querySelector('p').innerHTML = `<a href="tel:${data.contact.phone.replace(/\s/g, '')}">${data.contact.phone}</a>`;
            }
            if (contactCards[2]) {
                contactCards[2].querySelector('p').innerHTML = `<a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
            }
            if (contactCards[3]) {
                contactCards[3].querySelector('p').innerHTML = `${data.contact.hours1}<br>${data.contact.hours2}`;
            }

            // Social links
            const socialLinks = document.querySelectorAll('.social-link');
            if (socialLinks[0] && data.contact.facebook) socialLinks[0].href = data.contact.facebook;
            if (socialLinks[1] && data.contact.instagram) socialLinks[1].href = data.contact.instagram;
            if (socialLinks[2] && data.contact.youtube) socialLinks[2].href = data.contact.youtube;
        }

        // Reservio
        if (data.reservio && data.reservio.iframeUrl) {
            const placeholder = document.getElementById('reservio-placeholder');
            if (placeholder) {
                const embedContainer = placeholder.parentElement;
                placeholder.style.display = 'none';

                const iframe = document.createElement('iframe');
                iframe.src = data.reservio.iframeUrl;
                iframe.width = '100%';
                iframe.height = data.reservio.iframeHeight || 600;
                iframe.frameBorder = '0';
                iframe.title = 'Rezervace - Duhohratky';

                embedContainer.appendChild(iframe);
            }
        }

        if (data.reservio && data.reservio.phone) {
            const phoneLink = document.querySelector('.reservation-info .phone-link');
            if (phoneLink) {
                phoneLink.textContent = '📞 ' + data.reservio.phone;
                phoneLink.href = 'tel:' + data.reservio.phone.replace(/\s/g, '');
            }
        }

        // SEO Settings
        if (data.settings) {
            if (data.settings.seoTitle) document.title = data.settings.seoTitle;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && data.settings.seoDescription) metaDesc.content = data.settings.seoDescription;
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords && data.settings.seoKeywords) metaKeywords.content = data.settings.seoKeywords;
        }

        // Tips Preview Section
        if (data.tips) {
            const tipsPreview = document.querySelector('.tips-preview');
            if (tipsPreview) {
                // Update preview title and description
                const previewTitle = tipsPreview.querySelector('.section-title');
                if (previewTitle && data.tips.previewTitle) {
                    previewTitle.innerHTML = data.tips.previewTitle.replace(/(\S+)$/, '<span class="rainbow-text">$1</span>');
                }
                const previewDesc = tipsPreview.querySelector('.section-description');
                if (previewDesc && data.tips.previewDescription) {
                    previewDesc.textContent = data.tips.previewDescription;
                }

                // Update tip cards
                const tipCards = tipsPreview.querySelectorAll('.tip-card');
                for (let i = 1; i <= 3; i++) {
                    if (tipCards[i - 1]) {
                        const card = tipCards[i - 1];
                        const tipImage = card.querySelector('.tip-image');
                        if (tipImage && data.tips[`tip${i}Color`]) {
                            tipImage.style.background = data.tips[`tip${i}Color`];
                        }
                        const tipIcon = tipImage?.querySelector('span');
                        if (tipIcon && data.tips[`tip${i}Icon`]) {
                            tipIcon.textContent = data.tips[`tip${i}Icon`];
                        }
                        const tipTag = card.querySelector('.tip-tag');
                        if (tipTag && data.tips[`tip${i}Category`]) {
                            const categories = { sensory: 'Sensory Play', montessori: 'Montessori', creative: 'Kreativní' };
                            tipTag.textContent = categories[data.tips[`tip${i}Category`]] || data.tips[`tip${i}Category`];
                        }
                        const tipTitle = card.querySelector('h3');
                        if (tipTitle && data.tips[`tip${i}Title`]) {
                            tipTitle.textContent = data.tips[`tip${i}Title`];
                        }
                        const tipDesc = card.querySelector('.tip-content > p');
                        if (tipDesc && data.tips[`tip${i}Description`]) {
                            tipDesc.textContent = data.tips[`tip${i}Description`];
                        }
                        const tipMeta = card.querySelectorAll('.tip-meta span');
                        if (tipMeta[0] && data.tips[`tip${i}Time`]) {
                            tipMeta[0].textContent = '⏱️ ' + data.tips[`tip${i}Time`];
                        }
                        if (tipMeta[1] && data.tips[`tip${i}Age`]) {
                            tipMeta[1].textContent = '👶 ' + data.tips[`tip${i}Age`];
                        }
                    }
                }
            }
        }

    } catch (e) {
        console.error('Error loading content:', e);
    }
}

function updateText(selector, content) {
    const el = document.querySelector(selector);
    if (el && content) el.innerHTML = content;
}

// Parse stat value like "500+" into {number: 500, suffix: "+"}
function parseStatValue(value) {
    const str = String(value);
    const match = str.match(/^(\d+)(.*)$/);
    if (match) {
        return { number: parseInt(match[1]), suffix: match[2] || '' };
    }
    return { number: 0, suffix: str };
}

/* ====================================
   RESERVIO INTEGRATION
   ==================================== */
function initReservio() {
    // Reservio is loaded dynamically via loadContentFromAdmin
    // This function handles any additional Reservio-specific initialization
}

/* ====================================
   REALISTIC SOAP BUBBLES WITH POP
   ==================================== */
function initBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;

    // Color classes for different bubble colors
    const colorClasses = ['pink', 'coral', 'yellow', 'mint', 'blue', 'purple'];

    // Create bubbles (optimized for performance: 12 bubbles)
    for (let i = 0; i < 12; i++) {
        createBubble(container, colorClasses);
    }

    // Continuously create new bubbles to replace popped ones
    setInterval(() => {
        const bubbleCount = container.querySelectorAll('.bubble:not(.popping)').length;
        if (bubbleCount < 10) { // Optimized: max 10 bubbles
            createBubble(container, colorClasses);
        }
    }, 3000); // Slower interval for better performance
}

function createBubble(container, colorClasses) {
    const bubble = document.createElement('div');
    const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    // All bubbles have pop effect on hover
    bubble.className = `bubble ${colorClass} hover-pop`;

    // Varied sizes like real soap bubbles (20-100px)
    const size = Math.random() * 80 + 20;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.cursor = 'pointer'; // Force cursor pointer
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    // Handle the pop effect on hover for all bubbles
    let isPopping = false;
    bubble.addEventListener('mouseenter', () => {
        if (isPopping || bubble.classList.contains('popping')) return;
        isPopping = true;

        // Create splash effect at bubble position
        createBubbleSplash(bubble, container, colorClass);

        // Add popping class for animation
        bubble.classList.add('popping');

        // Wait for animation, then remove and create new
        setTimeout(() => {
            bubble.remove();
            createBubble(container, colorClasses);
        }, 350);
    });

    // Pop on click/touch
    bubble.addEventListener('click', (e) => {
        e.stopPropagation();
        popBubble(bubble, container, colorClasses);
    });

    bubble.addEventListener('touchstart', (e) => {
        e.preventDefault();
        popBubble(bubble, container, colorClasses);
    }, { passive: false });

    container.appendChild(bubble);
}

// Create splash particles when bubble pops
function createBubbleSplash(bubble, container, colorClass) {
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const bubbleSize = rect.width;

    // Color mapping for splash particles
    const colors = {
        pink: ['#E8A0A0', '#FFB6C1', '#FF69B4'],
        coral: ['#E5A88A', '#FFA07A', '#FF7F50'],
        yellow: ['#E8D080', '#FFE066', '#FFD700'],
        mint: ['#A8D8B8', '#98D8C8', '#7FD8BE'],
        blue: ['#A0C8D8', '#87CEEB', '#5BC0DE'],
        purple: ['#C8A8D0', '#DDA0DD', '#BA55D3']
    };

    const splashColors = colors[colorClass] || colors.pink;
    const particleCount = Math.min(Math.floor(bubbleSize / 12) + 3, 8); // Max 8 particles for performance

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bubble-splash-particle';

        // Random direction and distance
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const distance = bubbleSize * 0.5 + Math.random() * bubbleSize * 0.8;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        // Random particle size
        const particleSize = Math.random() * 8 + 4;

        // Random color from splash colors
        const color = splashColors[Math.floor(Math.random() * splashColors.length)];

        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${particleSize}px;
            height: ${particleSize}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 2000;
            box-shadow: 0 0 ${particleSize}px ${color};
            --end-x: ${endX}px;
            --end-y: ${endY}px;
            animation: bubble-splash 0.5s ease-out forwards;
        `;

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => particle.remove(), 500);
    }
}

function popBubble(bubble, container, colorClasses) {
    if (bubble.classList.contains('popping')) return;

    // Extract color class from bubble
    const colorClass = ['pink', 'coral', 'yellow', 'mint', 'blue', 'purple']
        .find(c => bubble.classList.contains(c)) || 'pink';

    // Create splash effect
    createBubbleSplash(bubble, container, colorClass);

    bubble.classList.add('popping');

    // Remove bubble after animation and create new one
    setTimeout(() => {
        bubble.remove();
        // Create a new bubble to replace the popped one
        createBubble(container, colorClasses);
    }, 350);
}

/* ====================================
   NAVIGATION
   ==================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ====================================
   SCROLL EFFECTS
   ==================================== */
function initScrollEffects() {
    // Add fade-in class to elements
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.about-card, .activity-card, .gallery-item, .contact-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animation for cards
                if (entry.target.classList.contains('about-card') ||
                    entry.target.classList.contains('activity-card') ||
                    entry.target.classList.contains('contact-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Add parallax effect to hero shapes
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/* ====================================
   RESERVATION FORM
   ==================================== */
function initReservationForm() {
    const form = document.getElementById('reservation-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            submitReservation(data);
        }
    });

    // Add input animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function validateForm(data) {
    const required = ['parent-name', 'child-name', 'child-age', 'activity', 'date', 'time', 'email', 'phone'];
    let isValid = true;

    required.forEach(field => {
        const input = document.getElementById(field);
        const value = data[field];

        if (!value || value.trim() === '') {
            isValid = false;
            input.classList.add('error');

            // Shake animation
            input.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        } else {
            input.classList.remove('error');
        }
    });

    // Email validation
    const email = data['email'];
    if (email && !isValidEmail(email)) {
        isValid = false;
        const emailInput = document.getElementById('email');
        emailInput.classList.add('error');
    }

    return isValid;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function submitReservation(data) {
    const submitBtn = document.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Odesílám...';

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        // Show success modal
        showModal();

        // Reset form
        document.getElementById('reservation-form').reset();

        // Log data (in real app, this would be sent to server)
        console.log('Reservation submitted:', data);
    }, 1500);
}

/* ====================================
   DATE PICKER
   ==================================== */
function initDatePicker() {
    const dateInput = document.getElementById('date');

    // Set min date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    dateInput.min = `${year}-${month}-${day}`;

    // Set max date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxYear = maxDate.getFullYear();
    const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDay = String(maxDate.getDate()).padStart(2, '0');

    dateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;
}

/* ====================================
   MODAL
   ==================================== */
function initModal() {
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-modal');

    closeBtn.addEventListener('click', () => {
        hideModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
}

function showModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add confetti effect
    createConfetti();
}

function hideModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ====================================
   CONFETTI EFFECT
   ==================================== */
function createConfetti() {
    const colors = ['#FFB6C1', '#FFA07A', '#FFE066', '#98D8C8', '#87CEEB', '#DDA0DD'];
    const modal = document.querySelector('.modal-content');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confetti-fall 1s ease-out forwards;
            animation-delay: ${Math.random() * 0.3}s;
            transform: translate(-50%, -50%);
        `;

        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 200;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;

        confetti.style.setProperty('--x', `${x}px`);
        confetti.style.setProperty('--y', `${y}px`);

        modal.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

// Add confetti animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: #FF6B6B !important;
        box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.2) !important;
    }
`;
document.head.appendChild(style);

/* ====================================
   GALLERY LIGHTBOX (Optional Enhancement)
   ==================================== */
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add pulse effect
        item.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            item.style.animation = '';
        }, 300);
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1.05); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1.05); }
    }
`;
document.head.appendChild(pulseStyle);

/* ====================================
   ACTIVITY CARDS INTERACTION
   ==================================== */
const activityCards = document.querySelectorAll('.activity-card');
activityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add sparkle effect
        const icon = card.querySelector('.activity-icon');
        icon.style.animation = 'bounce 0.5s ease';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.activity-icon');
        icon.style.animation = '';
    });
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(bounceStyle);
