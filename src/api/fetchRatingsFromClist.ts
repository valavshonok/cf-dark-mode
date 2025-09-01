interface Problem {
    id: string;
    rating: number;
}

const CACHE_KEY = "ratingsFromClist_cache";
const CACHE_TTL = 1000 * 60 * 60;

export default async function fetchRatingsFromClist(): Promise<Problem[]> {
    const problems: Problem[] = [];
    try {
        const cached = await chrome.storage.local.get(CACHE_KEY);
        if (cached[CACHE_KEY]) {
            const { data, timestamp } = cached[CACHE_KEY];
            const isFresh = timestamp && (Date.now() - timestamp < CACHE_TTL);
            if (isFresh) {
                return data as Problem[];
            }
        }

        const proxy = 'https://corsproxy.io/?';
        const res = await fetch(proxy + encodeURIComponent('https://clist.by/problems/?resource=1'));
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('tr.show-hidden-activity-on-hover');

        rows.forEach(row => {
            const linkEl = row.querySelector<HTMLAnchorElement>('.problem-name-column a[href*="codeforces.com/contest/"]');
            const ratingEl = row.querySelector<HTMLSpanElement>('.problem-rating-column span');

            if (!linkEl || !ratingEl) return;

            const match = linkEl.href.match(/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
            if (!match) return;

            const key = match[1] + match[2];
            const rating = parseInt(ratingEl.textContent.trim());

            if (!isNaN(rating)) {
                problems.push({ id: key, rating: rating });
            }
        });
        if (problems.length){
            await chrome.storage.local.set({
                [CACHE_KEY]: {
                    data: problems,
                    timestamp: Date.now(),
                },
            });
        }
    } catch (err) {
        // console.error('Error:', err);
    }

    return problems;
}