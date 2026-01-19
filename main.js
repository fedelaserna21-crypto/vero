/* Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Validar cierre de menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        // Reset manual animation classes from CSS to let JS handle trigger if desired, 
        // or just let them play on load for Hero, and use observer for others.
        // For simplicity, we just add a 'visible' class trigger.
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add visible class styling dynamically or in CSS
    // Let's inject a style rule for .visible or assume inline styles are overriden
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // Form Submission to Google Sheets
    const contactForm = document.getElementById('contactForm');

    // ⚠️ PASO 4: PEGAR AQUÍ LA URL QUE OBTUVISTE EN GOOGLE APPS SCRIPT
    // Debe verse algo así: 'https://script.google.com/macros/s/AKfycbx.../exec'
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLPiZUiDD3Tq7h15H2NmunwatZ7Qdk_OiUWeFWAXRi1IX3fe58c0xkERQTTshQkWyZ/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            if (SCRIPT_URL.includes('PEGAR_AQUI')) {
                alert('⚠️ Falta configurar la URL. Sigue las instrucciones que te dejé en el chat.');
                return;
            }

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
                .then(() => {
                    alert('¡Gracias! Tu mensaje ha sido enviado a Veronica correctamente.');
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Hubo un error. Por favor contáctame por WhatsApp.');
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });

});
