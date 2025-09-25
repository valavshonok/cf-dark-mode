interface Problem {
    contestId: number,
    index: string,
    name: string,
    type: string,
    rating?: number;
    points: number,
    tags: string[]
}

interface Contest {
    id: number,
    name: string,
    type: string,
    phase: string,
    frozen: boolean,
    durationSeconds: number,
    startTimeSeconds: number,
    relativeTimeSeconds: number
}

interface ApiResponse {
  status: string,
  result: {
    contest: Contest,
    problems: Problem[],
    rows: any[]
  };
}

export default async function fetchContestProblems(contestId: number): Promise<Problem[]> {
    const CACHE_KEY = `contest${contestId}_Problems_cache`;
    const CACHE_TTL = 1000 * 60 * 60;

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


        const res = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1&lang=en`);
        const data: ApiResponse = await res.json();

        if (data.status === 'OK') {
            for (const problem of data.result.problems) {
                problems.push(problem)
            }

            await chrome.storage.local.set({
                [CACHE_KEY]: {
                    data: problems,
                    timestamp: Date.now(),
                },
            });
        }
    } catch (err) {
        // console.error('Error: ', err);
    }
    return problems;
}