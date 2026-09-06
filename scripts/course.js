const courses = [
    { subject: "CSE", number: 110, credits: 2, completed: true },
    { subject: "WDD", number: 130, credits: 2, completed: true },
    { subject: "CSE", number: 111, credits: 2, completed: true },
    { subject: "CSE", number: 210, credits: 2, completed: false },
    { subject: "WDD", number: 131, credits: 2, completed: true },
    { subject: "WDD", number: 231, credits: 2, completed: false }
];

const courseContainer = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseContainer.appendChild(card);
    });

    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `The total credits for course listed above is ${credits}`;
}

function setActiveButton(selectedButton) {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.classList.remove("active-filter");
    });

    selectedButton.classList.add("active-filter");
}

allButton.addEventListener("click", () => {
    displayCourses(courses);
    setActiveButton(allButton);
});

cseButton.addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "CSE"));
    setActiveButton(cseButton);
});

wddButton.addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "WDD"));
    setActiveButton(wddButton);
});

displayCourses(courses);