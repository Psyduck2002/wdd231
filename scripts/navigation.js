const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});

const navLinks = document.querySelectorAll("nav a");
const currentPath = window.location.pathname;

navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (
        currentPath.endsWith(linkPath) ||
        (linkPath === "index.html" && currentPath.endsWith("/wdd231/"))
    ) {
        link.classList.add("active");
    }
});