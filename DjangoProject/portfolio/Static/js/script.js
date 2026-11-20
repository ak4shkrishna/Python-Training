document.addEventListener("DOMContentLoaded", () => {
    // Enable progressive scroll-reveal styles
    document.body.classList.add("js-ready");

    // =========================================
    // 1. Dark / Light Theme Toggle (Dark Default)
    // =========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
        themeToggleBtn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    });

    // =========================================
    // 2. Mobile Menu Toggle
    // =========================================
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });

    // =========================================
    // 3. Cursor-Tracking Spotlight on Bento Cards
    // =========================================
    const bentoCards = document.querySelectorAll(".bento-card");

    bentoCards.forEach(card => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // =========================================
    // 4. Scroll-Triggered Reveal Animations
    // =========================================
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================================
    // 5. Interactive Welcome Greeting Button
    // =========================================
    const welcomeBtn = document.getElementById("welcome-btn");
    const welcomeMessage = document.getElementById("welcome-message");

    welcomeBtn.addEventListener("click", () => {
        const hour = new Date().getHours();
        let greeting = "Welcome to my portfolio!";

        if (hour < 12) {
            greeting = "☀️ Good morning! Glad you stopped by — scroll down to explore my builds.";
        } else if (hour < 18) {
            greeting = "👋 Good afternoon! Take a look at my Django & Python projects below.";
        } else {
            greeting = "🌙 Good evening! Thanks for visiting my developer portfolio.";
        }

        welcomeMessage.textContent = greeting;
        welcomeMessage.hidden = false;
        console.log("Welcome interaction:", greeting);
    });

    // =========================================
    // 6. Live Project Category Filtering
    // =========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // =========================================
    // 7. One-Click Copy for Email & Phone
    // =========================================
    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const textToCopy = button.getAttribute("data-copy");
            const originalLabel = button.textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);
                button.textContent = "Copied! ✅";
                setTimeout(() => {
                    button.textContent = originalLabel;
                }, 2000);
            } catch (err) {
                console.log("Copied value:", textToCopy);
            }
        });
    });

    // =========================================
    // 8. Contact Form Frontend Demonstration
    // =========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        console.log("=== Contact Form Submission (Frontend Demo) ===");
        console.log({ name, email, subject, message });

        formStatus.textContent = `Thanks, ${name}! Your message about "${subject}" has been logged (frontend demo).`;
        formStatus.hidden = false;

        contactForm.reset();
    });
});