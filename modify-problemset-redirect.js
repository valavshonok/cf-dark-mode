(function () {
  const match = window.location.pathname.match(/^\/problemset\/problem\/(\d+)\/(\w+)$/);

  if (!match) return;

  const contestId = match[1];
  const taskId = match[2];

  chrome.storage.sync.get("cfProblemsetredirectEnabled", (data) => {
    if (data.cfProblemsetredirectEnabled) {
      // Redirect to contest URL    
      const newUrl = `/contest/${contestId}/problem/${taskId}`;
      window.location.replace(newUrl);
    }
  });
})();
