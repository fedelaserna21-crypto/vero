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
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // Form Submission to Google Sheets usando iframe
    const contactForm = document.getElementById('contactForm');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbye1GVTKO-2-juEl9XwTW-Ikth4o12mZqUivrkYqn99GNbR0CC9-8KtGW0gmjO5drpI/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Crear iframe oculto para enviar el formulario
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Crear formulario temporal
            const tempForm = document.createElement('form');
            tempForm.action = SCRIPT_URL;
            tempForm.method = 'POST';
            tempForm.target = 'hidden-iframe';

            // Agregar campos
            const fields = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            for (let key in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                tempForm.appendChild(input);
            }

            document.body.appendChild(tempForm);
            tempForm.submit();

            // Esperar un segundo y mostrar mensaje de éxito
            setTimeout(() => {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente. Te contactaré pronto 😊');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                
                // Limpiar elementos temporales
                document.body.removeChild(tempForm);
                document.body.removeChild(iframe);
            }, 1000);
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
