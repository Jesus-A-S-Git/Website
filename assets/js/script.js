(function () {
    var root = document.documentElement;

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

    // ---------- Highlight the section currently on screen ----------
    var links = Array.prototype.slice.call(document.querySelectorAll('.section-nav a'));
    var sections = links
        .map(function (a) { return document.querySelector(a.getAttribute('href')); })
        .filter(Boolean);

    function setActive(id) {
        links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
    }

    function onScroll() {
        var marker = window.innerHeight * 0.35;
        var active = sections[0];
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top <= marker) active = s;
        });
        // At the very bottom of the page, the last section is active
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
            active = sections[sections.length - 1];
        }
        if (active) setActive(active.id);
    }

    if (sections.length) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();
    }

    // ---------- Footer year ----------
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();

