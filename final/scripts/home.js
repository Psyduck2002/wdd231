
import {
    initLayout,
    getPreference
} from "./common.js";

import {
    fetchProgressions,
    cardMarkup
} from "./music.js";

initLayout();

const popular = document.querySelector("#popular-cards");

try {
    const data = await fetchProgressions();

    const key = getPreference("preferredKey", "C");

    popular.innerHTML = data
        .slice(0, 3)
        .map(item => cardMarkup(item, key))
        .join("");

    popular.addEventListener("click", event => {
        const button = event.target.closest("[data-details]");

        if (button) {
            location.href =
                `progressions.html?details=${button.dataset.details}`;
        }
    });

} catch {
    popular.textContent =
        "Progressions could not load. Please refresh and try again.";
}
