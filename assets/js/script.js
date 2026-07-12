document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        const setMenuOpen = (isOpen) => {
            menuToggle.classList.toggle('active', isOpen);
            mobileNav.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        };

        menuToggle.addEventListener('click', () => {
            setMenuOpen(!mobileNav.classList.contains('active'));
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('nav')) {
                setMenuOpen(false);
            }
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });
    }

    document.querySelectorAll('.nav-btn, .arrow a').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const selector = anchor.getAttribute('href');

            if (!selector || !selector.startsWith('#')) {
                return;
            }

            const target = document.querySelector(selector);

            if (target && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const animatedElements = document.querySelectorAll(
        '.skills-section, .interests-section, .contact-section'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        animatedElements.forEach((element) => {
            element.classList.add('js-reveal');
            observer.observe(element);
        });
    }
});
