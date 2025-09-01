/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/fetchProblemRatings.ts":
/*!****************************************!*\
  !*** ./src/api/fetchProblemRatings.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchProblemRatings)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE_KEY = "problemRatings_cache";
const CACHE_TTL = 1000 * 60 * 60;
function fetchProblemRatings() {
    return __awaiter(this, void 0, void 0, function* () {
        const problems = [];
        try {
            const cached = yield chrome.storage.local.get(CACHE_KEY);
            if (cached[CACHE_KEY]) {
                const { data, timestamp } = cached[CACHE_KEY];
                const isFresh = timestamp && (Date.now() - timestamp < CACHE_TTL);
                if (isFresh) {
                    return data;
                }
            }
            const res = yield fetch('https://codeforces.com/api/problemset.problems');
            const data = yield res.json();
            if (data.status === 'OK') {
                for (const problem of data.result.problems) {
                    problems.push(problem);
                }
                yield chrome.storage.local.set({
                    [CACHE_KEY]: {
                        data: problems,
                        timestamp: Date.now(),
                    },
                });
            }
        }
        catch (err) {
            // console.error('Error: ', err);
        }
        return problems;
    });
}


/***/ }),

/***/ "./src/api/fetchRatingsFromClist.ts":
/*!******************************************!*\
  !*** ./src/api/fetchRatingsFromClist.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchRatingsFromClist)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE_KEY = "ratingsFromClist_cache";
const CACHE_TTL = 1000 * 60 * 60;
function fetchRatingsFromClist() {
    return __awaiter(this, void 0, void 0, function* () {
        const problems = [];
        try {
            const cached = yield chrome.storage.local.get(CACHE_KEY);
            if (cached[CACHE_KEY]) {
                const { data, timestamp } = cached[CACHE_KEY];
                const isFresh = timestamp && (Date.now() - timestamp < CACHE_TTL);
                if (isFresh) {
                    return data;
                }
            }
            const proxy = 'https://corsproxy.io/?';
            const res = yield fetch(proxy + encodeURIComponent('https://clist.by/problems/?resource=1'));
            const html = yield res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const rows = doc.querySelectorAll('tr.show-hidden-activity-on-hover');
            rows.forEach(row => {
                const linkEl = row.querySelector('.problem-name-column a[href*="codeforces.com/contest/"]');
                const ratingEl = row.querySelector('.problem-rating-column span');
                if (!linkEl || !ratingEl)
                    return;
                const match = linkEl.href.match(/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
                if (!match)
                    return;
                const key = match[1] + match[2];
                const rating = parseInt(ratingEl.textContent.trim());
                if (!isNaN(rating)) {
                    problems.push({ id: key, rating: rating });
                }
            });
            if (problems.length) {
                yield chrome.storage.local.set({
                    [CACHE_KEY]: {
                        data: problems,
                        timestamp: Date.now(),
                    },
                });
            }
        }
        catch (err) {
            // console.error('Error:', err);
        }
        return problems;
    });
}


/***/ }),

/***/ "./src/api/fetchUserSubmissions.ts":
/*!*****************************************!*\
  !*** ./src/api/fetchUserSubmissions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchUserSubmissions)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE_TTL = 1000 * 60;
function fetchUserSubmissions(handle) {
    return __awaiter(this, void 0, void 0, function* () {
        const CACHE_KEY = `userSubmission_${handle}_cache`;
        const submissions = [];
        try {
            const cached = yield chrome.storage.local.get(CACHE_KEY);
            if (cached[CACHE_KEY]) {
                const { data, timestamp } = cached[CACHE_KEY];
                const isFresh = timestamp && (Date.now() - timestamp < CACHE_TTL);
                if (isFresh) {
                    return data;
                }
            }
            const res = yield fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`);
            const data = yield res.json();
            if (data.status === "OK") {
                for (const submission of data.result) {
                    submissions.push(submission);
                }
                yield chrome.storage.local.set({
                    [CACHE_KEY]: {
                        data: submissions,
                        timestamp: Date.now(),
                    },
                });
            }
        }
        catch (err) {
            // console.error('Error in fetchUserSubmissions:', err);
        }
        return submissions;
    });
}


/***/ }),

/***/ "./src/content/analitics.ts":
/*!**********************************!*\
  !*** ./src/content/analitics.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   profileHistogram: () => (/* binding */ profileHistogram),
