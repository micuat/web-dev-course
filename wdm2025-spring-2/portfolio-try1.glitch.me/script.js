// Smooth scroll functionality
document.querySelectorAll('.nav-dots .nav-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
        const sectionId = dot.getAttribute('data-section');
        let targetElement;
        
        if (sectionId === 'hero') {
            targetElement = document.querySelector('.portfolio-hero');
        } else if (sectionId === 'projects') {
            targetElement = document.querySelector('#projects');
        } else if (sectionId === 'about') {
            targetElement = document.querySelector('#about');
        } else if (sectionId === 'contact') {
            targetElement = document.querySelector('.portfolio-card:last-child');
        }
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active dot
            document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        }
    });
});

// Update active dot based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Get all sections for scroll spy
    const sections = [
        document.querySelector('.portfolio-hero'),
        document.querySelector('#projects'),
        document.querySelector('#about'),
        document.querySelector('.portfolio-card:last-child')
    ];
    
    // Find the current section
    let currentSectionIndex = 0;
    
    sections.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - windowHeight / 2 && 
            scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
            currentSectionIndex = index;
        }
    });
    
    // Update active dot
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSectionIndex);
    });
});

// Add parallax effect to red circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.red-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.3 + (index * 0.05);
        const translateY = scrolled * speed;
        circle.style.transform = `translateY(${translateY}px)`;
        
        // For the circle-center, we need to maintain its centered position
        if (circle.classList.contains('circle-center')) {
            circle.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
        }
    });
});

// Intersection Observer for animation triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations for portfolio cards
function initializeAnimations() {
    // Reset animations on portfolio cards
    document.querySelectorAll('.portfolio-card, .section-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add special animation for hero section
    const heroSection = document.querySelector('.portfolio-hero');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
            heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
        }, 300);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});