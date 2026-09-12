const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const url = "data/members.json";

async function getMemberData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        displayMembers(data.companies);
    } catch (error) {
        console.error(error);
    }
}

function displayMembers(companies) {
    membersContainer.innerHTML = "";

    companies.forEach((company) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipNames = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        card.innerHTML = `
            <img
                src="images/${company.image}"
                alt="${company.name}"
                loading="lazy"
            >

            <div class="member-info">
                <h2>${company.name}</h2>

                <p class="membership">
                    ${membershipNames[company.membership]}
                </p>

                <p>${company.address}</p>
                <p>${company.phone}</p>

                <a
                    href="${company.website}"
                    target="_blank"
                    rel="noopener"
                >
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    gridButton.classList.add("selected");
    listButton.classList.remove("selected");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

    listButton.classList.add("selected");
    gridButton.classList.remove("selected");
});

getMemberData();