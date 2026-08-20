"use strict";

const portfolioConfig = {
    name: "KAZI RAFIUL KADER",
    email: "kazirafi09@gmail.com",

    github: "https://github.com/kazirafi09",
    linkedin: "https://www.linkedin.com/in/kazi-rafiul-kader-8888441a9/"
};


const skills = [
    {
        category: "Programming Languages",
        items: [
            "[LANGUAGE]",
            "[LANGUAGE]",
            "[LANGUAGE]"
        ]
    },

    {
        category: "AI / Machine Learning",
        items: [
            "Python",
            "PyTorch",
            "Scikit-learn",
            "[TECHNOLOGY]"
        ]
    },

    {
        category: "Backend Development",
        items: [
            "FastAPI",
            "[FRAMEWORK]",
            "[TECHNOLOGY]"
        ]
    },

    {
        category: "Frontend Development",
        items: [
            "HTML",
            "CSS",
            "JavaScript",
            "[TECHNOLOGY]"
        ]
    },

    {
        category: "Databases",
        items: [
            "[DATABASE]",
            "[DATABASE]"
        ]
    },

    {
        category: "DevOps / Cloud",
        items: [
            "Docker",
            "[CLOUD PLATFORM]",
            "[TECHNOLOGY]"
        ]
    },

    {
        category: "Tools & Technologies",
        items: [
            "Git",
            "GitHub",
            "Linux",
            "[TOOL]"
        ]
    }
];

const projects = [

    {
        title: "[PROJECT NAME]",
        category: "AI / ML",
        year: "2026",

        description:
            "[SHORT PROJECT DESCRIPTION]",

        overview:
            "[LONGER PROJECT OVERVIEW]",

        problem:
            "[WHAT PROBLEM DOES THIS PROJECT SOLVE?]",

        solution:
            "[HOW DID YOU SOLVE IT?]",

        features: [
            "[KEY FEATURE]",
            "[KEY FEATURE]",
            "[KEY FEATURE]"
        ],

        technologies: [
            "Python",
            "PyTorch",
            "[TECHNOLOGY]"
        ],

        image: "",

        video: "",

        github: "[GITHUB PROJECT URL]",

        demo: ""
    },


    {
        title: "[PROJECT NAME]",
        category: "Software",
        year: "2026",

        description:
            "[SHORT PROJECT DESCRIPTION]",

        overview:
            "[LONGER PROJECT OVERVIEW]",

        problem:
            "[WHAT PROBLEM DOES THIS PROJECT SOLVE?]",

        solution:
            "[HOW DID YOU SOLVE IT?]",

        features: [
            "[KEY FEATURE]",
            "[KEY FEATURE]",
            "[KEY FEATURE]"
        ],

        technologies: [
            "[TECHNOLOGY]",
            "[TECHNOLOGY]",
            "[TECHNOLOGY]"
        ],

        image: "",

        video: "",

        github: "[GITHUB PROJECT URL]",

        demo: ""
    },


    {
        title: "[PROJECT NAME]",
        category: "Backend",
        year: "2026",

        description:
            "[SHORT PROJECT DESCRIPTION]",

        overview:
            "[LONGER PROJECT OVERVIEW]",

        problem:
            "[WHAT PROBLEM DOES THIS PROJECT SOLVE?]",

        solution:
            "[HOW DID YOU SOLVE IT?]",

        features: [
            "[KEY FEATURE]",
            "[KEY FEATURE]",
            "[KEY FEATURE]"
        ],

        technologies: [
            "[TECHNOLOGY]",
            "[TECHNOLOGY]",
            "[TECHNOLOGY]"
        ],

        image: "",

        video: "",

        github: "[GITHUB PROJECT URL]",

        demo: ""
    }

];


