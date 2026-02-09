/* ====================================
   ADMIN PANEL - JavaScript
   Duhohratky Content Management
   ==================================== */

// Default content data
const defaultData = {
    // Credentials
    credentials: {
        email: 'admin@duhohratky.cz',
        password: 'admin123'
    },

    // Hero Section
    hero: {
        badge: '✨ Kreativita & Rozvoj',
        title: 'Vítejte v',
        titleHighlight: 'Duhohrátkách',
        subtitle: 'Sensory play & Montessori aktivity pro rozvoj vašich dětí',
        description: 'Objevte svět hravého učení, kde se děti rozvíjejí prostřednictvím smyslových her, kreativních činností a Montessori přístupu v bezpečném a inspirujícím prostředí.',
        stat1Number: '500+',
        stat1Label: 'Šťastných dětí',
        stat2Number: '20+',
        stat2Label: 'Typů aktivit',
        stat3Number: '5⭐',
        stat3Label: 'Hodnocení',
        btn1Text: '📅 Rezervovat termín',
        btn1Link: '#reservation',
        btn2Text: '🎨 Prozkoumat aktivity',
        btn2Link: '#activities'
    },

    // About Section
    about: {
        title: 'Co jsou Duhohratky?',
        card1Icon: '🎨',
        card1Title: 'Sensory Play',
        card1Text: 'Smyslové hry, které rozvíjejí hmat, čich, zrak i sluch. Děti objevují textury, barvy a zvuky v bezpečném prostředí.',
        card2Icon: '📚',
        card2Title: 'Montessori přístup',
        card2Text: 'Respektujeme individualitu každého dítěte. Učíme se hrou, pozorováním a vlastním tempem objevování světa.',
        card3Icon: '🧠',
        card3Title: 'Rozvoj dovedností',
        card3Text: 'Podpora jemné motoriky, koordinace, koncentrace a kreativního myšlení prostřednictvím zábavných aktivit.',
        card4Icon: '💕',
        card4Title: 'Bezpečné prostředí',
        card4Text: 'Všechny materiály jsou bezpečné a netoxické. Prostory jsou přizpůsobené potřebám malých objevitelů.',
        storyTitle: 'Náš příběh',
        storyText: 'Duhohratky vznikly z lásky k dětem a touhy vytvořit prostor, kde se mohou svobodně rozvíjet. Věříme, že každé dítě je jedinečné a zaslouží si objevovat svět vlastním způsobem. Naše aktivity jsou navrženy tak, aby podporovaly přirozenou zvídavost a kreativitu dětí.'
    },

    // Activities Section
    activities: {
        title: 'Co u nás zažijete?',
        description: 'Nabízíme širokou škálu aktivit pro děti všech věkových kategorií',
        act1Icon: '🫧',
        act1Color: 'pink',
        act1Title: 'Sensory Boxy',
        act1Text: 'Tematické boxy plné různých textur, materiálů a překvapení na prozkoumání.',
        act1Age: '2-6 let',
        act2Icon: '🎨',
        act2Color: 'orange',
        act2Title: 'Kreativní tvoření',
        act2Text: 'Malování, modelování, koláže a další výtvarné techniky pro malé umělce.',
        act2Age: '3-8 let',
        act3Icon: '💧',
        act3Color: 'yellow',
        act3Title: 'Vodní hrátky',
        act3Text: 'Experimenty s vodou, přeléváním a objevování zákonitostí tekutin.',
        act3Age: '1-5 let',
        act4Icon: '🌱',
        act4Color: 'green',
        act4Title: 'Přírodní materiály',
        act4Text: 'Práce s pískem, kamínky, listy a dalšími přírodninami.',
        act4Age: '2-7 let',
        act5Icon: '🧩',
        act5Color: 'blue',
        act5Title: 'Montessori pomůcky',
        act5Text: 'Vzdělávací materiály pro rozvoj logiky, matematiky a jazyka.',
        act5Age: '3-8 let',
        act6Icon: '🎂',
        act6Color: 'purple',
        act6Title: 'Narozeninové oslavy',
        act6Text: 'Nezapomenutelné narozeniny plné her, tvoření a zábavy.',
        act6Age: '1-10 let'
    },

    // Gallery Section
    galleryTitle: 'Nahlédněte do našeho světa',
    gallery: [], // Now an array for dynamic images


    // Contact Section
    contact: {
        title: 'Kde nás najdete?',
        address1: 'Duhová 123',
        address2: 'Praha 1, 110 00',
        phone: '+420 123 456 789',
        email: 'info@duhohratky.cz',
        hours1: 'Po-Pá: 9:00 - 18:00',
        hours2: 'So: 9:00 - 14:00',
        facebook: '',
        instagram: '',
        youtube: ''
    },

    // Tips Section
    tips: {
        previewTitle: 'Inspirace pro domácí tvoření',
        previewDescription: 'Vyzkoušejte naše oblíbené aktivity i doma',
        tip1Icon: '🍚',
        tip1Category: 'sensory',
        tip1Title: 'Barevná rýže',
        tip1Description: 'Jednoduchý návod na výrobu barevné senzorické rýže.',
        tip1Time: '15 min',
        tip1Age: '1+ rok',
        tip1Color: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
        tip2Icon: '🥄',
        tip2Category: 'montessori',
        tip2Title: 'Přesýpání a přelévání',
        tip2Description: 'Aktivita pro rozvoj jemné motoriky.',
        tip2Time: '10 min',
        tip2Age: '18m+',
        tip2Color: 'linear-gradient(135deg, #FFE066, #FFD700)',
        tip3Icon: '🍂',
        tip3Category: 'creative',
        tip3Title: 'Otisk listů',
        tip3Description: 'Krásné otisky pomocí barev a listů.',
        tip3Time: '20 min',
        tip3Age: '2+ roky',
        tip3Color: 'linear-gradient(135deg, #90EE90, #32CD32)'
    },

    // Reservio
    reservio: {
        iframeUrl: 'https://duhohratky.reservio.com',
        iframeHeight: 600,
        phone: '+420 123 456 789'
    },

    // Upcoming Themes
    upcoming: {
        title: 'Připravujeme další témata',
        description: 'Na jaké další lekce se můžete v nejbližší době těšit?',
        visible: true,
        items: [
            { active: true, icon: '🐣', title: 'Téma 1', description: 'Popis tématu 1' },
            { active: true, icon: '🚒', title: 'Téma 2', description: 'Popis tématu 2' },
            { active: true, icon: '🦕', title: 'Téma 3', description: 'Popis tématu 3' }
        ]
    },

    // Lessons
    lessons: {
        title: 'Aktuální <span class="rainbow-text">lekce</span>',
        lesson1: { active: true, title: 'Lekce 1', location: 'Hradec Králové', date: '', tag: 'free_spots' },
        lesson2: { active: true, title: 'Lekce 2', location: 'Hradec Králové', date: '', tag: 'free_spots' },
        lesson3: { active: true, title: 'Lekce 3', location: 'Hradec Králové', date: '', tag: 'free_spots' },
        lesson4: { active: false, title: '', location: '', date: '', tag: 'free_spots' },
        lesson5: { active: false, title: '', location: '', date: '', tag: 'free_spots' }
    },

    // Settings
    settings: {
        email: 'admin@duhohratky.cz',
        seoTitle: 'Duhohratky | Sensory Play & Montessori pro děti',
        seoDescription: 'Duhohratky - kreativní sensory play a Montessori aktivity pro děti. Rozvoj smyslů, motoriky a kreativity v bezpečném prostředí.',
        seoKeywords: 'sensory play, Montessori, děti, hry, rozvoj, kreativita, Duhohratky'
    }
};

