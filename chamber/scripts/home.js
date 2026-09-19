const apiKey = "c004ab26d44136b1a0346511787cbf16";

const latitude = 38.5816;
const longitude = -121.4944;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error(error);

        document.querySelector("#current-temp").textContent = "Unavailable";
        document.querySelector("#weather-description").textContent = "Unavailable";
        document.querySelector("#forecast").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}

function displayCurrentWeather(data) {
    const temperature = document.querySelector("#current-temp");
    const description = document.querySelector("#weather-description");

    temperature.textContent = `${Math.round(data.main.temp)}°F`;

    description.textContent = data.weather[0].description;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-day");

        forecastCard.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${Math.round(day.main.temp)}°F</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to retrieve member data.");
        }

        const data = await response.json();

        const qualifiedMembers = data.companies.filter(company =>
            company.membership === 2 || company.membership === 3
        );

        shuffleMembers(qualifiedMembers);

        const selectedMembers = qualifiedMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error(error);

        document.querySelector("#spotlights").innerHTML =
            "<p>Member spotlights are currently unavailable.</p>";
    }
}

function shuffleMembers(members) {
    for (let i = members.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [members[i], members[randomIndex]] =
            [members[randomIndex], members[i]];
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector("#spotlights");

    spotlightContainer.innerHTML = "";

    members.forEach(company => {
        const membershipLevel =
            company.membership === 3 ? "Gold Member" : "Silver Member";

        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${company.name}</h3>

            <img
                src="images/${company.image}"
                alt="${company.name} logo"
                loading="lazy"
            >

            <p>${company.address}</p>
            <p>${company.phone}</p>

            <p>
                <a href="${company.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p class="membership">
                <strong>${membershipLevel}</strong>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getWeather();
getSpotlights();