const experience = [

    {
        role: "AI Engineer Trainee",
        company: "[COMPANY NAME]",
        duration: "[START DATE] — Present",

        description:
            "[DESCRIBE YOUR RESPONSIBILITIES, CONTRIBUTIONS, AND THE TYPE OF SYSTEMS YOU WORK ON.]",

        technologies: [
            "[TECHNOLOGY]",
            "[TECHNOLOGY]",
            "[TECHNOLOGY]"
        ]
    }

];


const elements = {
    body: document.body,

    header: document.getElementById("site-header"),

    menuToggle: document.getElementById("menu-toggle"),
    mobileNav: document.getElementById("mobile-nav"),

    themeToggle: document.getElementById("theme-toggle"),
    themeIcon: document.getElementById("theme-icon"),

    skillsContainer: document.getElementById("skills-container"),

    projectFilters: document.getElementById("project-filters"),
    projectsContainer: document.getElementById("projects-container"),

    experienceContainer:
        document.getElementById("experience-container"),

    modal: document.getElementById("project-modal"),
    modalContent:
        document.getElementById("project-modal-content"),

    backToTop:
        document.getElementById("back-to-top"),

    currentYear:
        document.getElementById("current-year")
};


document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    renderSkills();

    renderProjectFilters();

    renderProjects("all");

    renderExperience();

    initializeNavigation();

    initializeScrollEffects();

    initializeRevealAnimations();

    initializeModal();

    initializeThemeToggle();

    initializeBackToTop();

    updateYear();

});


function renderSkills() {

    if (!elements.skillsContainer) {
        return;
    }

    elements.skillsContainer.innerHTML = skills
        .map((skillGroup, index) => {

            const skillItems = skillGroup.items
                .map(skill => `
                    <span class="skill-tag">
                        ${escapeHTML(skill)}
                    </span>
                `)
                .join("");

            return `
                <article class="skill-group reveal">

                    <div class="skill-group-header">

                        <h3>
                            ${escapeHTML(skillGroup.category)}
                        </h3>

                        <span class="skill-index">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                    </div>

                    <div class="skill-list">
                        ${skillItems}
                    </div>

                </article>
            `;
        })
        .join("");

    observeNewRevealElements();
}

function renderProjectFilters() {

    if (!elements.projectFilters) {
        return;
    }

    const categories = [
        ...new Set(
            projects.map(project => project.category)
        )
    ];

    const buttons = categories
        .map(category => `
            <button
                class="filter-btn"
                type="button"
                data-filter="${escapeAttribute(category)}"
            >
                ${escapeHTML(category)}
            </button>
        `)
        .join("");

    elements.projectFilters.insertAdjacentHTML(
        "beforeend",
        buttons
    );

    elements.projectFilters
        .addEventListener("click", event => {

            const button =
                event.target.closest(".filter-btn");

            if (!button) {
                return;
            }

            document
                .querySelectorAll(".filter-btn")
                .forEach(filterButton => {
                    filterButton.classList.remove("active");
                });

            button.classList.add("active");

            renderProjects(button.dataset.filter);
        });
}

function renderProjects(filter = "all") {

    if (!elements.projectsContainer) {
        return;
    }

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter(
                project => project.category === filter
            );

    if (!filteredProjects.length) {

        elements.projectsContainer.innerHTML = `
            <div class="project-empty">
                No projects found in this category.
            </div>
        `;

        return;
    }

    elements.projectsContainer.innerHTML =
        filteredProjects
            .map((project, index) =>
                createProjectCard(project, index)
            )
            .join("");

    observeNewRevealElements();
}


