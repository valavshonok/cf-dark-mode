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
        const cache = await new Promise((resolve) => {
            chrome.storage.local.get(
                ['cfProblemRatingsCache', 'cfProblemRatingsTimestamp'],
                resolve
            );
        });
        if (
            cache.cfProblemRatingsCache &&
            cache.cfProblemRatingsTimestamp &&
            Date.now() - cache.cfProblemRatingsTimestamp < 10 * 60 * 1000
        ) {
            const parsed = cache.cfProblemRatingsCache;
            for (const [key, value] of Object.entries(parsed)) {
                problemMap.set(key, value);
            }
            return;
        }

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

        const obj = Object.fromEntries(problemMap.entries());
        chrome.storage.local.set({
            cfProblemRatingsCache: obj,
            cfProblemRatingsTimestamp: Date.now()
        });
    } catch (err) {
        console.error('Error: ', err);
    }
}

function extractProblemKey(contestId, index) {
    return contestId + index;
}

function getColorByRating(rating) {
    if (typeof rating === 'string') {
        rating = rating.replace(/[^\d]/g, '');
        rating = parseInt(rating, 10);
    }
    if (typeof rating !== 'number' || isNaN(rating)) return '#EBEDF0';

    if (rating >= 3000) return '#580000';
    if (rating >= 2400) return '#ff0000';
    if (rating >= 2100) return '#ffb300';
    if (rating >= 1900) return '#c000ff';
    if (rating >= 1600) return '#007ae6';
    if (rating >= 1400) return '#00d8ca';
    if (rating >= 1200) return '#00d45c';
    return '#a2a2a2';
}

async function fetchUserSubmissions(handle) {
    try {
        const cache = await new Promise(resolve => {
            chrome.storage.local.get([`cfUserSubmissionsCache_${handle}`, `cfUserSubmissionsTimestamp_${handle}`], resolve);
        });

        if (
            cache[`cfUserSubmissionsCache_${handle}`] &&
            cache[`cfUserSubmissionsTimestamp_${handle}`] &&
            Date.now() - cache[`cfUserSubmissionsTimestamp_${handle}`] < 10 * 60 * 1000
        ) {
            const parsed = cache[`cfUserSubmissionsCache_${handle}`];
            return new Map(Object.entries(parsed));
        }

        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`);
        const data = await res.json();
        if (data.status !== "OK") return new Map();

        const submissions = data.result.filter(sub => sub.verdict === "OK");
        const byDate = new Map();

        for (const sub of submissions) {
            const date = new Date(sub.creationTimeSeconds * 1000)
                .toLocaleDateString("ru-RU"); // DD.MM.YYYY
            const key = extractProblemKey(sub.problem.contestId, sub.problem.index);
            const rating = problemMap.get(key);
            if (!rating) continue;

            if (!byDate.has(date)) byDate.set(date, []);
            byDate.get(date).push(
                typeof rating === 'string' ? parseInt(rating.replace(/[^\d]/g, ''), 10) : rating
            );
        }

        const userSubmissions = new Map();
        for (const [day, arr] of byDate.entries()) {
            userSubmissions.set(day, Math.max(...arr));
        }

        chrome.storage.local.set({
            [`cfUserSubmissionsCache_${handle}`]: Object.fromEntries(userSubmissions.entries()),
            [`cfUserSubmissionsTimestamp_${handle}`]: Date.now()
        });

        return userSubmissions;

    } catch (err) {
        console.error('Error in fetchUserSubmissions:', err);
        return new Map();
    }
}

function recolorSvg(svg, userSubmissions) {
    svg.querySelectorAll('rect.day').forEach(rect => {
        const date = rect.getAttribute("data-date");
        const rating = userSubmissions.get(date);
        const color = rating ? getColorByRating(rating) : '#EBEDF0';
        rect.setAttribute("fill", color);
    });
}

async function insertSecondSvg(handle) {
    await fetchProblemRatings();
    const userSubmissions = await fetchUserSubmissions(handle);

    const graphDiv = document.querySelector('#userActivityGraph');
    if (!graphDiv) return;

    const origSvg = graphDiv.querySelector('svg');
    if (!origSvg) return;

    const existingDiv = document.querySelector('#userDifficultyGraph');
    if (existingDiv) existingDiv.remove();

    const newDiv = document.createElement('div');
    newDiv.id = 'userDifficultyGraph';
    const cloneSvg = origSvg.cloneNode(true);
    newDiv.appendChild(cloneSvg);

    graphDiv.insertAdjacentElement('afterend', newDiv);

    recolorSvg(cloneSvg, userSubmissions);
}

(async () => {
    const match = location.pathname.match(/^\/profile\/([^/]+)/);
    if (!match) return;
    const handle = match[1];

    await insertSecondSvg(handle);

    const graphDiv = document.querySelector('#userActivityGraph');
    if (graphDiv) {
        const observer = new MutationObserver(async () => {
            await insertSecondSvg(handle);
        });
        observer.observe(graphDiv, { childList: true, subtree: true });
    }
})();
