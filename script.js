document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Navbar Scroll Effect
       ========================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Mobile Hamburger Menu
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('nav-active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Normal links will just work, no SPA logic needed.

    /* ==========================================
       Intersection Observer for Scroll Reveals
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only trigger once
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    /* ==========================================
       Livestream Countdown Timer
       ========================================== */
    // Set event date (June 5, 2026 17:00:00)
    const eventDate = new Date("June 5, 2026 17:00:00").getTime();
    
    const countdownElement = document.getElementById('countdown');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = `<div class="cd-box"><span>LIVE</span><p>Event has started</p></div>`;
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="cd-box">
                <span id="days">${days < 10 ? '0' + days : days}</span>
                <p>Days</p>
            </div>
            <div class="cd-box">
                <span id="hours">${hours < 10 ? '0' + hours : hours}</span>
                <p>Hours</p>
            </div>
            <div class="cd-box">
                <span id="minutes">${minutes < 10 ? '0' + minutes : minutes}</span>
                <p>Minutes</p>
            </div>
            <div class="cd-box">
                <span id="seconds">${seconds < 10 ? '0' + seconds : seconds}</span>
                <p>Seconds</p>
            </div>
        `;
    };

    // Initial call
    if(countdownElement) {
        updateCountdown();
        // Update every second
        const timerInterval = setInterval(updateCountdown, 1000);
    }
});
