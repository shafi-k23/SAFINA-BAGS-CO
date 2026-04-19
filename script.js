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
    const modal = document.getElementById('formStatusModal');
    const modalBackdrop = document.getElementById('formStatusBackdrop');
    const modalDialog = document.getElementById('formStatusDialog');
    const modalSuccessIcon = document.getElementById('modalSuccessIcon');
    const modalErrorIcon = document.getElementById('modalErrorIcon');
    const formStatusTitle = document.getElementById('formStatusTitle');
    const formStatusMessage = document.getElementById('formStatusMessage');
    const formStatusCloseBtn = document.getElementById('formStatusCloseBtn');
    const formStatusSecondaryBtn = document.getElementById('formStatusSecondaryBtn');

    // Remove old success redirect parameter check to prefer our new modal, but keep fallback
    if (window.location.search.includes('success=true') && formResult) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function showModal(isSuccess) {
        if (!modal) return;
        
        // Configure styles based on status
        if (isSuccess) {
            modalSuccessIcon.classList.remove('hidden');
            modalSuccessIcon.classList.add('flex');
            modalErrorIcon.classList.add('hidden');
            modalErrorIcon.classList.remove('flex');
            formStatusTitle.textContent = 'Thank You';
            formStatusMessage.textContent = 'Your inquiry has been received successfully.\n\nOur team will review your requirements and get back to you shortly.';
            formStatusTitle.classList.remove('text-[#9f403d]', 'dark:text-[#fe8983]');
            formStatusSecondaryBtn.classList.remove('hidden');
        } else {
            modalErrorIcon.classList.remove('hidden');
            modalErrorIcon.classList.add('flex');
            modalSuccessIcon.classList.add('hidden');
            modalSuccessIcon.classList.remove('flex');
            formStatusTitle.textContent = 'Submission Failed';
            formStatusMessage.textContent = 'Something went wrong. Please try again in a moment.';
            formStatusTitle.classList.add('text-[#9f403d]', 'dark:text-[#fe8983]');
            formStatusSecondaryBtn.classList.add('hidden');
        }

        // Show modal with animation
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalDialog.classList.remove('scale-95');
        modalDialog.classList.add('scale-100');

        // Accessibility Trap
        formStatusCloseBtn.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalDialog.classList.remove('scale-100');
        modalDialog.classList.add('scale-95');
    }

    if (modal) {
        formStatusCloseBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        formStatusSecondaryBtn.addEventListener('click', () => {
            closeModal();
            contactForm.elements['name'].focus();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
                closeModal();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop native submission
            
            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();        
            const message = contactForm.elements['message'].value.trim();    

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name || !email || !message || !emailRegex.test(email)) {
                // Should be caught by HTML5 required/type="email", but just in case:
                formStatusTitle.textContent = 'Validation Error';
                formStatusMessage.textContent = 'Please fill in all fields with valid information.';
                formStatusTitle.classList.add('text-[#9f403d]', 'dark:text-[#fe8983]');
                modalErrorIcon.classList.remove('hidden');
                modalErrorIcon.classList.add('flex');
                modalSuccessIcon.classList.add('hidden');
                modalSuccessIcon.classList.remove('flex');
                formStatusSecondaryBtn.classList.add('hidden');
                
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modalDialog.classList.remove('scale-95');
                modalDialog.classList.add('scale-100');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalSpanText = submitBtn ? submitBtn.querySelector('span:first-child').textContent : 'Send Message';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
                const spanText = submitBtn.querySelector('span:first-child');
                if (spanText) spanText.textContent = 'Sending...';
                const iconBtn = submitBtn.querySelector('span.material-symbols-outlined');
                if (iconBtn) iconBtn.textContent = 'hourglass_empty';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();

                if (response.status === 200 && result.success) {
                    contactForm.reset();
                    showModal(true);
                } else {
                    showModal(false);
                }
            } catch (error) {
                console.error(error);
                showModal(false);
            } finally {
                // Restore Button State
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                    const spanText = submitBtn.querySelector('span:first-child');
                    if (spanText) spanText.textContent = originalSpanText;
                    const iconBtn = submitBtn.querySelector('span.material-symbols-outlined');
                    if (iconBtn) iconBtn.textContent = 'east';
                }
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