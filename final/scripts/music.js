
export const KEYS = [
    "C", "C#", "D", "Eb", "E", "F",
    "F#", "G", "Ab", "A", "Bb", "B"
];

const CHROMATIC = [
    "C", "C#", "D", "Eb", "E", "F",
    "F#", "G", "Ab", "A", "Bb", "B"
];

const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

const QUALITIES = ["", "m", "m", "", "", "m", "dim"];

const ROMAN = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];

export function chordsFor(key, degrees) {
    const root = CHROMATIC.indexOf(key);

    if (root < 0) {
        return [];
    }

    return degrees.map(degree => {
        const position = degree - 1;

        const note =
            CHROMATIC[(root + MAJOR_STEPS[position]) % 12];

        return {
            name: `${note}${QUALITIES[position]}`,
            numeral: ROMAN[position],
            notes: chordNotes(root, position)
        };
    });
}

function chordNotes(root, position) {
    const semitone =
        (root + MAJOR_STEPS[position]) % 12;

    const minor = [1, 2, 5].includes(position);
    const diminished = position === 6;

    const intervals = [
        0,
        minor || diminished ? 3 : 4,
        diminished ? 6 : 7
    ];

    return intervals.map(step =>
        CHROMATIC[(semitone + step) % 12]
    );
}

export const moods = [
    "all",
    "upbeat",
    "sad",
    "romantic",
    "calm",
    "dramatic"
];

export function populateKeys(select) {
    KEYS.forEach(key => {
        select.add(new Option(`${key} major`, key));
    });
}

export async function fetchProgressions() {
    try {
        const response = await fetch("data/progressions.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format");
        }

        return data;
    } catch (error) {
        console.error("Could not load progressions:", error);
        throw error;
    }
}

export function cardMarkup(item, key) {
    const chords = chordsFor(key, item.degrees);

    return `
        <article class="progression-card">
            <p class="eyebrow">
                ${item.genre} · ${item.tempo} tempo
            </p>

            <h3>${item.name}</h3>

            <div
                class="chord-row"
                aria-label="Chords: ${chords.map(chord => chord.name).join(", ")}"
            >
                ${chords.map(chord => `
                    <span class="chord">${chord.name}</span>
                `).join("")}
            </div>

            <p class="card-description">
                ${item.description}
            </p>

            <div class="card-actions">
                <span class="mood-label">
                    ${item.mood}
                </span>

                <button
                    type="button"
                    class="text-button"
                    data-details="${item.id}"
                    aria-label="See chord details for ${item.name}"
                >
                    Chord details →
                </button>
            </div>
        </article>
    `;
}
