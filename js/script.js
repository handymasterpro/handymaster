/* Language Auto-Redirect REMOVED -- Google warns against JS redirects by browser language.
   hreflang tags handle language serving in search results.
   Users can switch language via the lang-switcher in nav. */

/* Save language choice when clicking lang switcher */
document.addEventListener('click', function(e) {
    if (e.target.closest && e.target.closest('.lang-switcher')) {
        localStorage.setItem('langChoice', 'manual');
    }
});

/* Gallery Carousel */
(function() {
    var gallery = document.querySelector('.gallery');
    if (!gallery) return;
    var currentSlide = 0;
    var slides = gallery.querySelectorAll('img');
    if (slides.length === 0) return;

    // Add counter element
    var counter = document.createElement('div');
    counter.className = 'gallery-counter';
    gallery.appendChild(counter);

    function updateCounter() {
        counter.textContent = (currentSlide + 1) + ' / ' + slides.length;
    }

    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateCounter();
    }

    updateCounter();
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

/* Google Analytics -- only loads after cookie consent.
   window.gtag is exposed so the telemetry block below (DL-012) can emit events. */
function loadGA() {
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-R9YFG3G95Y';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-R9YFG3G95Y');
}

/* Cookie Consent */
(function() {
    var consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') { loadGA(); }

    var banner = document.querySelector('.cookie-banner');
    if (!banner) return;
    if (consent) return;
    banner.classList.add('active');
    var acceptBtn = banner.querySelector('.cookie-accept');
    var necessaryBtn = banner.querySelector('.cookie-necessary');
    function closeBanner(choice) {
        localStorage.setItem('cookieConsent', choice);
        banner.classList.remove('active');
        if (choice === 'accepted') { loadGA(); }
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

/* Auto-select service from URL param (for localized estimate links) */
(function() {
    var params = new URLSearchParams(window.location.search);
    var service = params.get('service');
    if (!service) return;
    var map = {
        'electrical': 'Electrical', 'painting': 'Painting', 'furniture': 'Furniture',
        'drywall': 'Drywall', 'doors': 'Doors & Windows', 'flooring': 'Flooring',
        'deck': 'Deck & Fence', 'maintenance': 'General Handyman',
        'tv-mounting': 'TV Mounting', 'bathroom': 'General Handyman',
        'kitchen': 'General Handyman', 'tiling': 'Flooring', 'smart-home': 'Electrical'
    };
    var val = map[service];
    if (!val) return;
    var select = document.querySelector('select[name="service_category"]');
    if (select) { select.value = val; }
})();

/* Services dropdown mobile toggle */
document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        var parent = toggle.closest('.nav-dropdown');
        parent.classList.toggle('active');
        toggle.setAttribute('aria-expanded', parent.classList.contains('active'));
    });
});

/* ============================================================
 * Telemetry Foundation (TD-018 discharge — spec: DL-012)
 * Five ce_* events gated on cookieConsent === 'accepted'.
 * No PII. One click-delegation listener + one throttled scroll.
 * ============================================================ */
(function() {
    function hasConsent() {
        try { return localStorage.getItem('cookieConsent') === 'accepted'; }
        catch (e) { return false; }
    }
    function ceEvent(name, params) {
        if (!hasConsent() || typeof window.gtag !== 'function') return;
        try { window.gtag('event', name, params || {}); } catch (e) {}
    }

    function classifyPhoneSource(a) {
        if (a.closest('.big-phone, .call-now-box')) return 'emergency';
        if (a.closest('.mobile-cta')) return 'mobile_cta';
        if (a.closest('.hero-contact, .hero-phone, .hero-home, .hero-main')) return 'hero';
        if (a.closest('.footer-socials, footer')) return 'footer';
        if (a.closest('nav')) return 'header';
        return 'other';
    }
    function classifyWaSource(a) {
        if (a.classList.contains('whatsapp-float')) return 'float';
        if (a.closest('.btn-emergency-wa, .call-now-box')) return 'emergency';
        if (a.closest('.mobile-cta')) return 'mobile_cta';
        if (a.closest('.whatsapp-alt')) return 'estimate_alt';
        if (a.closest('.cta-box')) return 'cta_box';
        if (a.closest('.hero-socials, .hero-home, .hero-main')) return 'hero';
        if (a.closest('.footer-socials, footer')) return 'footer';
        if (a.closest('nav')) return 'header';
        return 'other';
    }

    /* Phone + WhatsApp click delegation */
    document.addEventListener('click', function(e) {
        if (!e.target || !e.target.closest) return;
        var tel = e.target.closest('a[href^="tel:"]');
        if (tel) { ceEvent('ce_phone_click', { source: classifyPhoneSource(tel) }); return; }
        var wa = e.target.closest('a[href*="wa.me/"]');
        if (wa) { ceEvent('ce_whatsapp_click', { source: classifyWaSource(wa) }); }
    });

    /* Estimate form submit — fires only when HTML5 validation passes */
    var estimateForm = document.querySelector('form[action*="formspree.io"]');
    if (estimateForm) {
        estimateForm.addEventListener('submit', function() {
            if (typeof estimateForm.checkValidity === 'function' && !estimateForm.checkValidity()) return;
            var serviceEl = estimateForm.querySelector('[name="service_category"]');
            var cityEl = estimateForm.querySelector('[name="client_city"]');
            ceEvent('ce_form_submit', {
                form: 'estimate',
                service: serviceEl ? serviceEl.value : '',
                city: cityEl ? cityEl.value : ''
            });
        });
    }

    /* Scroll depth 75% — fires once per page, then self-detaches */
    var scroll75Fired = false;
    var scrollTimer = null;
    function checkScroll75() {
        if (scroll75Fired) return;
        var doc = document.scrollingElement || document.documentElement;
        var viewport = window.innerHeight || doc.clientHeight;
        var total = doc.scrollHeight;
        if (total <= viewport) return; /* page shorter than viewport — never fires */
        var scrolled = (window.pageYOffset || doc.scrollTop) + viewport;
        if (scrolled >= total * 0.75) {
            scroll75Fired = true;
            window.removeEventListener('scroll', onScroll);
            ceEvent('ce_scroll_75', {});
        }
    }
    function onScroll() {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function() { scrollTimer = null; checkScroll75(); }, 200);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* FAQ open — fires only on the open transition (not on close) */
    var faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqContainer.addEventListener('click', function(e) {
            if (!e.target || !e.target.closest) return;
            var question = e.target.closest('.faq-question');
            if (!question) return;
            var item = question.parentElement;
            if (!item || !item.classList.contains('active')) return; /* class toggled by FAQ handler above; .active = just opened */
            var items = faqContainer.querySelectorAll('.faq-item');
            var idx = Array.prototype.indexOf.call(items, item) + 1;
            ceEvent('ce_faq_open', { index: idx });
        });
    }
})();
