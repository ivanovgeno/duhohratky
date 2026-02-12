/* ====================================
   DUHOHRÁTKY MAIL - LOGIC (REAL)
   ==================================== */

// STATE
let currentState = {
    folder: 'inbox',
    emails: [],
    user: null
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
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = e.target.querySelector('button');

        btn.textContent = 'Přihlašování...';
        btn.disabled = true;

        try {
            const response = await fetch('api/auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                currentState.user = email;
                document.getElementById('user-email-display').textContent = email;

                // Switch screen
                app.screens.login.classList.add('hidden');
                app.screens.main.classList.remove('hidden');

                fetchEmails();
            } else {
                alert(result.message);
                btn.textContent = 'Přihlásit se';
                btn.disabled = false;
            }
        } catch (err) {
            alert('Chyba připojení k serveru.');
            btn.textContent = 'Přihlásit se';
            btn.disabled = false;
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
            // Re-render (client-side filter for now, or fetch specific folder if API supported)
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

    // Send Email
    document.getElementById('send-email-btn').addEventListener('click', async () => {
        const to = document.getElementById('compose-to').value;
        const subject = document.getElementById('compose-subject').value;
        const message = document.getElementById('compose-message').value;
        const btn = document.getElementById('send-email-btn');

        if (!to || !subject) {
            alert('Vyplňte prosím příjemce a předmět.');
            return;
        }

        btn.textContent = 'Odesílání...';
        btn.disabled = true;

        try {
            const response = await fetch('api/send.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, subject, message })
            });

            const result = await response.json();

            if (result.success) {
                showToast(`Zpráva odeslána na: ${to}`);

                // Reset and close
                document.getElementById('compose-to').value = '';
                document.getElementById('compose-subject').value = '';
                document.getElementById('compose-message').value = '';
                app.modals.compose.classList.add('hidden');
            } else {
                alert('Chyba odesílání: ' + result.message);
            }
        } catch (err) {
            alert('Chyba připojení.');
        } finally {
            btn.textContent = 'Odeslat';
            btn.disabled = false;
        }
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

async function fetchEmails() {
    const list = app.containers.emailList;
    list.innerHTML = '<div style="padding:20px; text-align:center;">Načítám zprávy...</div>';

    try {
        const response = await fetch('api/fetch.php');
        const result = await response.json();

        if (result.success) {
            currentState.emails = result.data; // Store emails
            renderEmails();
        } else {
            console.error(result.message);
            list.innerHTML = '<div style="padding:20px; text-align:center; color:red;">Chyba načítání</div>';
        }
    } catch (err) {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:red;">Chyba připojení</div>';
    }
}

function renderEmails() {
    const list = app.containers.emailList;
    list.innerHTML = '';

    // Filter Logic (Client-side simulation for now as fetch gets all recent)
    const folderEmails = currentState.emails; // Currently listing all fetched (usually INBOX)

    if (folderEmails.length === 0) {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:#999;">Žádné zprávy</div>';
        return;
    }

    folderEmails.forEach(email => {
        const row = document.createElement('div');
        row.className = `email-row ${email.read ? 'read' : 'unread'}`;
        row.innerHTML = `
            <div class="checkbox-col"><input type="checkbox"></div>
            <div class="sender-col">${email.sender || 'Neznámý'}</div>
            <div class="subject-col">${email.subject || '(Bez předmětu)'}</div>
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