/* harmony export */   profileRectangle: () => (/* binding */ profileRectangle)
/* harmony export */ });
/* harmony import */ var _utils_getUserSubmissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getUserSubmissions */ "./src/utils/getUserSubmissions.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function getColorByRating(rating) {
    if (typeof rating === 'string')
        rating = parseInt(rating.replace(/^\*?/, ''), 10);
    if (typeof rating !== 'number' || isNaN(rating))
        return '#EBEDF0';
    if (rating >= 3000)
        return '#580000';
    if (rating >= 2400)
        return '#ff0000';
    if (rating >= 2100)
        return '#ffb300';
    if (rating >= 1900)
        return '#c000ff';
    if (rating >= 1600)
        return '#007ae6';
    if (rating >= 1400)
        return '#00d8ca';
    if (rating >= 1200)
        return '#00d45c';
    return '#a2a2a2';
}
function recolorSvg(svg, userSubmissions) {
    svg.querySelectorAll('rect.day').forEach(rect => {
        const dateAttr = rect.getAttribute("data-date");
        if (!dateAttr)
            return;
        let timestampSeconds = null;
        if (dateAttr.includes('.')) {
            // DD.MM.YYYY
            const [day, month, year] = dateAttr.split('.').map(Number);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                timestampSeconds = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
            }
        }
        else if (dateAttr.includes('/')) {
            // MM/DD/YYYY
            const [month, day, year] = dateAttr.split('/').map(Number);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                timestampSeconds = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
            }
        }
        if (timestampSeconds === null)
            return;
        const rating = userSubmissions.get(timestampSeconds);
        const color = rating ? getColorByRating(rating) : '#EBEDF0';
        rect.setAttribute("fill", color);
    });
}
function getMaxRatingPerDay(userSubmissions) {
    const submissionsMap = new Map();
    userSubmissions.forEach(sub => {
        if (!sub.rating)
            return;
        const date = new Date(sub.creationTimeSeconds * 1000);
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 1000;
        const existingRating = submissionsMap.get(dayStart);
        const currentRating = typeof sub.rating === 'string'
            ? parseInt(sub.rating.replace(/^\*?/, ''), 10)
            : sub.rating;
        const maxRating = existingRating
            ? Math.max(typeof existingRating === 'string'
                ? parseInt(existingRating.replace(/^\*?/, ''), 10)
                : existingRating, currentRating)
            : currentRating;
        const finalRating = typeof sub.rating === 'string' ? `*${maxRating}` : maxRating;
        submissionsMap.set(dayStart, finalRating);
    });
    return submissionsMap;
}
function getRatingCounts(submissions) {
    const ratingCounts = new Map();
    submissions.forEach(sub => {
        if (!sub.rating)
            return;
        let numericRating;
        if (typeof sub.rating === 'string') {
            numericRating = parseInt(sub.rating.replace(/^\*?/, ''), 10);
        }
        else {
            numericRating = sub.rating;
        }
        numericRating = Math.max(800, Math.floor(numericRating / 100) * 100);
        ratingCounts.set(numericRating, (ratingCounts.get(numericRating) || 0) + 1);
    });
    return ratingCounts;
}
function insertSecondSvg(handle) {
    return __awaiter(this, void 0, void 0, function* () {
        const graphDiv = document.querySelector('#userActivityGraph');
        if (!graphDiv)
            return;
        const origSvg = graphDiv.querySelector('svg');
        if (!origSvg)
            return;
        const existingDiv = document.querySelector('#userDifficultyGraph');
        if (existingDiv)
            existingDiv.remove();
        const userSubmissions = yield (0,_utils_getUserSubmissions__WEBPACK_IMPORTED_MODULE_0__["default"])(handle);
        const submissions = getMaxRatingPerDay(userSubmissions);
        const newDiv = document.createElement('div');
        newDiv.id = 'userDifficultyGraph';
        const cloneSvg = origSvg.cloneNode(true);
        newDiv.appendChild(cloneSvg);
        graphDiv.insertAdjacentElement('afterend', newDiv);
        recolorSvg(cloneSvg, submissions);
    });
}
function insertDifficultyHistogram(handle) {
    return __awaiter(this, void 0, void 0, function* () {
        const submissions = yield (0,_utils_getUserSubmissions__WEBPACK_IMPORTED_MODULE_0__["default"])(handle);
        const ratingCounts = getRatingCounts(submissions);
        const ratingsSorted = [...ratingCounts.entries()].sort((a, b) => a[0] - b[0]);
        if (!ratingsSorted.length)
            return;
        const maxCount = Math.max(...ratingsSorted.map(([, c]) => c));
        if (maxCount == 0) {
            return;
        }
        const existing = document.querySelector("#userDifficultyHistogram");
        if (existing)
            existing.remove();
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
        }
        else {
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
        gap: ${Math.max(10, 30 - ratingsSorted.length)}px;
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
        const yAxis = block.querySelector(".cf-y-axis");
        if (!yAxis)
            return;
        const steps = 6;
        const stepValue = Math.max(1, Math.floor(maxCount / steps));
        for (let i = 0; i <= maxCount; i += stepValue) {
            const tick = document.createElement("div");
            tick.textContent = i.toString();
            yAxis.prepend(tick);
        }
        const histoEl = block.querySelector(".cf-histogram");
        if (!histoEl)
            return;
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
            label.textContent = rating.toString();
            barWrapper.appendChild(bar);
            barWrapper.appendChild(label);
            histoEl.appendChild(barWrapper);
        });
        const tooltip = document.createElement("div");
        tooltip.className = "cf-tooltip";
        const wrapper = block.querySelector(".cf-histogram-wrapper");
        if (wrapper) {
            wrapper.appendChild(tooltip);
        }
        histoEl.querySelectorAll(".cf-bar").forEach((barWrapper, i) => {
            const bar = barWrapper.firstElementChild;
            if (!bar)
                return;
            const [rating, count] = ratingsSorted[i];
            bar.addEventListener("mouseenter", () => {
                tooltip.innerHTML = `<div style="font-weight: bold;">${rating}</div><div style="margin-top: 5px; display: flex
; align-items: center;"><span style="background: ${getColorByRating(rating)}; margin-right: 5px; height: 14px; width: 14px; display: inline-block;"></span>Problem solved: ${count}</div>`;
                tooltip.style.opacity = "1";
                const rect = bar.getBoundingClientRect();
                const wrapper = block.querySelector(".cf-histogram-wrapper");
                if (!wrapper)
                    return;
                const wrapperRect = wrapper.getBoundingClientRect();
                const x = rect.left + rect.width / 2 - wrapperRect.left;
                const y = rect.top - wrapperRect.top;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
                if (i < ratingsSorted.length / 2) {
                    tooltip.style.transform = "translate(10%, -80%)";
                }
                else {
                    tooltip.style.transform = "translate(-110%, -80%)";
                }
            });
            bar.addEventListener("mouseleave", () => {
                tooltip.style.opacity = "0";
            });
        });
    });
}
function profileRectangle() {
    return __awaiter(this, void 0, void 0, function* () {
        const match = location.pathname.match(/^\/profile\/([^/]+)/);
        if (!match)
            return;
        const handle = match[1];
        yield insertSecondSvg(handle);
        const graphDiv = document.querySelector('#userActivityGraph');
        if (graphDiv) {
            const observer = new MutationObserver(() => __awaiter(this, void 0, void 0, function* () {
                yield insertSecondSvg(handle);
            }));
            observer.observe(graphDiv, { childList: true, subtree: true });
        }
    });
}
;
function profileHistogram() {
    return __awaiter(this, void 0, void 0, function* () {
        const match = location.pathname.match(/^\/profile\/([^/]+)/);
        if (!match)
            return;
        const handle = match[1];
        yield insertDifficultyHistogram(handle);
    });
}
;