function createProjectCard(project, index) {

    const imageMarkup = project.image
        ? `
            <img
                src="${escapeAttribute(project.image)}"
                alt="${escapeAttribute(project.title)} project preview"
                loading="lazy"
            >
        `
        : `
            <div class="project-image-placeholder">
                PROJECT PREVIEW ${String(index + 1).padStart(2, "0")}
            </div>
        `;

    const videoBadge = project.video
        ? `
            <div class="project-overlay">
                <span class="video-badge">
                    ▶ DEMO VIDEO
                </span>
            </div>
        `
        : "";

    const techMarkup = project.technologies
        .map(technology => `
            <span>
                ${escapeHTML(technology)}
            </span>
        `)
        .join("");

    return `
        <article
            class="project-card reveal"
            data-project-index="${projects.indexOf(project)}"
        >

            <div class="project-image">
                ${imageMarkup}
                ${videoBadge}
            </div>

            <div class="project-content">

                <div class="project-meta">
                    <span class="project-category">
                        ${escapeHTML(project.category)}
                    </span>

                    <span class="project-year">
                        ${escapeHTML(project.year)}
                    </span>
                </div>

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <p class="project-description">
                    ${escapeHTML(project.description)}
                </p>

                <div class="project-tech">
                    ${techMarkup}
                </div>

                <div class="project-actions">

                    <button
                        type="button"
                        class="project-action"
                        data-project="${projects.indexOf(project)}"
                    >
                        View Details ↗
                    </button>

                    ${
                        project.github
                            ? `
                                <a
                                    href="${escapeAttribute(project.github)}"
                                    class="project-action"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub ↗
                                </a>
                            `
                            : ""
                    }

                </div>

            </div>

        </article>
    `;
}

function initializeModal() {

    if (
        !elements.projectsContainer ||
        !elements.modal
    ) {
        return;
    }

    elements.projectsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("[data-project]");

            if (!button) {
                return;
            }

            const index =
                Number(button.dataset.project);

            openProjectModal(index);
        }
    );

    elements.modal.addEventListener(
        "click",
        event => {

            if (
                event.target.matches("[data-close-modal]") ||
                event.target.closest("[data-close-modal]")
            ) {
                closeProjectModal();
            }

        }
    );

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            elements.modal.classList.contains("open")
        ) {
            closeProjectModal();
        }

    });
}


function openProjectModal(index) {

    const project = projects[index];

    if (!project) {
        return;
    }

    const technologies = project.technologies
        .map(technology => `
            <span>
                ${escapeHTML(technology)}
            </span>
        `)
        .join("");

    const features = project.features
        .map(feature => `
            <li>
                ${escapeHTML(feature)}
            </li>
        `)
        .join("");

    const imageMarkup = project.image
        ? `
            <img
                class="modal-image"
                src="${escapeAttribute(project.image)}"
                alt="${escapeAttribute(project.title)}"
            >
        `
        : "";

    const videoMarkup = project.video
        ? `
            <video
                class="modal-video"
                controls
                preload="metadata"
            >
                <source
                    src="${escapeAttribute(project.video)}"
                    type="video/mp4"
                >
                Your browser does not support video playback.
            </video>
        `
        : "";

    elements.modalContent.innerHTML = `

        ${imageMarkup}

        <p class="modal-category">
            ${escapeHTML(project.category)}
            / ${escapeHTML(project.year)}
        </p>

        <h2 id="modal-title">
            ${escapeHTML(project.title)}
        </h2>

        <p class="modal-overview">
            ${escapeHTML(project.overview)}
        </p>

        <div class="modal-details">

            <div class="modal-detail">

                <h3>THE PROBLEM</h3>

                <p>
                    ${escapeHTML(project.problem)}
                </p>

            </div>


            <div class="modal-detail">

                <h3>THE SOLUTION</h3>

                <p>
                    ${escapeHTML(project.solution)}
                </p>

            </div>


            <div class="modal-detail">

                <h3>KEY FEATURES</h3>

                <ul>
                    ${features}
                </ul>

            </div>


            <div class="modal-detail">

                <h3>TECHNOLOGIES</h3>

                <div class="modal-tech">
                    ${technologies}
                </div>

            </div>

            ${videoMarkup}

            <div class="project-actions">

                ${
                    project.github
                        ? `
                            <a
                                href="${escapeAttribute(project.github)}"
                                class="btn btn-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub ↗
                            </a>
                        `
                        : ""
                }

                ${
                    project.demo
                        ? `
                            <a
                                href="${escapeAttribute(project.demo)}"
                                class="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo ↗
                            </a>
                        `
                        : ""
                }

            </div>

        </div>
    `;

    elements.modal.classList.add("open");
    elements.modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    const closeButton =
        elements.modal.querySelector(".modal-close");

    if (closeButton) {
        closeButton.focus();
    }
}


