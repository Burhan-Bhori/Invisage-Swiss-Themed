// 1. TYPEWRITER EFFECT
const phrases = ["Client Magnet.", "Revenue Engine.", "Trusted Brand."];
const typeHtml = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typeHtml.innerText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeHtml.innerText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => typeWriter());


// 2. SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.transform = 'translateY(30px)'; // Initial state for JS animation
    observer.observe(el);
});


// 3. STICKY CTA SCROLL TOGGLE
const stickyBar = document.getElementById('stickyCta');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        stickyBar.classList.add('visible');
    } else {
        stickyBar.classList.remove('visible');
    }
});


// 4. TESTIMONIAL CAROUSEL
const testimonials = document.querySelectorAll('.testimonial-card');
let testIndex = 0;

setInterval(() => {
    testimonials[testIndex].classList.remove('active');
    testIndex = (testIndex + 1) % testimonials.length;
    testimonials[testIndex].classList.add('active');
}, 5000);


// 5. SIGNAL WAVE ANIMATION GENERATOR
function generateBars(containerSelector, count, isNoise) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const bar = document.createElement('div');
        bar.classList.add('signal-bar');

        // Randomize initial delay so they don't move in unison
        if (isNoise) {
            // Chaos
            bar.style.height = Math.random() * 100 + "%";
            bar.style.animationDelay = Math.random() + 's';
        } else {
            // Pattern (Sine Wave ish)
            const delay = i * 0.1;
            bar.style.animationDelay = delay + 's';
        }

        container.appendChild(bar);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateBars('.noise-track', 40, true);
    generateBars('.signal-track-clean', 40, false);
});

// 6. VIDEO LOGIC
function toggleVideo() {
    const video = document.getElementById('blueprintVideo');
    const overlay = document.querySelector('.video-overlay');

    if (video.paused) {
        video.play();
        overlay.classList.add('hidden');
        video.controls = true; // Show native controls once playing
    } else {
        video.pause();
        overlay.classList.remove('hidden');
        video.controls = false;
    }
}
