
import {
    initLayout,
    getPreference,
    savePreference
} from "./common.js";

import {
    fetchProgressions,
    chordsFor,
    populateKeys
} from "./music.js";

initLayout();

const form = document.querySelector("#generator-form");
const keySelect = document.querySelector("#generate-key");
const moodSelect = document.querySelector("#generate-mood");
const output = document.querySelector("#generated-result");
const message = document.querySelector("#generator-message");

populateKeys(keySelect);

keySelect.value = getPreference("preferredKey", "C");
moodSelect.value = getPreference("preferredMood", "all");

let data = [];
let lastId = null;

form.addEventListener("submit", event => {
    event.preventDefault();

    if (!data.length) {
        return;
    }

    const key = keySelect.value;
    const mood = moodSelect.value;

    savePreference("preferredKey", key);
    savePreference("preferredMood", mood);

    let options = data.filter(item =>
        mood === "all" || item.mood === mood
    );

    if (options.length > 1) {
        options = options.filter(item => item.id !== lastId);
    }

    const selected =
        options[Math.floor(Math.random() * options.length)];

    lastId = selected.id;

    const chords = chordsFor(key, selected.degrees);

    output.hidden = false;

    document.querySelector("#generated-title").textContent =
        selected.name;

    document.querySelector("#generated-type").textContent =
        `${selected.genre} · ${selected.mood} · ${selected.tempo} tempo`;

    document.querySelector("#generated-chords")
        .replaceChildren(...chords.map(chord => {
            const box = document.createElement("div");
            box.className = "generated-chord";

            const name = document.createElement("strong");
            name.textContent = chord.name;

            const roman = document.createElement("span");
            roman.textContent = chord.numeral;

            const notes = document.createElement("small");
            notes.textContent = chord.notes.join(" · ");

            box.append(name, roman, notes);

            return box;
        }));

    document.querySelector("#generated-description").textContent =
        selected.description;

    message.textContent =
        "Here is your progression! Press Generate again to explore another.";
});

try {
    data = await fetchProgressions();

    message.textContent =
        `${data.length} progressions ready. Select a key and mood to begin.`;

} catch {
    message.textContent =
        "Unable to load progressions. Refresh to try again.";

    form.querySelector("button").disabled = true;
}
