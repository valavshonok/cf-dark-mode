interface Problem {
    contestId: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
}

interface AuthorMember {
    handle: string;
}

interface Author {
    contestId: number;
    participantId: number;
    members: AuthorMember[];
    participantType: string;
    ghost: boolean;
    startTimeSeconds: number;
}

interface Submission {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: Problem;
    author: Author;
    programmingLanguage: string;
    verdict?: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}

interface ApiResponse {
    status: string;
    result: Submission[];
}

const CACHE_TTL = 1000 * 60;

export default async function fetchUserSubmissions(handle: string): Promise<Submission[]> {
    const CACHE_KEY = `userSubmission_${handle}_cache`;
    const submissions: Submission[] = [];
    try {
        const cached = await chrome.storage.local.get(CACHE_KEY);
        if (cached[CACHE_KEY]) {
            const { data, timestamp } = cached[CACHE_KEY];
            const isFresh = timestamp && (Date.now() - timestamp < CACHE_TTL);
            if (isFresh) {
                return data as Submission[];
            }
        }

        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`);
        const data: ApiResponse = await res.json();
        if (data.status === "OK") {
            for (const submission of data.result) {
                submissions.push(submission)
            }

            await chrome.storage.local.set({
                [CACHE_KEY]: {
                    data: submissions,
                    timestamp: Date.now(),
                },
            });
        }
    } catch (err) {
        // console.error('Error in fetchUserSubmissions:', err);
    }

    return submissions;
}