/***/ }),

/***/ "./src/content/interaction.ts":
/*!************************************!*\
  !*** ./src/content/interaction.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateInteraction)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function modifyProblemsetRedirect() {
    const match = window.location.pathname.match(/^\/problemset\/problem\/(\d+)\/(\w+)$/);
    if (!match)
        return;
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
    if (!match)
        return;
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
    const checkbox = document.getElementById("remember");
    if (checkbox) {
        checkbox.checked = true;
    }
}
function commitAutoCheckDontSendEmail() {
    if (!window.location.pathname.startsWith("/edit-commit"))
        return;
    const checkbox = document.getElementById("toggle-minor-changes");
    if (checkbox) {
        checkbox.checked = true;
    }
}
function updateInteraction() {
    return __awaiter(this, void 0, void 0, function* () {
        modifyProblemsetRedirect();
        modifyProblemsetLink();
        loginAutoCheckRemember();
        commitAutoCheckDontSendEmail();
    });
}


/***/ }),

/***/ "./src/content/table-enhancer.ts":
/*!***************************************!*\
  !*** ./src/content/table-enhancer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDifficultColumnInContest: () => (/* binding */ addDifficultColumnInContest),
/* harmony export */   addDifficultyColumnInSubmission: () => (/* binding */ addDifficultyColumnInSubmission)
/* harmony export */ });
/* harmony import */ var _utils_getProblemRatings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getProblemRatings */ "./src/utils/getProblemRatings.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function extractProblemKey(url) {
    const match = url.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/);
    if (match) {
        return match[1] + match[2];
    }
    return null;
}
function getColorClass(rating) {
    if (rating == "—")
        return '';
    if (typeof rating === 'string') {
        rating = parseInt(rating.replace(/[^\d]/g, ''), 10);
    }
    if (typeof rating !== 'number' || isNaN(rating))
        return '';
    if (rating >= 3000)
        return 'user-legendary';
    if (rating >= 2400)
        return 'user-red';
    if (rating >= 2100)
        return 'user-orange';
    if (rating >= 1900)
        return 'user-violet';
    if (rating >= 1600)
        return 'user-blue';
    if (rating >= 1400)
        return 'user-cyan';
    if (rating >= 1200)
        return 'user-green';
    return '';
}
function addDifficultyToContestTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const table = document.querySelector('table.problems');
        if (!table)
            return;
        const problems = yield (0,_utils_getProblemRatings__WEBPACK_IMPORTED_MODULE_0__["default"])();
        const headerRow = table.querySelector('tr');
        if (headerRow && !headerRow.querySelector('th.difficulty-header')) {
            const th = document.createElement('th');
            th.classList.add('difficulty-header');
            th.style.width = '5em';
            headerRow.appendChild(th);
        }
        const rows = table.querySelectorAll('tr:not(:first-child)');
        rows.forEach((row, index) => {
            var _a;
            if (row.querySelector('td.difficulty-cell'))
                return;
            const problemLink = row.querySelector('td.id a');
            if (!problemLink)
                return;
            const fullUrl = new URL(problemLink.href, location.origin).href;
            const problemKey = extractProblemKey(fullUrl);
            const rating = problemKey ? ((_a = problems.get(problemKey)) !== null && _a !== void 0 ? _a : "—") : "—";
            const colorClass = getColorClass(rating);
            const td = document.createElement('td');
            td.textContent = `${rating}`;
            td.classList.add('difficulty-cell');
            td.style.fontWeight = 'bold';
            td.style.width = '5em';
            if (index % 2 === 0)
                td.classList.add('dark');
            if (colorClass)
                td.classList.add(colorClass);
            row.appendChild(td);
        });
    });
}
function addDifficultyColumn() {
    return __awaiter(this, void 0, void 0, function* () {
        const table = document.querySelector('.status-frame-datatable');
        if (!table)
            return;
        const problems = yield (0,_utils_getProblemRatings__WEBPACK_IMPORTED_MODULE_0__["default"])();
        const headerRow = table.querySelector('tr.first-row');
        if (headerRow && !headerRow.querySelector('th.difficulty-header')) {
            const th = document.createElement('th');
            th.textContent = 'Difficulty';
            th.classList.add('difficulty-header');
            headerRow.appendChild(th);
        }
        const rows = table.querySelectorAll('tr[data-submission-id]');
        rows.forEach((row, index) => {
            var _a;
            if (row.querySelector('td.difficulty-cell'))
                return;
            const problemLink = row.querySelector('td:nth-child(4) a');
            if (!problemLink)
                return;
            const fullUrl = new URL(problemLink.href, location.origin).href;
            const problemKey = extractProblemKey(fullUrl);
            const rating = problemKey ? ((_a = problems.get(problemKey)) !== null && _a !== void 0 ? _a : "—") : "—";
            const colorClass = getColorClass(rating);
            const td = document.createElement('td');
            td.textContent = `${rating}`;
            td.classList.add('difficulty-cell');
            td.style.fontWeight = 'bold';
            if (index % 2 === 0)
                td.classList.add('dark');
            if (colorClass)
                td.classList.add(colorClass);
            row.appendChild(td);
        });
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
function addDifficultColumnInContest() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield chrome.storage.sync.get("cfDifficultyTasksSubmissionsEnabled");
        if (data) {
            yield addDifficultyToContestTable();
        }
    });
}
function addDifficultyColumnInSubmission() {
    return __awaiter(this, void 0, void 0, function* () {
        const runDifficulty = yield chrome.storage.sync.get("cfDifficultyTasksSubmissionsEnabled");
        if (runDifficulty)
            yield addDifficultyColumn();
    });
}
// export async function addAcceptedColumnInSubmission() {
//     const runSolved = await chrome.storage.sync.get("cfAcceptedTasksSubmissionsEnabled");
//     // if (runSolved)
//     //     await addSolvedColumn();
// }


