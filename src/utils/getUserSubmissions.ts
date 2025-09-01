import fetchUserSubmissions from "../api/fetchUserSubmissions";
import getProblemRatings from "./getProblemRatings";

interface Submission {
    id: string;
    creationTimeSeconds: number;
    rating?: number | `*${number}`;
}

export default async function getUserSubmissions(handle: string): Promise<Submission[]> {
    const problemRatings = await getProblemRatings();
    const userSubmissions = await fetchUserSubmissions(handle);
    const submissions: Submission[] = [];

    const seenProblems = new Set<string>();
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
}