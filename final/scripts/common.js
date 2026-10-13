
export function initLayout() {
    const menu = document.querySelector("#menu-button");
    const nav = document.querySelector("#primary-navigation");

    menu?.addEventListener("click", () => {
        const expanded = menu.getAttribute("aria-expanded") === "true";

        menu.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("open", !expanded);
    });

    nav?.querySelectorAll("a").forEach(link => {
        if (
            link.pathname === window.location.pathname ||
            (
                window.location.pathname.endsWith("/") &&
                link.getAttribute("href") === "index.html"
            )
        ) {
            link.setAttribute("aria-current", "page");
        }
    });

    document.querySelector("#year").textContent =
        new Date().getFullYear();

    const last = document.querySelector("#last-modified");

    if (last) {
        last.textContent = document.lastModified;
    }
}

export function getPreference(name, fallback) {
    try {
        return localStorage.getItem(name) || fallback;
    } catch {
        return fallback;
    }
}

export function savePreference(name, value) {
    try {
        localStorage.setItem(name, value);
    } catch {
        // Storage may be unavailable.
    }
}
