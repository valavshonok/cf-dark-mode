import { getFromSyncStorage } from "../utils/storage";

export default async function darkMode() {
    const applyClass = () => {
        if (document.body) {
            document.body.classList.add("cf-theme");
        } else {
            requestAnimationFrame(applyClass);
        }
    };

    const cfTheme = await getFromSyncStorage<Boolean>("cfThemeEnabled");
    if (cfTheme) {
        applyClass();
    }
};