// Current data (loaded from localStorage or default)
let siteData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initLogin();
    initNavigation();
    initFormHandlers();
    initButtons();
    populateFields();
    loadCredentials();
    loadGallery(); // Initialize gallery
});

/* ====================================
   GALLERY MANAGEMENT
   ==================================== */

function loadGallery() {
    const list = document.getElementById('gallery-list');
    if (!list) return;

    list.innerHTML = '';
    const gallery = siteData.gallery || [];

    if (gallery.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Zatím žádné nahrané fotky. Nahrajte první!</p>';
        return;
    }

    gallery.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-admin-item';
        // Add timestamp to prevent caching issues immediately after upload
        const src = img.src + '?t=' + (img.timestamp || Date.now());

        div.innerHTML = `
            <div class="gallery-preview" style="background-image: url('${src}')"></div>
            <div class="gallery-meta">
                <span class="badge ${img.category}">${img.category}</span>
                ${img.description ? `<span class="badge" style="background:#eee; color:#333; margin-left:5px;">${img.description}</span>` : ''}
                <button class="btn-delete" onclick="deleteGalleryImage(${index})" title="Smazat">🗑️</button>
            </div>
        `;
        list.appendChild(div);
    });
}

async function uploadGalleryImage() {
    const input = document.getElementById('gallery-upload');
    const categorySelect = document.getElementById('gallery-category');
    const descriptionInput = document.getElementById('gallery-description');
    const status = document.getElementById('upload-status');
    const btn = document.querySelector('button[onclick="uploadGalleryImage()"]');

    if (!input.files || input.files.length === 0) {
        alert("Vyberte prosím alespoň jeden obrázek.");
        return;
    }

    // UX
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Nahrávám...';
    btn.disabled = true;
    status.className = 'status-loading';
    status.innerHTML = '⏳ Spouštím nahrávání...';

    let successCount = 0;
    let failCount = 0;

    // Iterate through all selected files
    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        status.innerHTML = `⏳ Nahrávám ${i + 1}/${input.files.length}: ${file.name}...`;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('upload.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Update data model
                // SAFETY CHECK: Ensure gallery is an array
                if (!siteData.gallery || !Array.isArray(siteData.gallery)) {
                    console.warn('Resetting gallery data structure to array.');
                    siteData.gallery = [];
                }
                siteData.gallery.push({
                    src: result.path,
                    category: categorySelect.value,
                    description: descriptionInput.value || '', // Save description
                    timestamp: Date.now()
                });
                console.log('✅ Image added to local state:', siteData.gallery[siteData.gallery.length - 1]);
                successCount++;
            } else {
                console.error(`Error uploading ${file.name}: ${result.message}`);
                failCount++;
            }
        } catch (e) {
            console.error(`Error uploading ${file.name}:`, e);
            failCount++;
        }
    }

    // Finished
    console.log('💾 Saving updated gallery to server...', siteData.gallery);
    await saveData(); // Save content.js (await to ensure completion)
    loadGallery(); // Refresh UI

    if (failCount === 0) {
        status.innerHTML = `✅ Nahráno úspěšně (${successCount} souborů)!`;
        status.className = 'status-success';
        input.value = ''; // Reset file input
        descriptionInput.value = ''; // Reset description (optional, but good for next batch)
    } else {
        status.innerHTML = `⚠️ Dokončeno: ${successCount} nahráno, ${failCount} chyb.`;
        status.className = 'status-warning';
    }

    setTimeout(() => {
        if (status.className.includes('status-success')) {
            status.innerHTML = '';
            status.className = '';
        }
    }, 5000);

    btn.innerHTML = originalText;
    btn.disabled = false;
}