function closeProjectModal() {

    elements.modal.classList.remove("open");

    elements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

    const video =
        elements.modal.querySelector("video");

    if (video) {
        video.pause();
    }
}


function renderExperience() {

    if (!elements.experienceContainer) {
        return;
    }

    elements.experienceContainer.innerHTML =
        experience
            .map((item, index) => {

                const technologies =
                    item.technologies
                        .map(technology => `
                            <span>
                                ${escapeHTML(technology)}
                            </span>
                        `)
                        .join("");

                return `
                    <article class="experience-item reveal">

                        <div>

                            <div class="experience-date">
                                ${escapeHTML(item.duration)}
                            </div>

                            <div class="experience-company">
                                ${escapeHTML(item.company)}
                            </div>

                        </div>

                        <div class="experience-content">

                            <h3>
                                ${escapeHTML(item.role)}
                            </h3>

                            <p>
                                ${escapeHTML(item.description)}
                            </p>

                            <div class="experience-tech">
                                ${technologies}
                            </div>

                        </div>

                    </article>
                `;
            })
            .join("");

    observeNewRevealElements();
}


function initializeNavigation() {

    if (
        !elements.menuToggle ||
        !elements.mobileNav
    ) {
        return;
    }

    elements.menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                elements.mobileNav.classList.toggle("open");

            elements.menuToggle.classList.toggle(
                "active",
                isOpen
            );

            elements.menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    elements.mobileNav.addEventListener(
        "click",
        event => {

            if (
                event.target.tagName.toLowerCase() === "a"
            ) {

                elements.mobileNav.classList.remove(
                    "open"
                );

                elements.menuToggle.classList.remove(
                    "active"
                );

                elements.menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }
    );
}

function initializeScrollEffects() {

    window.addEventListener(
        "scroll",
        () => {

            const scrollY = window.scrollY;

            if (scrollY > 30) {
                elements.header.classList.add("scrolled");
            } else {
                elements.header.classList.remove("scrolled");
            }

            if (scrollY > 500) {
                elements.backToTop.classList.add("visible");
            } else {
                elements.backToTop.classList.remove("visible");
            }

        },
        { passive: true }
    );

}


const navigationSections = [
    "about",
    "skills",
    "projects",
    "experience",
    "contact"
];

const navigationObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                document
                    .querySelectorAll(
                        ".desktop-nav a, .mobile-nav a"
                    )
                    .forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


navigationSections.forEach(id => {

    const section =
        document.getElementById(id);

    if (section) {
        navigationObserver.observe(section);
    }

});


let revealObserver = null;


function initializeRevealAnimations() {

    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );

    observeNewRevealElements();
}


function observeNewRevealElements() {

    if (!revealObserver) {
        return;
    }

    document
        .querySelectorAll(".reveal:not(.visible)")
        .forEach(element => {
            revealObserver.observe(element);
        });
}

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        elements.body.classList.add(
            "light-theme"
        );

        updateThemeIcon(true);

    } else {

        updateThemeIcon(false);

    }
}


function initializeThemeToggle() {

    if (!elements.themeToggle) {
        return;
    }

    elements.themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                elements.body.classList.toggle(
                    "light-theme"
                );

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon(isLight);

        }
    );
}


function updateThemeIcon(isLight) {

    if (!elements.themeIcon) {
        return;
    }

    elements.themeIcon.textContent =
        isLight ? "☀" : "☾";
}

function initializeBackToTop() {

    if (!elements.backToTop) {
        return;
    }

    elements.backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}

function updateYear() {

    if (!elements.currentYear) {
        return;
    }

    elements.currentYear.textContent =
        new Date().getFullYear();
}

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}