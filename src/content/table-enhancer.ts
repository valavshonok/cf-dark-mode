import getContestProblems from "../utils/getContestProblems";
import getProblemRatings from "../utils/getProblemRatings";
import getProblemRatingsFromName from "../utils/getProblemRatingsFromName";
import { setToLocalStorage } from "../utils/storage";

type Rating = number | `*${number}` | "—";

function extractProblemKey(url: string) {
    const match = url.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
    if (match) {
        return match[1] + match[2];
    }
    return null;
}
function getColorClass(rating: Rating) {
    if (rating == "—")
        return '';
    if (typeof rating === 'string') {
        rating = parseInt(rating.replace(/[^\d]/g, ''), 10);
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

    const table = document.querySelector('table.problems');
    if (!table) return;

    const match = location.pathname.match(/\/contest\/(\d+)/);
    const contestId = match ? parseInt(match[1], 10) : null;
    const contestProblems = contestId ? await getContestProblems(contestId): null;

    const problems = await getProblemRatings();
    const problemsForName = await getProblemRatingsFromName();

    const headerRow = table.querySelector('tr');
    if (headerRow && !headerRow.querySelector('th.difficulty-header')) {
        const th = document.createElement('th');
        th.classList.add('difficulty-header');
        th.style.width = '5em';
        headerRow.appendChild(th);
    }

    const rows = table.querySelectorAll('tr:not(:first-child)');
    rows.forEach((row, index) => {
        if (row.querySelector('td.difficulty-cell')) return;

        const problemLink = row.querySelector('td.id a') as HTMLAnchorElement | null;
        if (!problemLink) return;

        const fullUrl = new URL(problemLink.href, location.origin).href;
        const problemKey = extractProblemKey(fullUrl);
        
        const problemName = contestProblems && problemKey ? contestProblems.get(problemKey)?.name : null;

        const div2Rating = problemName ? (problemsForName.get(problemName) ?? "—") : "—";
        const rating: Rating = problemKey ? (problems.get(problemKey) ?? div2Rating) : "—";

        const colorClass = getColorClass(rating);

        const td = document.createElement('td');
        td.textContent = `${rating}`;
        td.classList.add('difficulty-cell');
        td.style.fontWeight = 'bold';
        td.style.width = '5em';
        if (index % 2 === 0) td.classList.add('dark');
        if (colorClass) td.classList.add(colorClass);

        row.appendChild(td);
    });
}


async function addDifficultyColumn() {

    const table = document.querySelector('.status-frame-datatable');
    if (!table) return;

    const match = location.pathname.match(/\/contest\/(\d+)/);
    const contestId = match ? parseInt(match[1], 10) : null;
    const contestProblems = contestId ? await getContestProblems(contestId): null;

    const problems = await getProblemRatings();
    const problemsForName = await getProblemRatingsFromName();

    const headerRow = table.querySelector('tr.first-row');
    if (headerRow && !headerRow.querySelector('th.difficulty-header')) {
        const th = document.createElement('th');
        th.textContent = 'Difficulty';
        th.classList.add('difficulty-header');
        headerRow.appendChild(th);
    }

    const rows = table.querySelectorAll('tr[data-submission-id]');
    rows.forEach((row, index) => {
        if (row.querySelector('td.difficulty-cell')) return;

        const problemLink = row.querySelector('td:nth-child(4) a') as HTMLAnchorElement | null;
        if (!problemLink) return;

        const fullUrl = new URL(problemLink.href, location.origin).href;
        const problemKey = extractProblemKey(fullUrl);
        
        const problemName = contestProblems && problemKey ? contestProblems.get(problemKey)?.name : null;

        const div2Rating = problemName ? (problemsForName.get(problemName) ?? "—") : "—";
        const rating: Rating = problemKey ? (problems.get(problemKey) ?? div2Rating) : "—";
        
        const colorClass = getColorClass(rating);

        

        const td = document.createElement('td');
        td.textContent = `${rating}`;
        td.classList.add('difficulty-cell');
        td.style.fontWeight = 'bold';
        if (index % 2 === 0) td.classList.add('dark');
        if (colorClass) td.classList.add(colorClass);

        row.appendChild(td);
    });
}



// async function addSolvedColumn() {
//     const profileLink = document.querySelector('a[href^="/profile/"]:not([href*="/enter"])');
//     if (!profileLink) {
//         return;
//     }
//     const userName = profileLink.textContent.trim();

//     await fetchSolvedProblems(userName);

//     const table = document.querySelector('.status-frame-datatable');
//     if (!table) return;

//     const headerRow = table.querySelector('tr.first-row');
//     if (!headerRow.querySelector('th.solved-header')) {
//         const th = document.createElement('th');
//         th.textContent = 'Решена';
//         th.classList.add('solved-header');
//         headerRow.appendChild(th);
//     }

//     const rows = table.querySelectorAll('tr[data-submission-id]');
//     rows.forEach((row, index) => {
//         if (row.querySelector('td.solved-cell')) return;

//         const problemLink = row.querySelector('td:nth-child(4) a');
//         const problemUrl = problemLink ? problemLink.href : null;

//         const key = extractProblemKey(problemUrl);
//         const solved = key && solvedSet.has(key) ? '✓' : '—';

//         const td = document.createElement('td');
//         td.textContent = solved;
//         td.classList.add('solved-cell');
//         td.style.textAlign = 'center';
//         td.style.fontSize = '16px';
//         td.style.fontWeight = 'bold';

//         if (index % 2 === 0) td.classList.add('dark');
//         if (solved === '✓') td.style.color = 'green';
//         else td.style.color = 'red';

//         row.appendChild(td);
//     });
// }


export async function addDifficultColumnInContest() {
    const data = await chrome.storage.sync.get("cfDifficultyTasksSubmissionsEnabled");
    if (data) {
        await addDifficultyToContestTable();
    }
}


export async function addDifficultyColumnInSubmission() {
    const runDifficulty = await chrome.storage.sync.get("cfDifficultyTasksSubmissionsEnabled");
    if (runDifficulty)
        await addDifficultyColumn();
}


// export async function addAcceptedColumnInSubmission() {
//     const runSolved = await chrome.storage.sync.get("cfAcceptedTasksSubmissionsEnabled");

//     // if (runSolved)
//     //     await addSolvedColumn();
// }


