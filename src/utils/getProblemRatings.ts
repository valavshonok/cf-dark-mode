import fetchProblemRatings from "../api/fetchProblemRatings";
import fetchRatingsFromClist from "../api/fetchRatingsFromClist";

type Rating = number | `*${number}`;

/*
    return map<id, rating>
    item {
        id: "1234F",
        rating: "*123"
    }
*/

export default async function getProblemRatings(): Promise<Map<string, Rating>> {
    const problems = new Map<string, Rating>();
    const cfProblems = await fetchProblemRatings();
    const clistProblems = await fetchRatingsFromClist();

    cfProblems.forEach(v => {
        if (!v.rating || !v.contestId || !v.index)
            return;
        const key = v.contestId + v.index;
        problems.set(key, v.rating);
    });

    clistProblems.forEach(v => {
        if (problems.has(v.id))
            return;
        problems.set(v.id, `*${v.rating}`);
    });    

    return problems;
}