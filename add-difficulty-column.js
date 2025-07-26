const problemMap = new Map();

async function fetchProblemRatings() {
    try {
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();

        if (data.status === 'OK') {
            for (const problem of data.result.problems) {
                if (problem.rating) {
                    const key = `${problem.contestId}${problem.index}`;
                    problemMap.set(key, problem.rating);
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
    if (typeof rating !== 'number') return '';
    if (rating >= 3000) return 'user-legendary';
    if (rating >= 2400) return 'user-red';
    if (rating >= 2100) return 'user-orange';
    if (rating >= 1900) return 'user-violet';
    if (rating >= 1600) return 'user-blue';
    if (rating >= 1400) return 'user-cyan';
    if (rating >= 1200) return 'user-green';
    return '';
}

async function addDifficultyColumn() {
    await fetchProblemRatings();

    const table = document.querySelector('.status-frame-datatable');
    if (!table) return;

    const headerRow = table.querySelector('tr.first-row');
    if (!headerRow.querySelector('th.difficulty-header')) {
        const th = document.createElement('th');
        th.textContent = 'Сложность';
        th.classList.add('difficulty-header');
        headerRow.appendChild(th);
    }

    const rows = table.querySelectorAll('tr[data-submission-id]');
    rows.forEach((row, index) => {
        if (row.querySelector('td.difficulty-cell')) return;

        const problemLink = row.querySelector('td:nth-child(4) a');
        const problemUrl = problemLink ? problemLink.href : null;

        const rating = getProblemDifficulty(problemUrl);
        const colorClass = getColorClass(rating);

        const td = document.createElement('td');
        td.textContent = rating;
        td.classList.add('difficulty-cell');
        td.style.fontWeight = 'bold';
        if (index % 2 === 0) td.classList.add('dark');
        if (colorClass) td.classList.add(colorClass);

        row.appendChild(td);
    });
}


const solvedSet = new Set();

async function fetchSolvedProblems(userName) {
    try {
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${userName}`);
        const data = await res.json();
        if (data.status === 'OK') {
            for (const submission of data.result) {
                if (submission.verdict === 'OK') {
                    const p = submission.problem;
                    if (p.contestId && p.index) {
                        solvedSet.add(`${p.contestId}${p.index}`);
                    }
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

async function addSolvedColumn() {
    const profileLink = document.querySelector('a[href^="/profile/"]:not([href*="/enter"])');
    if (!profileLink) {
        return;
    }
    const userName = profileLink.textContent.trim();

    await fetchSolvedProblems(userName);

    const table = document.querySelector('.status-frame-datatable');
    if (!table) return;

    const headerRow = table.querySelector('tr.first-row');
    if (!headerRow.querySelector('th.solved-header')) {
        const th = document.createElement('th');
        th.textContent = 'Решена';
        th.classList.add('solved-header');
        headerRow.appendChild(th);
    }

    const rows = table.querySelectorAll('tr[data-submission-id]');
    rows.forEach((row, index) => {
        if (row.querySelector('td.solved-cell')) return;

        const problemLink = row.querySelector('td:nth-child(4) a');
        const problemUrl = problemLink ? problemLink.href : null;

        const key = extractProblemKey(problemUrl);
        const solved = key && solvedSet.has(key) ? '✓' : '—';

        const td = document.createElement('td');
        td.textContent = solved;
        td.classList.add('solved-cell');
        td.style.textAlign = 'center';
        td.style.fontSize = '16px';
        td.style.fontWeight = 'bold';

        if (index % 2 === 0) td.classList.add('dark');
        if (solved === '✓') td.style.color = 'green';
        else td.style.color = 'red';

        row.appendChild(td);
    });
}

(async () => {
    const data = await new Promise((resolve) => {
        chrome.storage.sync.get(
            ["cfDifficultyTasksSubmissionsEnabled", "cfAcceptedTasksSubmissionsEnabled"],
            resolve
        );
    });

    const runDifficulty = data.cfDifficultyTasksSubmissionsEnabled;
    const runSolved = data.cfAcceptedTasksSubmissionsEnabled;

    if (runDifficulty)
        await addDifficultyColumn();
    if (runSolved)
        await addSolvedColumn();
})();
