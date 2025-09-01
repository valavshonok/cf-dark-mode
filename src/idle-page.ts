import {profileRectangle, profileHistogram} from "./content/analitics";
import updateInteraction from "./content/interaction";
import { addDifficultColumnInContest, addDifficultyColumnInSubmission } from "./content/table-enhancer";

(async() => {
    await updateInteraction();
    await profileRectangle();
    await profileHistogram();
    await addDifficultColumnInContest();
    await addDifficultyColumnInSubmission();
})();