/* Gallery Carousel */
(function() {
    var gallery = document.querySelector('.gallery');
    if (!gallery) return;
    var currentSlide = 0;
    var slides = gallery.querySelectorAll('img');
    if (slides.length === 0) return;
    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    var prevBtn = gallery.querySelector('.prev');
    var nextBtn = gallery.querySelector('.next');
    if (prevBtn) prevBtn.addEventListener('click', function() { changeSlide(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { changeSlide(1); });
    setInterval(function() { changeSlide(1); }, 5000);
})();

/* FAQ Accordion */
(function() {
    var questions = document.querySelectorAll('.faq-question');
    if (questions.length === 0) return;
    questions.forEach(function(button) {
        button.addEventListener('click', function() {
            button.parentElement.classList.toggle('active');
        });
    });
})();

/* Cookie Consent */
(function() {
    var banner = document.querySelector('.cookie-banner');
    if (!banner) return;
    if (localStorage.getItem('cookieConsent')) return;
    banner.classList.add('active');
    var acceptBtn = banner.querySelector('.cookie-accept');
    var necessaryBtn = banner.querySelector('.cookie-necessary');
    function closeBanner(choice) {
        localStorage.setItem('cookieConsent', choice);
        banner.classList.remove('active');
        if (choice === 'necessary') {
            window['ga-disable-G-R9YFG3G95Y'] = true;
        }
    }
    if (acceptBtn) acceptBtn.addEventListener('click', function() { closeBanner('accepted'); });
    if (necessaryBtn) necessaryBtn.addEventListener('click', function() { closeBanner('necessary'); });
})();

/* Accessibility Widget */
(function() {
    var toggle = document.querySelector('.a11y-toggle');
    var panel = document.querySelector('.a11y-panel');
    if (!toggle || !panel) return;

    var currentSize = parseInt(localStorage.getItem('a11yFontSize') || '0');
    var highContrast = localStorage.getItem('a11yContrast') === 'true';

    // Apply saved settings on load
    if (currentSize !== 0) {
        document.documentElement.style.fontSize = (100 + currentSize * 15) + '%';
    }
    if (highContrast) {
        document.body.classList.add('a11y-high-contrast');
    }

    // Toggle panel
    toggle.addEventListener('click', function() {
        panel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && !toggle.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // Increase text
    var btnIncrease = panel.querySelector('[data-a11y="increase"]');
    if (btnIncrease) btnIncrease.addEventListener('click', function() {
        if (currentSize < 4) {
            currentSize++;
            document.documentElement.style.fontSize = (100 + currentSize * 15) + '%';
            localStorage.setItem('a11yFontSize', currentSize);
        }
    });

    // Decrease text
    var btnDecrease = panel.querySelector('[data-a11y="decrease"]');
    if (btnDecrease) btnDecrease.addEventListener('click', function() {
        if (currentSize > -2) {
            currentSize--;
            document.documentElement.style.fontSize = (100 + currentSize * 15) + '%';
            localStorage.setItem('a11yFontSize', currentSize);
        }
    });

    // High contrast
    var btnContrast = panel.querySelector('[data-a11y="contrast"]');
    if (btnContrast) btnContrast.addEventListener('click', function() {
        highContrast = !highContrast;
        document.body.classList.toggle('a11y-high-contrast', highContrast);
        localStorage.setItem('a11yContrast', highContrast);
        btnContrast.classList.toggle('active', highContrast);
    });

    // Reset
    var btnReset = panel.querySelector('[data-a11y="reset"]');
    if (btnReset) btnReset.addEventListener('click', function() {
        currentSize = 0;
        highContrast = false;
        document.documentElement.style.fontSize = '';
        document.body.classList.remove('a11y-high-contrast');
        localStorage.removeItem('a11yFontSize');
        localStorage.removeItem('a11yContrast');
        if (btnContrast) btnContrast.classList.remove('active');
    });
})();
