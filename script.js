// Gestion du menu hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Recupérer les valeurs
        const formData = new FormData(contactForm);
        
        // Animation du bouton
        const button = contactForm.querySelector('.btn');
        const originalText = button.textContent;
        button.textContent = 'Message envoyé! ✓';
        button.style.background = '#10b981';
        
        // Réinitialiser après 2 secondes
        setTimeout(() => {
            contactForm.reset();
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Effet parallax simple
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Animation des chiffres pour les statistiques (optionnel)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Ajout de feedback au bouton principal
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Observer pour les éléments qui se chargent
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            lazyObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    lazyObserver.observe(el);
});

console.log('Script chargé avec succès! 🚀');
