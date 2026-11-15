(function () {
    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Theme toggle (remembers the visitor's choice) ----------
    var toggle = document.getElementById('themeToggle');
    function currentTheme() {
        var set = root.getAttribute('data-theme');
        if (set) return set;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    // ---------- Résumé PDF: print stylesheet renders a clean one-column résumé ----------
    Array.prototype.forEach.call(document.querySelectorAll('[data-print]'), function (btn) {
        btn.addEventListener('click', function () { window.print(); });
    });

    // ---------- Cursor spotlight (desktop pointers only) ----------
    var spot = document.querySelector('.spotlight');
    if (spot && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        var raf = 0, mx = 0, my = 0;
        window.addEventListener('pointermove', function (e) {
            mx = e.clientX; my = e.clientY;
            if (!raf) {
                raf = requestAnimationFrame(function () {
                    spot.style.setProperty('--x', mx + 'px');
                    spot.style.setProperty('--y', my + 'px');
                    raf = 0;
                });
            }
        }, { passive: true });
    }

    // ---------- Number counters ----------
    function runCounter(el) {
        var end = parseInt(el.getAttribute('data-to'), 10);
        if (!end || reduceMotion) return;
        var start = null, dur = 1400;
        function step(ts) {
            if (start === null) start = ts;
            var t = Math.min((ts - start) / dur, 1);
            var v = Math.round(end * (1 - Math.pow(1 - t, 3)));
            el.textContent = v.toLocaleString('en-US');
            if (t < 1) requestAnimationFrame(step);
        }
        el.textContent = '0';
        requestAnimationFrame(step);
    }

    // ---------- Scroll reveal ----------
    var revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add('in');
                Array.prototype.forEach.call(e.target.querySelectorAll('.count'), runCounter);
                io.unobserve(e.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
    } else {
        Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('in'); });
    }

    // ---------- Highlight the section currently on screen ----------
    var links = Array.prototype.slice.call(document.querySelectorAll('.section-nav a'));
    var sections = links
        .map(function (a) { return document.querySelector(a.getAttribute('href')); })
        .filter(Boolean);

    function setActive(id) {
        links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + id;
            a.classList.toggle('active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
    }

    var ticking = false;
    function onScroll() {
        ticking = false;
        var marker = window.innerHeight * 0.35;
        var active = sections[0];
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top <= marker) active = s;
        });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
            active = sections[sections.length - 1];
        }
        if (active) setActive(active.id);
    }

    if (sections.length) {
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
        }, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();
    }

    // ---------- Footer year ----------
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