async function deleteGalleryImage(index) {
    if (!confirm('Opravdu chcete tento obrázek smazat? Tato akce je nevratná.')) return;

    const img = siteData.gallery[index];
    const filename = img.src.split('/').pop(); // Extract filename

    try {
        // 1. Delete from server
        const response = await fetch('delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: filename })
        });

        const result = await response.json();

        // 2. If deleted (or not found), remove from data
        if (result.status === 'success' || result.message === 'File not found') {
            siteData.gallery.splice(index, 1);
            saveData(); // Sync with content.js
            loadGallery(); // Update UI
        } else {
            alert('Chyba při mazání souboru: ' + result.message);
        }

    } catch (e) {
        console.error(e);
        alert('Chyba komunikace se serverem.');
    }
}
async function loadData() {
    try {
        // 1. Fetch content.js with a unique timestamp to bypass cache
        const response = await fetch('content.js?t=' + Date.now());
        if (response.ok) {
            const text = await response.text();
            // Extract the JSON object from the string "window.defaultContent = { ... };"
            const jsonMatch = text.match(/window\.defaultContent\s*=\s*(\{[\s\S]*\});/);
            if (jsonMatch && jsonMatch[1]) {
                const serverData = JSON.parse(jsonMatch[1]);
                console.log('✅ Loaded fresh data from server (content.js)');

                // Merge with defaultData to ensure structure
                siteData = deepMerge(defaultData, serverData);
                showToast('Načtena aktuální data ze serveru ☁️', 'success');
            } else {
                throw new Error('Could not parse content.js format');
            }
        } else {
            throw new Error('Fetch failed');
        }
    } catch (e) {
        console.warn('⚠️ Could not fetch fresh content.js, falling back to cached script.', e);
        // Fallback to the script tag data
        siteData = deepMerge(defaultData, window.defaultContent || {});
    }

    // MIGRATION: Fix legacy gallery structure (Object -> Array)
    if (siteData.gallery && !Array.isArray(siteData.gallery)) {
        console.warn('Migrating legacy gallery structure to array.');
        siteData.gallery = [];
    }

    populateFields();
    renderGallery(); // Render gallery list
    renderUpcomingThemesList(); // Render upcoming list
    renderLessonsList(); // Render lessons list (5 boxes)
}

