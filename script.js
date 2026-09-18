/* --- PRELOADER LOGIC --- */
const preloader = document.getElementById('preloader');

// Wait for window to fully load
window.addEventListener('load', () => {
    // Add a minimum delay of 1.8 seconds so the cool geometry animation finishes drawing
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 1800);
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- THEME TOGGLE LOGIC --- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Check local storage for theme, default to 'dark'
    const savedTheme = localStorage.getItem('shivraj_theme') || 'dark';

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark');
            body.classList.add('light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Apply initial theme
    applyTheme(savedTheme);

    // Toggle event
    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('shivraj_theme', newTheme);
    });


    /* --- NAVBAR SCROLL EFFECT --- */
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* --- MOBILE MENU LOGIC --- */
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '☰';
        });
    });


    /* --- SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after revealing to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* --- SUBTLE PARALLAX FOR HERO MATH BG --- */
    const mathBg = document.querySelector('.hero-math-bg');
    const heroImage = document.getElementById('heroImage');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            // Move background subtly in opposite direction
            mathBg.style.transform = `translate(calc(-50% + ${mouseX * -30}px), calc(-50% + ${mouseY * -30}px))`;

            // Move portrait very subtly in same direction (SCALED OFFSET to 40px)
            heroImage.style.transform = `translate(${mouseX * 10}px, calc(40px + ${mouseY * 10}px))`;
        }
    });

    // Reset image transform on mouse leave to prevent getting stuck (SCALED OFFSET to 40px)
    document.querySelector('.hero').addEventListener('mouseleave', () => {
        mathBg.style.transform = `translate(-50%, -50%)`;
        heroImage.style.transform = `translate(0, 40px)`;
    });
});
