/* ====================================
   DUHOHRÁTKY MAIL - LOGIC
   ==================================== */

// MOCK DATA
const mockEmails = [
    { id: 1, sender: "Tým Duhohrátky", subject: "Vítejte v novém DuhoMailu! 🌈", date: "Teď", read: false, body: "Dobrý den,<br><br>Vítejte ve své nové emailové schránce. Zde najdete všechny informace o kroužcích a aktivitách.<br><br>S pozdravem,<br>Tým Duhohrátky" },
    { id: 2, sender: "Google", subject: "Bezpečnostní upozornění", date: "Včera", read: true, body: "Někdo se přihlásil k vašemu účtu z nového zařízení..." },
    { id: 3, sender: "Maminka Jana", subject: "Omluvenka z kroužku", date: "10. úno", read: true, body: "Dobrý den, Anička zítra nedorazí, má rýmu." },
    { id: 4, sender: "Newsletter", subject: "5 tipů na sensory play", date: "8. úno", read: true, body: "Zkuste doma vyrobit duhovou rýži..." }
];

// STATE
let currentState = {
    folder: 'inbox',
    emails: [...mockEmails],
    user: 'admin@duhohratky.cz'
};

// DOM ELEMENTS
const app = {
    screens: {
        login: document.getElementById('login-screen'),
        main: document.getElementById('mail-app')
    },
    views: {
        list: document.getElementById('email-list-view'),
        detail: document.getElementById('email-detail-view'),
        settings: document.getElementById('settings-view')
    },
    containers: {
        emailList: document.getElementById('email-list-container')
    },
    modals: {
        compose: document.getElementById('compose-modal')
    },
    nav: {
        items: document.querySelectorAll('.nav-item[data-folder]')
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {

    // Login Handling
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        if (email) {
            currentState.user = email;
            document.getElementById('user-email-display').textContent = email;

            // Switch screen
            app.screens.login.classList.add('hidden');
            app.screens.main.classList.remove('hidden');

            renderEmails();
        }
    });

    // Navigation Handling
    app.nav.items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Update UI
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update State
            currentState.folder = item.dataset.folder;

            // Show List View
            showView('list');
            renderEmails();
        });
    });

    // Compose Modal
    document.getElementById('btn-compose').addEventListener('click', () => {
        app.modals.compose.classList.remove('hidden');
    });

    document.getElementById('close-compose').addEventListener('click', () => {
        app.modals.compose.classList.add('hidden');
    });

    // Send Email (Simulation)
    document.getElementById('send-email-btn').addEventListener('click', () => {
        const to = document.getElementById('compose-to').value;
        const subject = document.getElementById('compose-subject').value;
        const body = document.getElementById('compose-message').value;

        if (!to || !subject) {
            alert('Vyplňte prosím příjemce a předmět.');
            return;
        }

        // Add to "Sent" (simulated by adding to mock data with a 'sent' flag in a real app, keeping simple here)
        showToast(`Zpráva odeslána na: ${to}`);

        // Reset and close
        document.getElementById('compose-to').value = '';
        document.getElementById('compose-subject').value = '';
        document.getElementById('compose-message').value = '';
        app.modals.compose.classList.add('hidden');
    });

    // Back Button (Detail -> List)
    document.getElementById('back-to-list').addEventListener('click', () => {
        showView('list');
    });

    // Settings Link
    document.getElementById('settings-link').addEventListener('click', (e) => {
        e.preventDefault();
        showView('settings');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        location.reload(); // Simple reload to "logout"
    });
});

// FUNCTIONS

function renderEmails() {
    const list = app.containers.emailList;
    list.innerHTML = '';

    // Filter Logic (Simple simulation)
    const folderEmails = currentState.emails.filter(email => {
        if (currentState.folder === 'inbox') return true; // Show all for now
        // In real app: return email.folder === currentState.folder;
        if (currentState.folder === 'sent') return false; // Mock data is only inbox
        return false;
    });

    if (folderEmails.length === 0) {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:#999;">Žádné zprávy</div>';
        return;
    }

    folderEmails.forEach(email => {
        const row = document.createElement('div');
        row.className = `email-row ${email.read ? 'read' : 'unread'}`;
        row.innerHTML = `
            <div class="checkbox-col"><input type="checkbox"></div>
            <div class="sender-col">${email.sender}</div>
            <div class="subject-col">${email.subject}</div>
            <div class="date-col">${email.date}</div>
        `;

        row.addEventListener('click', () => openEmail(email));
        list.appendChild(row);
    });

    // Update Badge
    const unreadCount = currentState.emails.filter(e => !e.read).length;
    document.getElementById('unread-count').textContent = unreadCount;
    document.getElementById('unread-count').style.display = unreadCount > 0 ? 'inline-block' : 'none';
}

function openEmail(email) {
    // Mark as read
    email.read = true;
    renderEmails(); // Re-render to update bold/normal status in list

    // Populate Detail
    document.getElementById('detail-subject').textContent = email.subject;
    document.getElementById('detail-sender').textContent = email.sender;
    document.getElementById('detail-date').textContent = email.date;
    document.getElementById('detail-body').innerHTML = email.body;

    // Show Detail View
    showView('detail');
}

function showView(viewName) {
    Object.values(app.views).forEach(el => el.classList.add('hidden'));

    if (viewName === 'list') app.views.list.classList.remove('hidden');
    if (viewName === 'detail') app.views.detail.classList.remove('hidden');
    if (viewName === 'settings') app.views.settings.classList.remove('hidden');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
