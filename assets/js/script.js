(function () {
    var root = document.documentElement;

    // Theme toggle, remembered between visits. It needs JS, so it starts hidden.
    var toggle = document.getElementById('themeToggle');
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function isDark() {
        var t = root.getAttribute('data-theme');
        return t ? t === 'dark' : darkQuery.matches;
    }
    function syncToggle() {
        if (toggle) toggle.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
    }
    if (toggle) {
        toggle.hidden = false;
        syncToggle();
        toggle.addEventListener('click', function () {
            var next = isDark() ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncToggle();
        });
        // Follow OS changes while no theme has been picked
        if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncToggle);
    }

    // "Print résumé" uses the print stylesheet; also hidden until JS runs
    document.querySelectorAll('[data-print-item]').forEach(function (li) { li.hidden = false; });
    document.querySelectorAll('[data-print]').forEach(function (btn) {
        btn.addEventListener('click', function () { window.print(); });
    });

    // If a photo can't load, drop its figure rather than show a broken image
    document.querySelectorAll('figure img').forEach(function (img) {
        function hide() {
            var fig = img.closest('figure');
            if (fig) fig.remove();
            document.querySelectorAll('.project.has-figure').forEach(function (p) {
                if (!p.querySelector('figure')) p.classList.remove('has-figure');
            });
        }
        if (img.complete && img.naturalWidth === 0) hide();
        else img.addEventListener('error', hide);
    });

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
