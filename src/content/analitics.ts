import getUserSubmissions from "../utils/getUserSubmissions";

type Rating = number | `*${number}` | "-";

interface Submission {
    id: string;
    creationTimeSeconds: number;
    rating?: number | `*${number}`;
}

function getColorByRating(rating?: Rating) {
    if (typeof rating === 'string') 
        rating = parseInt(rating.replace(/^\*?/, ''), 10);
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

function recolorSvg(svg: SVGSVGElement, userSubmissions: Map<number, Rating>) {
    svg.querySelectorAll<SVGRectElement>('rect.day').forEach(rect => {
        const dateAttr = rect.getAttribute("data-date");
        if (!dateAttr) return;

        let timestampSeconds: number | null = null;

        if (dateAttr.includes('.')) {
            // DD.MM.YYYY
            const [day, month, year] = dateAttr.split('.').map(Number);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                timestampSeconds = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
            }
        } else if (dateAttr.includes('/')) {
            // MM/DD/YYYY
            const [month, day, year] = dateAttr.split('/').map(Number);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                timestampSeconds = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
            }
        }

        if (timestampSeconds === null) return;
        const rating = userSubmissions.get(timestampSeconds);
        const color = rating ? getColorByRating(rating) : '#EBEDF0';
        rect.setAttribute("fill", color);
    });
}

function getMaxRatingPerDay(userSubmissions: Submission[]): Map<number, Rating> {
    const submissionsMap = new Map<number, Rating>();

    userSubmissions.forEach(sub => {
        if (!sub.rating) return;
        const date = new Date(sub.creationTimeSeconds * 1000);
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 1000;

        const existingRating = submissionsMap.get(dayStart);
        const currentRating = typeof sub.rating === 'string'
            ? parseInt(sub.rating.replace(/^\*?/, ''), 10)
            : sub.rating;

        const maxRating = existingRating
            ? Math.max(
                typeof existingRating === 'string'
                    ? parseInt(existingRating.replace(/^\*?/, ''), 10)
                    : existingRating,
                currentRating
            )
            : currentRating;
        const finalRating: Rating = typeof sub.rating === 'string' ? `*${maxRating}` : maxRating;

        submissionsMap.set(dayStart, finalRating);
    });

    return submissionsMap;
}

function getRatingCounts(submissions: Submission[]): Map<number, number> {
    const ratingCounts = new Map<number, number>();

    submissions.forEach(sub => {
        if (!sub.rating) return;
        let numericRating: number;
        if (typeof sub.rating === 'string') {
            numericRating = parseInt(sub.rating.replace(/^\*?/, ''), 10);
        } else {
            numericRating = sub.rating;
        }
        numericRating = Math.max(800, Math.floor(numericRating / 100) * 100);
        ratingCounts.set(numericRating, (ratingCounts.get(numericRating) || 0) + 1);
    });

    return ratingCounts;
}


async function insertSecondSvg(handle: string) {
    const graphDiv = document.querySelector('#userActivityGraph');
    if (!graphDiv) return;

    const origSvg = graphDiv.querySelector('svg');
    if (!origSvg) return;

    const existingDiv = document.querySelector('#userDifficultyGraph');
    if (existingDiv) existingDiv.remove();

    const userSubmissions = await getUserSubmissions(handle);
    const submissions = getMaxRatingPerDay(userSubmissions);

    const newDiv = document.createElement('div');
    newDiv.id = 'userDifficultyGraph';
    const cloneSvg = origSvg.cloneNode(true) as SVGSVGElement;
    newDiv.appendChild(cloneSvg);
    graphDiv.insertAdjacentElement('afterend', newDiv);


    recolorSvg(cloneSvg, submissions);
}

async function insertDifficultyHistogram(handle: string) {
    const submissions = await getUserSubmissions(handle);

    const ratingCounts = getRatingCounts(submissions);

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
        transition: left 0.3s ease, top 0.3s ease, opacity 0.5s ease !important;
        white-space: nowrap;
        z-index: 9999;
        opacity: 0;
    }
    `;
    document.head.appendChild(style);

    const yAxis = block.querySelector<HTMLDivElement>(".cf-y-axis");
    if (!yAxis) 
        return;

    const steps = 6;
    const stepValue = Math.max(1, Math.floor(maxCount / steps));

    for (let i = 0; i <= maxCount; i += stepValue) {
        const tick = document.createElement("div");
        tick.textContent = i.toString();
        yAxis.prepend(tick);
    }

    const histoEl = block.querySelector<HTMLDivElement>(".cf-histogram");
    if (!histoEl) 
        return;

    ratingsSorted.forEach(([rating, count]: [number, number]) => {
        const barWrapper = document.createElement("div");
        barWrapper.className = "cf-bar";

        const bar = document.createElement("a") as HTMLAnchorElement;
        bar.style.height = `${(count / maxCount) * 100}%`;
        bar.style.backgroundColor = getColorByRating(rating);
        bar.href = `https://codeforces.com/problemset?tags=${rating}-${rating}`;
        bar.target = "_blank";

        const label = document.createElement("div");
        label.className = "cf-label";
        label.textContent = rating.toString();

        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);

        histoEl.appendChild(barWrapper);
    });

    const tooltip = document.createElement("div");
    tooltip.className = "cf-tooltip";
    const wrapper = block.querySelector<HTMLDivElement>(".cf-histogram-wrapper");
    if (wrapper) {
        wrapper.appendChild(tooltip);
    }

    histoEl.querySelectorAll(".cf-bar").forEach((barWrapper, i) => {
        const bar = barWrapper.firstElementChild as HTMLAnchorElement | null;
        if (!bar) 
            return;
        const [rating, count] = ratingsSorted[i];

        bar.addEventListener("mouseenter", () => {
            tooltip.innerHTML = `<div style="font-weight: bold;">${rating}</div><div style="margin-top: 5px; display: flex
; align-items: center;"><span style="background: ${getColorByRating(rating)}; margin-right: 5px; height: 14px; width: 14px; display: inline-block;"></span>Problem solved: ${count}</div>`;
            tooltip.style.opacity = "1";

            const rect = bar.getBoundingClientRect();
            const wrapper = block.querySelector<HTMLDivElement>(".cf-histogram-wrapper");
            if (!wrapper) 
                return;
            const wrapperRect = wrapper.getBoundingClientRect();

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



export async function profileRectangle() {
    const match = location.pathname.match(/^\/profile\/([^/]+)/);
    if (!match) 
        return;
    const handle = match[1];

    await insertSecondSvg(handle);

    const graphDiv = document.querySelector('#userActivityGraph');
    if (graphDiv) {
        const observer = new MutationObserver(async () => {
            await insertSecondSvg(handle);
        });
        observer.observe(graphDiv, { childList: true, subtree: true });
    }
};


export async function profileHistogram() {
    const match = location.pathname.match(/^\/profile\/([^/]+)/);
    if (!match) 
        return;
    const handle = match[1];
    await insertDifficultyHistogram(handle);
};