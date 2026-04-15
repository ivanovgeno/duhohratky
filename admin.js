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
    navigation: {
        home: 'Domů',
        about: 'O nás',
        activities: 'Aktivity',
        gallery: 'Galerie',
        tips: 'Návody & Tipy',
        contact: 'Kontakt',
        reservation: 'Rezervace'
    },
    badges: {
        upcoming: '✨ Připravujeme',
        about: '🌟 O nás',
        activities: '🎪 Aktivity',
        videos: '🎥 Videa',
        reservation: '📅 Rezervace',
        tips: '💡 Návody & Tipy',
        contact: '📍 Kontakt',
        gallery: '📸 Galerie',
        legal: '⚖️ Právní informace',
        faq: '❓ FAQ'
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
        storyText: 'Duhohratky vznikly z lásky k dětem a touhy vytvořit prostor, kde se mohou svobodně rozvíjet. Věříme, že každé dítě je jedinečné a zaslouží si objevovat svět vlastním způsobem. Naše aktivity jsou navrženy tak, aby podporovaly přirozenou zvídavost a kreativitu dětí.',
        storyPhoto: 'logo.png'
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
        facebook: 'https://facebook.com/duhohratky',
        instagram: 'https://instagram.com/duhohratky',
        youtube: 'https://youtube.com/duhohratky'
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

    // Video Section (Home Page Preview)
    videos: {
        title: 'Videa z <span class="rainbow-text">našich lekcí</span>',
        subtitle: 'Podívejte se na video ukázky z našich uplynulých témat',
        v1: { title: 'Duhová laboratoř', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        v2: { title: 'Zatmění v písku', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        v3: { title: 'Vodní svět', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    },

    // Settings
    faq: {
        title: 'Často kladené <span class="rainbow-text">otázky</span>',
        description: 'Vše, co potřebujete vědět o našich lekcích, vybavení a rezervacích.',
        items: [
            {
                question: 'Co jsou to "Duhohrátky"?',
                answer: 'Jsou to lekce plné smyslového hraní (sensory play), kde děti objevují svět pomocí hmatu, čichu, zraku i sluchu v bezpečném a podnětném prostředí.'
            },
            {
                question: 'Pro jak staré děti jsou vaše lekce určeny?',
                answer: 'Naše aktivity jsou primárně navrženy pro děti od 1 do 10 let, ale rádi přivítáme i mladší či starší sourozence.'
            },
            {
                question: 'Může se moje dítě na lekci ušpinit?',
                answer: 'Ano, a to je součást zábavy! Doporučujeme oblečení, u kterého vám nebude líto, když na něm zůstane trocha barvy nebo písku.'
            },
            {
                question: 'Jsou materiály, které používáte, bezpečné?',
                answer: 'Naprostá většina našich materiálů je "food-grade" (jedlá) nebo netoxická a bezpečná pro děti. Přesto doporučujeme dohled rodičů.'
            },
            {
                question: 'Jak dlouho trvá jedna lekce?',
                answer: 'Standardní lekce trvá 60 až 90 minut, v závislosti na konkrétním tématu a energii dětí.'
            },
            {
                question: 'Musím se na lekci předem registrovat?',
                answer: 'Ano, kvůli omezené kapacitě a přípravě čerstvých materiálů je nutná rezervace předem přes náš systém.'
            },
            {
                question: 'Pořádáte i soukromé narozeninové oslavy?',
                answer: 'Určitě! Rádi pro vás připravíme oslavu na míru s tématem, které má vaše dítě nejraději.'
            },
            {
                question: 'Můžu si u vás zakoupit materiály pro domácí hraní?',
                answer: 'Ano, v sekci "Návody & Tipy" najdete inspiraci a brzy plánujeme i prodej hotových sensory boxů.'
            },
            {
                question: 'Kde vaše lekce probíhají?',
                answer: 'Aktuálně nás najdete na několika místech. Přesné adresy jsou vždy uvedeny u konkrétního termínu v rezervaci.'
            },
            {
                question: 'Jaká je cena za jednu lekci?',
                answer: 'Cena se pohybuje kolem 250-350 Kč za dítě v závislosti na náročnosti připravených materiálů. Doprovod dospělého je zdarma.'
            }
        ]
    },
    contactForm: {
        title: 'Napište <span class="rainbow-text">nám</span>',
        description: 'Máte dotaz nebo speciální přání? Neváhejte nás kontaktovat prostřednictvím formuláře.',
        nameLabel: 'Jméno a příjmení',
        emailLabel: 'E-mailová adresa',
        phoneLabel: 'Telefonní číslo (nepovinné)',
        messageLabel: 'Vaše zpráva',
        btnText: 'Odeslat zprávu',
        successMessage: 'Děkujeme! Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.'
    },
    settings: {
        email: 'admin@duhohratky.cz',
        seoTitle: 'Duhohratky | Sensory Play & Montessori pro děti',
        seoDescription: 'Duhohratky - kreativní sensory play a Montessori aktivity pro děti. Rozvoj smyslů, motoriky a kreativity v bezpečném prostředí.',
        seoKeywords: 'sensory play, Montessori, děti, hromady, rozvoj, kreativita, Duhohratky'
    },

    // Legal
    legal: {
        gdpr: 'Tento web používá soubory cookies k poskytování služeb a analýze návštěvnosti. Používáním tohoto webu souhlasíte s jejich ukládáním.',
        gdpr_full: '<h1>Ochrana osobních údajů (GDPR)</h1><p>Vaše soukromí je pro nás důležité. Zde naleznete informace o tom, jaké údaje shromažďujeme a jak s nimi nakládáme...</p>',
        vop: '<h1>Všeobecné obchodní podmínky</h1><p>Zde dopište své obchodní podmínky...</p>',
        marketing: '<h1>Marketingový souhlas</h1><p>Zde dopište pravidla pro marketing a zpracování fotografií...</p>'
    }
};

// Current data (loaded from localStorage or default)
let siteData = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // VISUAL CONSOLE REMOVED (Production Mode)
    checkProtocol();

    // CRITICAL: await loadData so siteData is populated BEFORE rendering
    await loadData();

    initLogin();
    initNavigation();
    initFormHandlers();
    initButtons();
    initFAQEditor(); // New
    populateFields();
    initVideoPreviews(); // New: real-time YouTube ID preview
    loadGallery(); // Now safe — siteData.gallery is populated
});

function checkProtocol() {
    if (window.location.protocol === 'file:') {
        const warning = document.getElementById('protocol-warning');
        if (warning) warning.style.display = 'block';
        console.warn('⚠️ Admin running on file:// protocol. Saving will fail.');
    }
}

function initVideoPreviews() {
    console.log('🎬 Initializing Video Previews...');
    const videoInputs = document.querySelectorAll('[data-field^="videos.v"][data-field$=".url"]');
    
    videoInputs.forEach(input => {
        // Initial check
        updateSingleVideoPreview(input);
        
        // Update on input
        input.addEventListener('input', () => updateSingleVideoPreview(input));
    });
}

function updateSingleVideoPreview(input) {
    const field = input.dataset.field; // e.g. "videos.v1.url"
    const videoKey = field.split('.')[1]; // e.g. "v1"
    const previewEl = document.getElementById(`${videoKey}-id-preview`);
    
    if (!previewEl) return;
    
    const url = input.value;
    const videoId = extractVideoId(url);
    
    if (videoId) {
        previewEl.innerHTML = `✅ Rozpoznáno ID: <span style="color: #2ed573; font-weight: bold;">${videoId}</span>`;
    } else if (url && url.trim() !== '') {
        previewEl.innerHTML = `❌ <span style="color: #ff4757;">Neplatný YouTube odkaz</span>`;
    } else {
        previewEl.innerHTML = '';
    }
}

function extractVideoId(url) {
    if (!url) return null;
    try {
        url = url.trim();
        if (url.includes('youtube.com/shorts/')) return url.split('/shorts/')[1].split(/[?#]/)[0];
        if (url.includes('youtube.com/live/')) return url.split('/live/')[1].split(/[?#]/)[0];
        if (url.includes('youtube.com/embed/')) return url.split('/embed/')[1].split(/[?#]/)[0];
        if (url.includes('youtube.com/watch')) {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        }
        if (url.includes('youtu.be/')) return url.split('/').pop().split(/[?#]/)[0];
        const idRegex = /^[a-zA-Z0-9_-]{11}$/;
        if (idRegex.test(url)) return url;
    } catch (e) {
        console.error('Error parsing video URL:', e);
    }
    return null;
}

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
                <div class="gallery-item-actions">
                    <button class="btn-icon rotate-btn" onclick="rotateImage('${img.src}', 'left')" title="Otočit doleva">↩️</button>
                    <button class="btn-icon rotate-btn" onclick="rotateImage('${img.src}', 'right')" title="Otočit doprava">↪️</button>
                    <button class="btn-icon delete-btn" onclick="deleteGalleryImage(${index})" title="Smazat">🗑️</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

async function rotateImage(path, direction) {
    // Show loading state
    showToast('⏳ Otáčím obrázek...', 'info');

    try {
        const response = await fetch('rotate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: path, direction: direction })
        });

        const result = await response.json();

        if (result.status === 'success') {
            showToast('✅ Obrázek otočen!', 'success');

            // Force refresh of the image in the data model by updating timestamp/query param
            // Find the image in siteData
            // Update the timestamp in our local data model
            const imgIndex = siteData.gallery.findIndex(img => img.src === path);
            if (imgIndex !== -1) {
                siteData.gallery[imgIndex].timestamp = Date.now();
                console.log('🔄 Updated timestamp for', path);
            }

            // Persist changes to server (content.js) so the new timestamp is shared
            await saveData();

            // Refresh UI
            loadGallery();
        } else {
            showToast('❌ Chyba: ' + result.message, 'error');
        }
    } catch (e) {
        console.error('Rotation error:', e);
        showToast('❌ Chyba při otáčení', 'error');
    }
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

    if (!siteData.gallery || !Array.isArray(siteData.gallery) || index < 0 || index >= siteData.gallery.length) {
        console.error('❌ Invalid gallery index:', index);
        alert('Chyba: Neplatný index obrázku.');
        return;
    }

    const img = siteData.gallery[index];
    const filename = img.src.split('/').pop(); // Extract filename
    console.log('🗑️ Deleting image:', filename, 'at index:', index);

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
            await saveData(); // Sync with content.js (await to ensure persistence)
            loadGallery(); // Update UI
            showToast('🗑️ Obrázek smazán', 'success');
        } else {
            alert('Chyba při mazání souboru: ' + result.message);
        }

    } catch (e) {
        console.error('❌ Delete error:', e);
        alert('Chyba komunikace se serverem.');
    }
}
async function loadData() {
    try {
        // 1. Fetch content.js with a unique timestamp to bypass cache
        const response = await fetch('content.js?t=' + Date.now());
        if (response.ok) {
            const text = await response.text();
            console.log('📄 Raw content.js length:', text.length);
            console.log('📄 First 100 chars:', text.substring(0, 100));

            // Extract the JSON object from the string "window.defaultContent = { ... };"
            // MATCH BOTH: Single line and Multi-line, looser constraints
            let jsonMatch = text.match(/window\.defaultContent\s*=\s*(\{[\s\S]*\});/);

            // Fallback: Try to find the first { and the last }; if regex fails
            if (!jsonMatch) {
                console.warn('⚠️ Regex 1 failed, trying fallback extraction...');
                const firstBrace = text.indexOf('{');
                const lastBrace = text.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1) {
                    const potentialJson = text.substring(firstBrace, lastBrace + 1);
                    jsonMatch = [null, potentialJson];
                }
            }

            if (jsonMatch && jsonMatch[1]) {
                try {
                    const serverData = JSON.parse(jsonMatch[1]);
                    console.log('✅ Loaded fresh data from server (content.js). Gallery items:', serverData.gallery ? serverData.gallery.length : 0);

                    // Merge with defaultData to ensure structure
                    siteData = deepMerge(defaultData, serverData);
                    showToast(`Načteno ze serveru (${siteData.gallery ? siteData.gallery.length : 0} fotek) ☁️`, 'success');
                } catch (parseError) {
                    console.error('❌ JSON Parse Error:', parseError);
                    throw new Error('Invalid JSON in content.js');
                }
            } else {
                console.error('❌ Could not extract JSON from content.js');
                throw new Error('Could not parse content.js format');
            }
        } else {
            throw new Error('Fetch failed: ' + response.status);
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

    // NOTE: populateFields() and loadGallery() are called from DOMContentLoaded
    // after loadData() completes. Do NOT call non-existent functions here —
    // it crashes the async chain and prevents initNavigation from running.
}

async function saveData() {
    // CRITICAL: Sync data from UI elements right before saving
    syncDataFromUI();

    localStorage.setItem('duhohratky_data', JSON.stringify(siteData));

    // Also save to a format that index.html can read (for preview)
    localStorage.setItem('duhohratky_content', JSON.stringify(siteData));

    // Save to Server (PHP) — await to ensure persistence
    await saveToPHP();
}

function syncDataFromUI() {
    console.log('🔄 Syncing UI data to siteData object...');
    const inputs = document.querySelectorAll('[data-field]');
    
    inputs.forEach(input => {
        const field = input.dataset.field;
        const parts = field.split('.');
        
        let current = siteData;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part]) {
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
    console.log('✅ UI Sync complete.');
}

async function saveToPHP() {
    const saveBtn = document.getElementById('save-btn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '⏳ Ukládám...';
    saveBtn.disabled = true;

    try {
        console.log('📤 Sending data to save.php:', siteData);
        
        // Protocol check - fetch will fail on file:// protocol
        if (window.location.protocol === 'file:') {
            showToast('✨ Změny uloženy pro lokální Náhled webu.', 'success');
            console.info('💾 Data saved to localStorage. Server save skipped due to file:// protocol.');
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
            return;
        }

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
            console.log(`✅ Uloženo na server! (Velikost souboru: ${result.size} bytes)`);
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
        videos: 'Videa z lekcí',
        tips: 'Návody & Tipy',
        contact: 'Kontakt',
        reservio: 'Reservio',
        settings: 'Nastavení',
        lessons: 'Aktuální lekce',
        upcoming: 'Připravované lekce',
        legal: 'Právní informace',
        'navigation-badges': 'Navigace & Badges',
        faq: 'Často kladené otázky (FAQ)',
        'contact-form': 'Kontaktní formulář'
    };

    // Restore last active section from sessionStorage
    const savedSection = sessionStorage.getItem('duhohratky_active_section');
    if (savedSection) {
        const savedNav = document.querySelector(`.nav-item[data-section="${savedSection}"]`);
        if (savedNav) {
            navItems.forEach(n => n.classList.remove('active'));
            savedNav.classList.add('active');
            sections.forEach(s => s.classList.add('hidden'));
            const targetSection = document.getElementById(`editor-${savedSection}`);
            if (targetSection) targetSection.classList.remove('hidden');
            sectionTitle.textContent = titles[savedSection] || savedSection;
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const section = item.dataset.section;

            // Update active nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Show selected section, hide others
            sections.forEach(s => s.classList.add('hidden'));
            document.getElementById(`editor-${section}`).classList.remove('hidden');

            // Update title
            sectionTitle.textContent = titles[section];

            // Save active section to sessionStorage for persistence across reloads
            sessionStorage.setItem('duhohratky_active_section', section);
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

    // Handle Image Previews
    updateImagePreviews();
    renderFAQEditorList(); // New
}

function updateImagePreviews() {
    const aboutPreview = document.getElementById('about-photo-preview');
    if (aboutPreview && siteData.about && siteData.about.storyPhoto) {
        aboutPreview.innerHTML = `<img src="${siteData.about.storyPhoto}?t=${Date.now()}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
}

async function uploadAboutPhoto() {
    const input = document.getElementById('about-photo-upload');
    const status = document.getElementById('about-photo-status');
    const btn = document.querySelector('button[onclick="uploadAboutPhoto()"]');

    if (!input.files || input.files.length === 0) {
        alert("Vyberte prosím obrázek.");
        return;
    }

    const file = input.files[0];
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳...';
    btn.disabled = true;
    status.innerHTML = '⏳ Nahrávám...';

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            siteData.about.storyPhoto = result.path;
            console.log('✅ Story photo updated:', result.path);
            
            // Save data
            await saveData();
            
            // Refresh preview
            updateImagePreviews();
            
            status.innerHTML = '✅ Nahráno!';
            status.style.color = 'green';
            input.value = '';
        } else {
            status.innerHTML = '❌ ' + result.message;
            status.style.color = 'red';
        }
    } catch (e) {
        console.error('Upload failed:', e);
        status.innerHTML = '❌ Chyba nahrávání';
        status.style.color = 'red';
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
        setTimeout(() => { if (status.innerHTML.includes('✅')) status.innerHTML = ''; }, 3000);
    }
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

/* Duplicate DOMContentLoaded removed — all init is handled by the main listener above */

/* ====================================
   BACK TO TOP BUTTON
   ==================================== */
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/* ====================================
   FAQ EDITOR
   ==================================== */
function initFAQEditor() {
    console.log('❓ Initializing FAQ Editor...');
    const addBtn = document.getElementById('add-faq-item');
    if (addBtn) {
        addBtn.onclick = () => {
            if (!siteData.faq) siteData.faq = { title: '', description: '', items: [] };
            if (!siteData.faq.items) siteData.faq.items = [];
            
            siteData.faq.items.push({
                question: 'Nová otázka',
                answer: 'Odpověď na novou otázku'
            });
            renderFAQEditorList();
            showToast('✅ Otázka byla přidána');
        };
    }
}

function renderFAQEditorList() {
    const list = document.getElementById('faq-items-editor-list');
    if (!list) return;

    if (!siteData.faq || !siteData.faq.items) {
        siteData.faq = siteData.faq || {};
        siteData.faq.items = siteData.faq.items || [];
    }

    list.innerHTML = '';

    siteData.faq.items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'edit-item-card';
        itemEl.innerHTML = `
            <div class="edit-item-controls">
                <span class="item-index">Otázka #${index + 1}</span>
                <button class="btn btn-danger btn-small" onclick="deleteFAQItem(${index})">
                    <span>🗑️</span> Smazat
                </button>
            </div>
            <div class="form-group">
                <label>Otázka</label>
                <input type="text" value="${item.question}" onchange="updateFAQItem(${index}, 'question', this.value)">
            </div>
            <div class="form-group">
                <label>Odpověď</label>
                <textarea rows="3" onchange="updateFAQItem(${index}, 'answer', this.value)">${item.answer}</textarea>
            </div>
        `;
        list.appendChild(itemEl);
    });
}

window.updateFAQItem = (index, field, value) => {
    siteData.faq.items[index][field] = value;
};

window.deleteFAQItem = (index) => {
    if (confirm('Opravdu chcete tuto otázku smazat?')) {
        siteData.faq.items.splice(index, 1);
        renderFAQEditorList();
        showToast('🗑️ Otázka smazána');
    }
};
