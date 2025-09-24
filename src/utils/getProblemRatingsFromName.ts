import fetchProblemRatings from "../api/fetchProblemRatings";
import fetchRatingsFromClist from "../api/fetchRatingsFromClist";

type Rating = number | `*${number}`;

/*
    return map<name, rating>
    item {
        name: "Hidden Single (Version 2)",
        rating: "*123"
    }
*/

export default async function getProblemRatingsFromName(): Promise<Map<string, Rating>> {
    const problems = new Map<string, Rating>();
    const cfProblems = await fetchProblemRatings();
    const clistProblems = await fetchRatingsFromClist();

    const idToName = new Map<string, string>();

    cfProblems.forEach(v => {
        idToName.set(v.contestId + v.index, v.name);
        if (v.rating) {
            problems.set(v.name, v.rating);
        }
    });

    clistProblems.forEach(v => {
        const name = idToName.get(v.id);
        if (!name) {
            return;
        }
        
        if (problems.has(name)) {
            return;
        }
        problems.set(name, `*${v.rating}`);
    });

    return problems;
}