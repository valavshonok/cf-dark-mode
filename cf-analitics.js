(() => {

const problemMap = new Map();

async function fetchProblemRatings() {
    try {
        const cache = await new Promise(resolve =>
            chrome.storage.local.get(['histogramProblemRatingsCache','histogramProblemRatingsTimestamp'], resolve)
        );

        if (cache.histogramProblemRatingsCache &&
            cache.histogramProblemRatingsTimestamp &&
            Date.now() - cache.histogramProblemRatingsTimestamp < 10*60*1000) {
            const parsed = cache.histogramProblemRatingsCache;
            for (const [key, value] of Object.entries(parsed)) {
                problemMap.set(key, value);
            }
            return;
        }

        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();

        if (data.status === 'OK') {
            for (const problem of data.result.problems) {
                const key = `${problem.contestId}${problem.index}`;
                if (problem.rating) {
                    problemMap.set(key, problem.rating);
                }
            }
        }
        chrome.storage.local.set({
            histogramProblemRatingsCache: Object.fromEntries(problemMap.entries()),
            histogramProblemRatingsTimestamp: Date.now()
        });
    } catch (err) {
        console.error('Error: ', err);
    }
}

function extractProblemKey(contestId, index) {
    return contestId + index;
}

async function fetchUserSubmissions(handle) {
    try {
        const cache = await new Promise(resolve =>
            chrome.storage.local.get([`histogramUserSubmissionsCache_${handle}`, `histogramUserSubmissionsTimestamp_${handle}`], resolve)
        );
        const solved =  {};
        const dataCache = cache[`histogramUserSubmissionsCache_${handle}`] || {};
        if (cache[`histogramUserSubmissionsCache_${handle}`]){
            Object.keys(dataCache).forEach(key => {
                if (dataCache[key].verdict === "OK")
                    solved[dataCache[key].problemId] = dataCache[key].rating;
            });
        }
        if (cache[`histogramUserSubmissionsCache_${handle}`] &&
            cache[`histogramUserSubmissionsTimestamp_${handle}`] &&
            Date.now() - cache[`histogramUserSubmissionsTimestamp_${handle}`] < 20*1000) {

            return solved;
        }
         
        let from = 1;
        let batchSize = 1;
        
        if (Object.keys(solved).length === 0) 
            batchSize = 1000000;
        while (batchSize) {
            const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=${from}&count=${batchSize}`);
            const data = await res.json();
            if (data.status !== "OK")
                break;

            const submissions = data.result;
            if (!submissions.length)
                break;

            for (const sub of submissions) {
                if (dataCache[sub.id]){
                    batchSize = 0;
                    continue;
                }
                const key = extractProblemKey(sub.problem.contestId, sub.problem.index);
                const rating = problemMap.get(key);
                dataCache[sub.id] = {
                    verdict: sub.verdict,
                    rating: rating,
                    problemId: key
                }
                if (sub.verdict !== "OK" || !rating)
                    continue;
                solved[key] = rating;
            }
            if (submissions.length < batchSize)
                break;            
            from += batchSize;
            batchSize *= 8;
            if (batchSize > 64)
                batchSize = 1000000;
        }
        chrome.storage.local.set({
            [`histogramUserSubmissionsCache_${handle}`]: dataCache,
            [`histogramUserSubmissionsTimestamp_${handle}`]: Date.now()
        });

        return solved;

    } catch (err) {
        console.error('Error in fetchUserSubmissions:', err);
        return {};
    }
}

function getColorByRating(rating) {
    if (rating >= 3000) return '#580000';
    if (rating >= 2600) return '#ff0000';
    if (rating >= 2400) return '#ff4040';
    if (rating >= 2100) return '#ffb300';
    if (rating >= 1900) return '#c000ff';
    if (rating >= 1600) return '#007ae6';
    if (rating >= 1400) return '#00d8ca';
    if (rating >= 1200) return '#00d45c';
    return '#a2a2a2';
}


async function insertDifficultyHistogram(handle) {
    await fetchProblemRatings();
    const solvedProblems = await fetchUserSubmissions(handle);

    const ratingCounts = new Map();
    Object.values(solvedProblems).forEach(rating => {
        if (!rating) return;
        ratingCounts.set(rating, (ratingCounts.get(rating) || 0) + 1);
    });

    const ratingsSorted = [...ratingCounts.entries()].sort((a, b) => a[0] - b[0]);
    if (!ratingsSorted.length) return;

    const maxCount = Math.max(...ratingsSorted.map(([, c]) => c));

    if (maxCount == 0){
        return;
    }

    const existing = document.querySelector("#userDifficultyHistogram");
    if (existing) existing.remove();

    const block = document.createElement("div");
    block.className = "roundbox";
    block.style.padding = "2em 1em 0 1em";
    block.style.marginTop = "1em";
    block.id = "userDifficultyHistogram";

    block.innerHTML = `
        <h4 style="margin-bottom:24px;">Problem Ratings</h4>
        <div class="cf-histogram-wrapper">
            <div class="cf-y-axis"></div>
            <div class="cf-histogram"></div>
        </div>
    `;

    const anchor = document.querySelector("div._UserActivityFrame_frame");
    if (anchor) {
        anchor.insertAdjacentElement("afterend", block);
    } else {
        const profileContent = document.querySelector(".userbox") || document.querySelector("#pageContent");
        if (profileContent) {
            profileContent.appendChild(block);
        }
    }

    const style = document.createElement("style");
    style.textContent = `
    #userDifficultyHistogram {
      padding: 2em 1em 1em;
    }
    .cf-histogram-wrapper {
        display: flex;
        gap: 8px;
        height: 300px;
        margin-top: 20px;
        position: relative; /* нужно для tooltip */
    }
    .cf-y-axis {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 10px;
      color: #6e6e6e;
      min-width: 30px;
      padding-bottom: 40px;
      height: 100%;
      box-sizing: border-box;          
    }
    .cf-histogram {
        display: grid;
        grid-auto-flow: column;
        align-items: end;
        gap: ${Math.max(10, 30-ratingsSorted.length)}px;
        flex: 1;
    }
    .cf-bar {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        font-size: 10px;
        gap: 3px;
    }
    .cf-bar * {
        width: 100%;
        border-radius: ${8 - ratingsSorted.length / 5}px ${8 - ratingsSorted.length / 5}px 0 0;
        margin-bottom: 40px;
    }

    .cf-bar a {
        cursor: pointer;
        transition: filter 0.3s ease;
    }

    .cf-bar a:hover {
        filter: brightness(70%);
    }

    .cf-label {
        max-width: 40px;
        margin-top: 2px;
        margin-bottom: 4px;
        height: 30px;
        min-height: 30px;
        transform: rotate(315deg);
        color: #6e6e6e;
        text-align: center;
        display: flex;
        align-items: center;
        position: absolute;
        margin-bottom: 5px !important;
        justify-content: center;
    }
    .cf-tooltip {
        position: absolute;
        padding: 8px;
        background: rgba(0,0,0,0.75);
        color: #e2e2e2;
        font-size: 12px;
        border-radius: 6px;
        pointer-events: none;
        transform: translate(-50%, -100%);
        transition: left 0.3s ease, top 0.3s ease, opacity 0.5s ease;
        white-space: nowrap;
        z-index: 9999;
        opacity: 0;
    }
    `;
    document.head.appendChild(style);

    const yAxis = block.querySelector(".cf-y-axis");
    const steps = 6;
    const stepValue = Math.max(1, Math.floor(maxCount / steps));
    for (let i = 0; i <= maxCount; i += stepValue) {
        const tick = document.createElement("div");
        tick.textContent = i;
        yAxis.prepend(tick);
    }

    const histoEl = block.querySelector(".cf-histogram");
    ratingsSorted.forEach(([rating, count]) => {
        const barWrapper = document.createElement("div");
        barWrapper.className = "cf-bar";

        const bar = document.createElement("a");
        bar.style.height = `${(count / maxCount) * 100}%`;
        bar.style.backgroundColor = getColorByRating(rating);
        bar.href = `https://codeforces.com/problemset?tags=${rating}-${rating}`;
        bar.target = "_blank";

        const label = document.createElement("div");
        label.className = "cf-label";
        label.textContent = rating;

        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);

        histoEl.appendChild(barWrapper);
    });

    const tooltip = document.createElement("div");
    tooltip.className = "cf-tooltip";
    block.querySelector(".cf-histogram-wrapper").appendChild(tooltip);

    histoEl.querySelectorAll(".cf-bar").forEach((barWrapper, i) => {
        const bar = barWrapper.firstElementChild;
        const [rating, count] = ratingsSorted[i];

        bar.addEventListener("mouseenter", () => {
            tooltip.innerHTML = `<div style="font-weight: bold;">${rating}</div><div style="margin-top: 5px; display: flex
; align-items: center;"><span style="background: ${getColorByRating(rating)}; margin-right: 5px; height: 14px; width: 14px; display: inline-block;"></span>Problem solved: ${count}</div>`;
            tooltip.style.opacity = "1";

            const rect = bar.getBoundingClientRect();
            const wrapperRect = block.querySelector(".cf-histogram-wrapper").getBoundingClientRect();

            const x = rect.left + rect.width / 2 - wrapperRect.left;
            const y = rect.top - wrapperRect.top;

            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;

            if (i < ratingsSorted.length / 2) {
                tooltip.style.transform = "translate(10%, -80%)";
            } else {
                tooltip.style.transform = "translate(-110%, -80%)";
            }
        });

        bar.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
        });
    });
}


(async () => {
    const match = location.pathname.match(/^\/profile\/([^/]+)/);
    if (!match) return;
    const handle = match[1];
    await insertDifficultyHistogram(handle);
})();

})();
