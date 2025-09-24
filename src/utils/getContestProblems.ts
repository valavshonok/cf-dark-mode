import fetchContestProblems from "../api/fetchContestProblems";

interface Problem {
    contestId: number,
    index: string,
    name: string,
    type: string,
    rating?: number;
    points: number,
    tags: string[]
}

/*
    return map<id, rating>
    item {
        id: "1234F",
        rating: "*123"
    }
*/

export default async function getContestProblems(contestId: number): Promise<Map<string, Problem>> {
    const problems = new Map<string, Problem>();
    const contestProblems = await fetchContestProblems(contestId);

    contestProblems.forEach(v => {
        if (!v.contestId || !v.index)
            return;
        const key = v.contestId + v.index;
        problems.set(key, v);
    });

    return problems;
}