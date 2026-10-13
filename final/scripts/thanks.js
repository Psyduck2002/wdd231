
import { initLayout } from "./common.js";

initLayout();

const params = new URLSearchParams(location.search);

const fields = [
    "name",
    "email",
    "mood",
    "idea"
];

const summary = document.querySelector("#submitted-values");

if (summary && fields.every(key => params.has(key))) {
    fields.forEach(key => {
        const dt = document.createElement("dt");

        dt.textContent = ({
            name: "Name",
            email: "Email",
            mood: "Favorite mood",
            idea: "Your suggestion"
        })[key];

        const dd = document.createElement("dd");

        dd.textContent = params.get(key);

        summary.append(dt, dd);
    });
} else if (summary) {
    document.querySelector("#thanks-intro").textContent =
        "Submit the suggestion form to see your responses here.";
}
