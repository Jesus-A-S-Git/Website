(function () {
    var root = document.documentElement;

    // Theme toggle, remembered between visits
    var toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = root.getAttribute('data-theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            var next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    // "Print résumé" uses the print stylesheet
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
