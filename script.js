document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarContent = document.querySelector('.navbar-content');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
    const themeToggleBtnMobileNav = document.getElementById('theme-toggle-mobile-nav');
    const themeToggleDarkIconNav = document.getElementById('theme-toggle-dark-icon-nav');
    const themeToggleLightIconNav = document.getElementById('theme-toggle-light-icon-nav');

    function updateIcons() {
        if (document.documentElement.classList.contains('dark')) {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
            if(themeToggleDarkIconMobile) themeToggleDarkIconMobile.classList.remove('hidden');
            if(themeToggleLightIconMobile) themeToggleLightIconMobile.classList.add('hidden');
            if(themeToggleDarkIconNav) themeToggleDarkIconNav.classList.remove('hidden');
            if(themeToggleLightIconNav) themeToggleLightIconNav.classList.add('hidden');
        } else {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if(themeToggleDarkIconMobile) themeToggleDarkIconMobile.classList.add('hidden');
            if(themeToggleLightIconMobile) themeToggleLightIconMobile.classList.remove('hidden');
            if(themeToggleDarkIconNav) themeToggleDarkIconNav.classList.add('hidden');
            if(themeToggleLightIconNav) themeToggleLightIconNav.classList.remove('hidden');
        }
    }

    updateIcons();

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        updateIcons();
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobileNav) themeToggleBtnMobileNav.addEventListener('click', toggleTheme);

    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            accordionItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    if (mobileMenuToggle && navbarContent) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarContent.classList.toggle('mobile-open');
        });

        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navbarContent.classList.remove('mobile-open');
            });
        });
    }

const contactForm = document.getElementById('contactForm');
    const formResult = document.getElementById('form-result');
    
    // Check for success redirect in URL on load
    if (window.location.search.includes('success=true') && formResult) {
        formResult.classList.remove('hidden');
        formResult.classList.add('bg-tertiary-fixed-dim', 'text-[#464d2c]');
        formResult.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();        
            const message = contactForm.elements['message'].value.trim();    

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Let native form submission proceed, just handle the UI feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
                const spanText = submitBtn.querySelector('span:first-child');
                if (spanText) spanText.textContent = 'Sending...';
                const iconBtn = submitBtn.querySelector('span.material-symbols-outlined');
                if (iconBtn) iconBtn.textContent = 'hourglass_empty';
            }
        });
    }

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let isTicking = false;
        window.addEventListener('scroll', function() {
            if (!isTicking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    } else {
                        navbar.style.boxShadow = 'none';
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        });
    }
});