function saveData() {
    localStorage.setItem('duhohratky_data', JSON.stringify(siteData));

    // Also save to a format that index.html can read (for preview)
    localStorage.setItem('duhohratky_content', JSON.stringify(siteData));

    // Save to Server (PHP)
    saveToPHP();
}

async function saveToPHP() {
    const saveBtn = document.getElementById('save-btn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '⏳ Ukládám...';
    saveBtn.disabled = true;

    try {
        console.log('📤 Sending data to save.php:', siteData);
        const response = await fetch('save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(siteData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
            showToast('✅ Změny byly uloženy na server!', 'success');
        } else {
            throw new Error(result.message || 'Neznámá chyba při ukládání');
        }

    } catch (e) {
        console.error('Save failed:', e);
        showToast(`❌ Chyba při ukládání: ${e.message}`, 'error');
        alert(`❌ Nepodařilo se uložit data na server.\n\nChyba: ${e.message}\n\nZkontrolujte připojení k internetu nebo kontaktujte správce.`);
    } finally {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }
}

function resetData() {
    if (confirm('Opravdu chcete resetovat všechna nastavení na výchozí hodnoty?')) {
        siteData = JSON.parse(JSON.stringify(defaultData));
        saveData();
        populateFields();
        showToast('Nastavení bylo resetováno', 'success');
    }
}

function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            // If target has this key and it is an array (but source is object), we should probably respect source (if it's not legacy garbage)
            // But for our specific case: default is array, source might be legacy object.
            // If target[key] is array and source[key] is object, we should KEEP target (empty array) or overwrite if source is valid.
            // Simplified: only recursive merge if BOTH are objects.
            if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

/* ====================================
   LOGIN
   ==================================== */
function initLogin() {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('admin-dashboard');

    // Check if already logged in
    if (sessionStorage.getItem('duhohratky_logged_in')) {
        loginScreen.classList.add('hidden');
        dashboard.classList.add('active');
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');

        // Check credentials
        const storedCreds = siteData.credentials || defaultData.credentials;

        if (email === storedCreds.email && password === storedCreds.password) {
            sessionStorage.setItem('duhohratky_logged_in', 'true');
            loginScreen.classList.add('hidden');
            dashboard.classList.add('active');
            errorEl.textContent = '';
        } else {
            errorEl.textContent = '❌ Nesprávný email nebo heslo';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('duhohratky_logged_in');
        location.reload();
    });
}

/* ====================================
   NAVIGATION
   ==================================== */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.editor-section');
    const sectionTitle = document.getElementById('section-title');

    const titles = {
        hero: 'Hero sekce',
        about: 'O nás',
        activities: 'Aktivity',
        gallery: 'Galerie',
        tips: 'Návody & Tipy',
        contact: 'Kontakt',
        reservio: 'Reservio',
        settings: 'Nastavení',
        lessons: 'Aktuální lekce',
        upcoming: 'Připravované lekce' // Added 'upcoming' to titles
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const section = item.dataset.section;

            // Update active nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Save changes to server
            saveData();

            // Also update local storage to be safe (though saveData should handle persistence)
            // localStorage.setItem('duhohratky_data', JSON.stringify(siteData)); -> Removed to rely on server truthions.forEach(s => s.classList.add('hidden'));
            document.getElementById(`editor-${section}`).classList.remove('hidden');

            // Update title
            sectionTitle.textContent = titles[section];
        });
    });
}

