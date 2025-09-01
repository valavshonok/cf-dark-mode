function modifyProblemsetRedirect() {
    const match = window.location.pathname.match(/^\/problemset\/problem\/(\d+)\/(\w+)$/);

    if (!match) return;

    const contestId = match[1];
    const taskId = match[2];

    chrome.storage.sync.get("cfProblemsetredirectEnabled", (data) => {
        if (data.cfProblemsetredirectEnabled) {
            const newUrl = `/contest/${contestId}/problem/${taskId}`;
            window.location.replace(newUrl);
        }
    });
}

function modifyProblemsetLink() {
    const match = window.location.pathname.match(/^\/problemset\/problem\/(\d+)\/\w+$/);

    if (!match) return;

    const contestId = match[1];

    const problems = document.querySelectorAll('a[href="/problemset"]');
    problems.forEach(link => {
        if (link.textContent.trim() === 'Задачи') {
            link.setAttribute('href', `/contest/${contestId}`);
        }
    });

    const submits = document.querySelectorAll('a[href="/problemset/submit"]');
    submits.forEach(link => {
        if (link.textContent.trim() === 'Отослать') {
            link.setAttribute('href', `/contest/${contestId}/submit`);
        }
    });

    const status = document.querySelectorAll('a[href="/problemset/status"]');
    status.forEach(link => {
        if (link.textContent.trim() === 'Статус') {
            link.setAttribute('href', `/contest/${contestId}/status`);
        }
    });

    const standings = document.querySelectorAll('a[href="/problemset/standings"]');
    standings.forEach(link => {
        if (link.textContent.trim() === 'Положение') {
            link.setAttribute('href', `/contest/${contestId}/standings`);
        }
    });

    const customtest = document.querySelectorAll('a[href="/problemset/customtest"]');
    customtest.forEach(link => {
        if (link.textContent.trim() === 'Запуск') {
            link.setAttribute('href', `/contest/${contestId}/customtest`);
        }
    });
}

function loginAutoCheckRemember() {
    if (!window.location.pathname.startsWith("/enter"))
        return;
    const checkbox = document.getElementById("remember") as HTMLInputElement | null;
    if (checkbox) {
        checkbox.checked = true;
    }
}

function commitAutoCheckDontSendEmail() {
    if (!window.location.pathname.startsWith("/edit-commit"))
        return;
    const checkbox = document.getElementById("toggle-minor-changes") as HTMLInputElement | null;
    if (checkbox) {
        checkbox.checked = true;
    }
}

export default async function updateInteraction() {
    modifyProblemsetRedirect();
    modifyProblemsetLink();
    loginAutoCheckRemember();
    commitAutoCheckDontSendEmail();
}
