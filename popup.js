const toggleTheme = document.getElementById('themeToggle');
const toggleProblemsetRedirect = document.getElementById('problemsetRedirectToggle');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.storage.sync.get("cfThemeEnabled", (data) => {
    toggleTheme.checked = data.cfThemeEnabled || false;
  });
  chrome.storage.sync.get("cfProblemsetredirectEnabled", (data) => {
    toggleProblemsetRedirect.checked = data.cfProblemsetredirectEnabled || false;
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
