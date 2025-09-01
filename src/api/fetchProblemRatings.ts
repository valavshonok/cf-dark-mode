interface Problem {
    contestId: number,
    index: string,
    name: string,
    type: string,
    rating?: number;
    points: number,
    tags: string[]
}

interface ApiResponse {
  status: string;
  result: {
    problems: Problem[];
  };
}

const CACHE_KEY = "problemRatings_cache";
const CACHE_TTL = 1000 * 60 * 60;

export default async function fetchProblemRatings(): Promise<Problem[]> {
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


        const res = await fetch('https://codeforces.com/api/problemset.problems');
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