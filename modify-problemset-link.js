(function () {
  const match = window.location.pathname.match(/^\/problemset\/problem\/(\d+)\/\w+$/);

  if (!match) return;

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
})();
