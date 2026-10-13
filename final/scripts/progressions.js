
import {
    initLayout,
    getPreference,
    savePreference
} from "./common.js";

import {
    KEYS,
    chordsFor,
    fetchProgressions,
    cardMarkup,
    populateKeys
} from "./music.js";

initLayout();

const keySelect = document.querySelector("#key-filter");
const moodSelect = document.querySelector("#mood-filter");
const list = document.querySelector("#progression-list");
const count = document.querySelector("#results-count");
const dialog = document.querySelector("#chord-dialog");

populateKeys(keySelect);

const preferredKey = getPreference("preferredKey", "C");

keySelect.value = KEYS.includes(preferredKey)
    ? preferredKey
    : "C";

let data = [];

function showItems() {
    const filtered = data.filter(item =>
        moodSelect.value === "all" ||
        item.mood === moodSelect.value
    );

    count.textContent =
        `${filtered.length} progression${filtered.length === 1 ? "" : "s"} found`;

    list.innerHTML = filtered
        .map(item => cardMarkup(item, keySelect.value))
        .join("") ||
        "<p>No matching progressions. Try another mood.</p>";
}

function showDetails(id) {
    const item = data.find(entry => entry.id === Number(id));

    if (!item) {
        return;
    }

    document.querySelector("#dialog-title").textContent =
        item.name;

    document.querySelector("#dialog-description").textContent =
        item.description;

    const chords = chordsFor(keySelect.value, item.degrees);

    const chordList = document.querySelector("#dialog-chords");

    chordList.replaceChildren();

    chords.forEach(chord => {
        const li = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = `${chord.name} (${chord.numeral})`;

        const notes = document.createElement("span");
        notes.textContent = `Notes: ${chord.notes.join(" – ")}`;

        li.append(title, notes);
        chordList.append(li);
    });

    dialog.showModal();
}

keySelect.addEventListener("change", () => {
    savePreference("preferredKey", keySelect.value);
    showItems();
});

moodSelect.addEventListener("change", showItems);

list.addEventListener("click", event => {
    const button = event.target.closest("[data-details]");

    if (button) {
        showDetails(button.dataset.details);
    }
});

document.querySelector("#close-dialog")
    .addEventListener("click", () => {
        dialog.close();
    });

dialog.addEventListener("click", event => {
    if (event.target === dialog) {
        dialog.close();
    }
});

try {
    data = await fetchProgressions();

    showItems();

    const requested =
        new URLSearchParams(location.search).get("details");

    if (requested) {
        showDetails(requested);
    }

} catch {
    count.textContent =
        "Unable to load the progression library.";
}