/***/ }),

/***/ "./src/utils/getProblemRatings.ts":
/*!****************************************!*\
  !*** ./src/utils/getProblemRatings.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getProblemRatings)
/* harmony export */ });
/* harmony import */ var _api_fetchProblemRatings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/fetchProblemRatings */ "./src/api/fetchProblemRatings.ts");
/* harmony import */ var _api_fetchRatingsFromClist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/fetchRatingsFromClist */ "./src/api/fetchRatingsFromClist.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/*
    return map<id, rating>
    item {
        id: "1234F",
        rating: "*123"
    }
*/
function getProblemRatings() {
    return __awaiter(this, void 0, void 0, function* () {
        const problems = new Map();
        const cfProblems = yield (0,_api_fetchProblemRatings__WEBPACK_IMPORTED_MODULE_0__["default"])();
        const clistProblems = yield (0,_api_fetchRatingsFromClist__WEBPACK_IMPORTED_MODULE_1__["default"])();
        cfProblems.forEach(v => {
            if (!v.rating || !v.contestId || !v.index)
                return;
            const key = v.contestId + v.index;
            problems.set(key, v.rating);
        });
        clistProblems.forEach(v => {
            if (problems.has(v.id))
                return;
            problems.set(v.id, `*${v.rating}`);
        });
        return problems;
    });
}


