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

addDifficultyColumn();
