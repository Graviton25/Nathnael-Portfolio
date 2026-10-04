const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const navbar = document.querySelector(".navbar");


// ==========================================
// MOBILE NAVIGATION
// ==========================================

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuToggle.textContent =
        navLinks.classList.contains("open")
            ? "✕"
            : "☰";
});


document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});


// ==========================================
// DARK MODE
// ==========================================

const savedTheme =
    localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "portfolioTheme",
        isDark ? "dark" : "light"
    );

    themeToggle.textContent =
        isDark ? "☀" : "◐";
});


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

window.addEventListener("scroll", () => {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

});


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `.nav-links a[href="#${sectionId}"]`
                );

            activeLink?.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    updateActiveLink
);

updateActiveLink();


// ==========================================
// SCROLL REVEAL SYSTEM
// ==========================================

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".about-card, " +
    ".project-card, " +
    ".skill-category, " +
    ".contact-box"
);

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ==========================================
// PROJECT CARD TILT
// ==========================================

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2.5;

        const rotateY =
            ((x - centerX) / centerX) * 2.5;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";
    });

});


// ==========================================
// MAGNETIC BUTTONS
// ==========================================

const magneticButtons =
    document.querySelectorAll(".btn");

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect =
            button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px,
                       ${y * 0.12}px)`;
    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";
    });

});


// ==========================================
// CURSOR GLOW
// ==========================================

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 800) {
        return;
    }

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;
});


// ==========================================
// HERO PARALLAX
// ==========================================

const heroVisual =
    document.querySelector(".hero-visual");

window.addEventListener("scroll", () => {

    if (!heroVisual) {
        return;
    }

    if (window.scrollY > window.innerHeight) {
        return;
    }

    const movement =
        window.scrollY * 0.08;

    heroVisual.style.transform =
        `translateY(${movement}px)`;
});


// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";
    }

});
