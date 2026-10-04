import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces(placeList) {
    placeList.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        const description = document.createElement("p");
        description.classList.add("place-description");
        description.textContent = place.description;

        const address = document.createElement("address");
        address.textContent = place.address;

        const button = document.createElement("button");
        button.classList.add("learn-more");
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            window.open(
                place.website,
                "_blank",
                "noopener,noreferrer"
            );
        });

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

function displayVisitMessage() {
    const currentVisit = Date.now();
    const previousVisit = Number(localStorage.getItem("lastVisit"));

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (!previousVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const difference = currentVisit - previousVisit;
        const daysBetween = Math.floor(
            difference / millisecondsPerDay
        );

        if (daysBetween < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";
        } else {
            visitMessage.textContent =
                `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

displayPlaces(places);
displayVisitMessage();