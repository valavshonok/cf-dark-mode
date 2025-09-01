export default function darkMode() {
    const applyClass = () => {
        if (document.body) {
            document.body.classList.add("cf-theme");
        } else {
            requestAnimationFrame(applyClass);
        }
    };

    applyClass()
};