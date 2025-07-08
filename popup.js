const toggle = document.getElementById('themeToggle');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab.url.includes("codeforces.com")) {
    toggle.disabled = true;
    toggle.parentElement.innerText = "Open codeforces.com";
    return;
  }

  chrome.storage.sync.get("cfThemeEnabled", (data) => {
    toggle.checked = data.cfThemeEnabled || false;
  });
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
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
