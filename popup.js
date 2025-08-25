const toggleTheme = document.getElementById('themeToggle');
const toggleProblemsetRedirect = document.getElementById('problemsetRedirectToggle');
const toggleDifficultyTasksSubmissions = document.getElementById('difficultyTasksSubmissionsToggle');
const toggleAcceptedTasksSubmissions = document.getElementById('acceptedTasksSubmissionsToggle');
const clearCacheButton = document.getElementById('clearCacheButton');
const lastClearText = document.getElementById("lastClearText");

chrome.storage.local.get("lastCacheClear", (data) => {
    if (data.lastCacheClear) lastClearText.textContent = "Last clear " + data.lastCacheClear;
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.storage.sync.get("cfThemeEnabled", (data) => {
    toggleTheme.checked = data.cfThemeEnabled || false;
  });
  chrome.storage.sync.get("cfProblemsetredirectEnabled", (data) => {
    toggleProblemsetRedirect.checked = data.cfProblemsetredirectEnabled || false;
  });
  chrome.storage.sync.get("cfDifficultyTasksSubmissionsEnabled", (data) => {
    toggleDifficultyTasksSubmissions.checked = data.cfDifficultyTasksSubmissionsEnabled || false;
  });
  chrome.storage.sync.get("cfAcceptedTasksSubmissionsEnabled", (data) => {
    toggleAcceptedTasksSubmissions.checked = data.cfAcceptedTasksSubmissionsEnabled || false;
  });
});

toggleTheme.addEventListener("change", () => {
  const enabled = toggleTheme.checked;
  chrome.storage.sync.set({ cfThemeEnabled: enabled });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab.url.includes("codeforces.com")) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (enabled) => {
        if (enabled) {
          document.body.classList.add("cf-theme");
        } else {
          document.body.classList.remove("cf-theme");
        }
      },
      args: [enabled]
    });
  });
});

toggleProblemsetRedirect.addEventListener("change", () => {
  const enabled = toggleProblemsetRedirect.checked;
  chrome.storage.sync.set({ cfProblemsetredirectEnabled: enabled });
});

toggleDifficultyTasksSubmissions.addEventListener("change", () => {
  const enabled = toggleDifficultyTasksSubmissions.checked;
  chrome.storage.sync.set({ cfDifficultyTasksSubmissionsEnabled: enabled });
});

toggleAcceptedTasksSubmissions.addEventListener("change", () => {
  const enabled = toggleAcceptedTasksSubmissions.checked;
  chrome.storage.sync.set({ cfAcceptedTasksSubmissionsEnabled: enabled });
});

clearCacheButton.addEventListener("click", () => {
  chrome.storage.local.clear(() => {
        const now = new Date().toLocaleString();
        chrome.storage.local.set({ lastCacheClear: now }, () => {
            lastClearText.textContent = "Last clear " + now;
        });
    });
});

