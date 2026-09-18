// Navbar background on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.9)";
    } else {
        navbar.style.background = "rgba(0, 0, 0, 0.3)";
    }
});

// Smooth scroll animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        observer.observe(el);
    });
});
