// Logica da Tela de Abertura (Splash Screen)
const splash = document.getElementById('splash-screen');
if (splash) {
    const dismiss = () => {
        if (!splash.classList.contains('hidden')) {
            splash.classList.add('hidden');
            setTimeout(() => {
                const main = document.getElementById('main-content');
                if (main) main.focus();
                document.querySelectorAll('.animate').forEach(el => {
                    observer.observe(el);
                });
            }, 500);
        }
    };

    splash.addEventListener('click', dismiss);
    splash.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            dismiss();
        }
    });
    // also auto-hide after 6 seconds for impatient users
    setTimeout(dismiss, 6000);
}

// enable smooth scrolling behavior for anchor navigation
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Observador para Animacoes ao Scroll (Improved)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on appearance order
            setTimeout(() => {
                entry.target.classList.add('fadeInUp');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
});

// Countdown Timer
function startCountdown() {
    // Use local time: 28 March 2026 at 20:00 (local timezone)
    const countdownDate = new Date(2026, 2, 28, 20, 0, 0).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
});

// Interacoes dos botoes de icone
const locationButton = document.querySelector('[data-action="open-location"]');
if (locationButton) {
    locationButton.addEventListener('click', () => {
        window.open('https://www.google.com/maps/search/?api=1&query=Pousada+Na+Morada+Ouro+Fino+MG', '_blank');
    });
}

const manualButton = document.querySelector('[data-action="open-manual"]');
if (manualButton) {
    manualButton.addEventListener('click', () => {
        const manualSection = document.getElementById('manual-convidado');
        if (manualSection) {
            if (manualSection.classList.contains('manual-hidden')) {
                manualSection.classList.remove('manual-hidden');
                manualSection.classList.add('manual-visible');
            }
            manualSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