/* ====================================
   FORM HANDLERS
   ==================================== */
function initFormHandlers() {
    // Auto-save on input change
    const inputs = document.querySelectorAll('[data-field]');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const field = input.dataset.field;
            const parts = field.split('.');

            let current = siteData;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!current[part]) {
                    // Check if next part is an index
                    const nextPart = parts[i + 1];
                    current[part] = !isNaN(nextPart) ? [] : {};
                }
                current = current[part];
            }

            const lastKey = parts[parts.length - 1];

            if (input.type === 'checkbox') {
                current[lastKey] = input.checked;
            } else {
                current[lastKey] = input.value;
            }
        });
    });
}

function populateFields() {
    const inputs = document.querySelectorAll('[data-field]');

    inputs.forEach(input => {
        const field = input.dataset.field;
        const parts = field.split('.');

        let value = siteData;
        let found = true;
        for (const part of parts) {
            if (value === undefined || value === null) {
                found = false;
                break;
            }
            value = value[part];
        }

        if (found && value !== undefined && value !== null) {
            if (input.type === 'checkbox') {
                input.checked = value;
            } else {
                input.value = value;
            }
        }
    });
}

/* ====================================
   BUTTONS
   ==================================== */
function initButtons() {
    // Save button
    document.getElementById('save-btn').addEventListener('click', saveData);

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', resetData);

    // Preview button
    document.getElementById('preview-btn').addEventListener('click', () => {
        saveData();
        window.open('index.html', '_blank');
    });

    // Change password
    document.getElementById('change-password-btn').addEventListener('click', () => {
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (!newPass || !confirmPass) {
            showToast('Vyplňte obě pole pro heslo', 'error');
            return;
        }

        if (newPass !== confirmPass) {
            showToast('Hesla se neshodují', 'error');
            return;
        }

        if (newPass.length < 6) {
            showToast('Heslo musí mít alespoň 6 znaků', 'error');
            return;
        }

        siteData.credentials = siteData.credentials || {};
        siteData.credentials.password = newPass;

        if (siteData.settings && siteData.settings.email) {
            siteData.credentials.email = siteData.settings.email;
        }

        saveData();

        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        showToast('Heslo bylo změněno', 'success');
    });

    // Export
    document.getElementById('export-btn').addEventListener('click', () => {
        const dataStr = JSON.stringify(siteData, null, 4);
        // Wrap in window.defaultContent for content.js compatibility
        const jsContent = `window.defaultContent = ${dataStr};`;

        const blob = new Blob([jsContent], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'content.js'; // Export as .js
        a.click();

        URL.revokeObjectURL(url);
        showToast('Data byla exportována (content.js)', 'success');
    });

    // Import
    document.getElementById('import-btn').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                let fileContent = event.target.result;
                // Try to strip JS assignment if it exists (for content.js)
                if (fileContent.includes('window.defaultContent')) {
                    fileContent = fileContent.replace(/window\.defaultContent\s*=\s*/, '').replace(/;?\s*$/, '');
                }

                const imported = JSON.parse(fileContent);
                siteData = deepMerge(defaultData, imported);
                saveData();
                populateFields();
                showToast('Data byla importována', 'success');
            } catch (err) {
                console.error(err);
                showToast('Chyba při importu dat: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    });
}

/* ====================================
   TOAST NOTIFICATIONS
   ==================================== */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const msg = toast.querySelector('.toast-message');

    msg.textContent = message;
    icon.textContent = type === 'success' ? '✅' : '❌';

    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ====================================
   INIT
   ==================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Alert user about update to ensure cache is cleared
    if (!sessionStorage.getItem('v1001_alert')) {
        alert("🎉 Systém aktualizován (v1001). Oprava nahrávání galerie nasazena.");
        sessionStorage.setItem('v1001_alert', 'true');
    }

    initLogin();
});
