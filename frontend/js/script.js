
/* ==============================
   MOBILE NAVIGATION
============================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";
        });
    });
}


/* ==============================
   AUTOMATIC FOOTER YEAR
============================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==============================
   ACTIVE NAVIGATION LINK
============================== */

const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (!linkPage) return;

    const normalizedLink = linkPage.split("/").pop().toLowerCase();

    if (normalizedLink === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});


/* =========================
   LIGHT / DARK MODE TOGGLE
========================= */

const themeButton = document.createElement("button");

themeButton.id = "theme-toggle";
themeButton.type = "button";
themeButton.setAttribute("aria-label", "Switch to dark mode");
themeButton.style.cssText = `
    border: 1px solid var(--border);
    background: var(--white);
    color: var(--dark);
    padding: 9px 12px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 18px;
    margin-left: 12px;
    transition: 0.3s ease;
`;

themeButton.innerHTML = "🌙";

/* Add the button to the navigation */
const navbar = document.querySelector(".navbar");
const menuToggleButton = document.getElementById("menu-toggle");

/* Add the button after the Contact button */
const navLinksContainer = document.getElementById("nav-links");

if (navLinksContainer) {
    navLinksContainer.appendChild(themeButton);
}

/* Add dark-mode styling */
const themeStyles = document.createElement("style");

themeStyles.textContent = `
    body {
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    body.dark-mode {
        --dark: #f5f5f5;
        --text: #cccccc;
        --white: #1e1e1e;
        --light-bg: #181818;
        --border: #383838;

        background: #121212;
        color: #f5f5f5;
    }

    body.dark-mode .header,
    body.dark-mode .footer,
    body.dark-mode .contact-form-wrapper,
    body.dark-mode .project-card,
    body.dark-mode .service-card,
    body.dark-mode .blog-card {
        background: #1e1e1e;
        color: #f5f5f5;
        border-color: #383838;
    }

    body.dark-mode .hero,
    body.dark-mode .contact-hero {
        background: linear-gradient(135deg, #202020, #292929, #34271e);
    }

    body.dark-mode .about,
    body.dark-mode .services,
    body.dark-mode .blog,
    body.dark-mode .contact,
    body.dark-mode .contact-cta {
        background: #181818;
    }

    body.dark-mode .work {
        background: #151515;
    }

    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode .section-title,
    body.dark-mode .logo,
    body.dark-mode .nav-links a {
        color: #f5f5f5;
    }

    body.dark-mode p,
    body.dark-mode .section-description {
        color: #cccccc;
    }

    body.dark-mode .contact-form input,
    body.dark-mode .contact-form textarea {
        background: #292929;
        color: #f5f5f5;
        border-color: #444444;
    }

    body.dark-mode .contact-note,
    body.dark-mode .service-icon,
    body.dark-mode .contact-method-icon {
        background: #292929;
        color: #ffb347;
    }

    body.dark-mode .project-tags span {
        background: #292929;
        color: #ffb347;
    }

    body.dark-mode .nav-links a.active {
        color: #ff9a44;
    }

    body.dark-mode .menu-toggle {
        color: #f5f5f5;
    }

    #theme-toggle:hover {
        transform: scale(1.08);
    }

    @media (max-width: 760px) {
        #theme-toggle {
            margin-left: auto;
            margin-right: 12px;
        }
    }
`;

document.head.appendChild(themeStyles);

/* Apply and remember the selected theme */
function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    themeButton.innerHTML = isDark ? "☀️" : "🌙";

    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeButton.title = isDark ? "Light Mode" : "Dark Mode";
}

/* Restore the saved theme, if one exists */
const savedTheme = localStorage.getItem("nuelnexus-theme");

applyTheme(savedTheme === "dark");

/* Toggle between light and dark mode */
themeButton.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-mode");

    applyTheme(isDark);

    localStorage.setItem(
        "nuelnexus-theme",
        isDark ? "dark" : "light"
    );
});