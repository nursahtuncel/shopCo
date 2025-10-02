import { uiElements } from "./ui.js";

const slider = () => {
    uiElements.prevButton.addEventListener("click", () => {
        uiElements.slider.scrollLeft -= 420;
    });
    uiElements.nextButton.addEventListener("click", () => {
    uiElements.slider.scrollLeft += 420;

});
}

export { slider };