/***/ }),

/***/ "./src/utils/getUserSubmissions.ts":
/*!*****************************************!*\
  !*** ./src/utils/getUserSubmissions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUserSubmissions)
/* harmony export */ });
/* harmony import */ var _api_fetchUserSubmissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/fetchUserSubmissions */ "./src/api/fetchUserSubmissions.ts");
/* harmony import */ var _getProblemRatings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getProblemRatings */ "./src/utils/getProblemRatings.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function getUserSubmissions(handle) {
    return __awaiter(this, void 0, void 0, function* () {
        const problemRatings = yield (0,_getProblemRatings__WEBPACK_IMPORTED_MODULE_1__["default"])();
        const userSubmissions = yield (0,_api_fetchUserSubmissions__WEBPACK_IMPORTED_MODULE_0__["default"])(handle);
        const submissions = [];
        const seenProblems = new Set();
        for (const sub of userSubmissions) {
            if (!sub.problem.contestId || !sub.problem.index)
                continue;
            const problemId = `${sub.problem.contestId}${sub.problem.index}`;
            if (sub.verdict === "OK" && !seenProblems.has(problemId)) {
                seenProblems.add(problemId);
                const rating = problemRatings.get(problemId);
                submissions.push({
                    id: problemId,
                    creationTimeSeconds: sub.creationTimeSeconds,
                    rating: rating,
                });
            }
        }
        return submissions;
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/idle-page.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content_analitics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content/analitics */ "./src/content/analitics.ts");
/* harmony import */ var _content_interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/interaction */ "./src/content/interaction.ts");
/* harmony import */ var _content_table_enhancer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content/table-enhancer */ "./src/content/table-enhancer.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0,_content_interaction__WEBPACK_IMPORTED_MODULE_1__["default"])();
    yield (0,_content_analitics__WEBPACK_IMPORTED_MODULE_0__.profileRectangle)();
    yield (0,_content_analitics__WEBPACK_IMPORTED_MODULE_0__.profileHistogram)();
    yield (0,_content_table_enhancer__WEBPACK_IMPORTED_MODULE_2__.addDifficultColumnInContest)();
    yield (0,_content_table_enhancer__WEBPACK_IMPORTED_MODULE_2__.addDifficultyColumnInSubmission)();
}))();

})();

/******/ })()
;