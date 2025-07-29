const problemMap = new Map();

async function fetchRatingsFromClist() {
    const clistRatingsMap = new Map();
    try {
        const proxy = 'https://corsproxy.io/?';
        const res = await fetch(proxy + encodeURIComponent('https://clist.by/problems/?resource=1'));
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('tr.show-hidden-activity-on-hover');

        rows.forEach(row => {
            const linkEl = row.querySelector('.problem-name-column a[href*="codeforces.com/contest/"]');
            const ratingEl = row.querySelector('.problem-rating-column span');

            if (!linkEl || !ratingEl) return;

            const match = linkEl.href.match(/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
            if (!match) return;

            const key = match[1] + match[2];
            const rating = parseInt(ratingEl.textContent.trim());

            if (!isNaN(rating)) {
                clistRatingsMap.set(key, rating);
            }
        });
    } catch (err) {
        console.error('Error:', err);
    }

    return clistRatingsMap;
}

async function fetchProblemRatings() {
    try {
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();

        const clistRatings = await fetchRatingsFromClist();

        if (data.status === 'OK') {
            for (const problem of data.result.problems) {
                const key = `${problem.contestId}${problem.index}`;
                if (problem.rating) {
                    problemMap.set(key, problem.rating);
                } else if (clistRatings.has(key)) {
                    problemMap.set(key, "*" + clistRatings.get(key));
                }
            }
        }
    } catch (err) {
        console.error('Error: ', err);
    }
}

function extractProblemKey(url) {
    const match = url.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
    if (match) {
        return match[1] + match[2];
    }
    return null;
}

function getProblemDifficulty(problemUrl) {
    const key = extractProblemKey(problemUrl);
    return key && problemMap.has(key) ? problemMap.get(key) : '—';
}

function getColorClass(rating) {
    if (typeof rating === 'string') {
        rating = rating.replace(/[^\d]/g, '');
        rating = parseInt(rating, 10);
    }

    if (typeof rating !== 'number' || isNaN(rating)) return '';

    if (rating >= 3000) return 'user-legendary';
    if (rating >= 2400) return 'user-red';
    if (rating >= 2100) return 'user-orange';
    if (rating >= 1900) return 'user-violet';
    if (rating >= 1600) return 'user-blue';
    if (rating >= 1400) return 'user-cyan';
    if (rating >= 1200) return 'user-green';
    return '';
}

async function addDifficultyToContestTable() {
    await fetchProblemRatings();

    const table = document.querySelector('table.problems');
    if (!table) return;

    const headerRow = table.querySelector('tr');
    if (!headerRow.querySelector('th.difficulty-header')) {
        const th = document.createElement('th');
        th.classList.add('difficulty-header');
        th.style.width = '5em';
        headerRow.appendChild(th);
    }

    const rows = table.querySelectorAll('tr:not(:first-child)');
    rows.forEach((row, index) => {
        if (row.querySelector('td.difficulty-cell')) return;

        const problemLink = row.querySelector('td.id a');
        if (!problemLink) return;

        const fullUrl = new URL(problemLink.href, location.origin).href;
        const rating = getProblemDifficulty(fullUrl);
        const colorClass = getColorClass(rating);

        const td = document.createElement('td');
        td.textContent = rating;
        td.classList.add('difficulty-cell');
        td.style.fontWeight = 'bold';
        td.style.width = '5em';
        if (index % 2 === 0) td.classList.add('dark');
        if (colorClass) td.classList.add(colorClass);

        row.appendChild(td);
    });
}

(async () => {
    const data = await new Promise((resolve) => {
        chrome.storage.sync.get(
            ["cfDifficultyTasksSubmissionsEnabled"],
            resolve
        );
    });

    const runDifficulty = data.cfDifficultyTasksSubmissionsEnabled;

    if (runDifficulty)
        await addDifficultyToContestTable();
})();

