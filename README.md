# Website

Personal résumé site for Jesus A. Saenz. Plain HTML/CSS/JS with no build step: open `index.html` in a browser.

- `index.html` holds all content: metrics strip, About, Experience, Selected Work (case studies), Capabilities, Education, Leadership, Contact.
- `assets/css/styles.css` holds the theme tokens (dark and light, one orange accent) at the top, plus a print stylesheet.
- **Résumé PDF:** the "Résumé PDF" button opens the browser's print dialog; the print stylesheet turns the page into a clean, one-column, ATS-friendly two-page résumé ("Save as PDF").
- Motion (scroll reveal, counters, cursor spotlight) is skipped when the visitor prefers reduced motion.
- `about.html`, `projects.html` and `contact.html` redirect to the matching section so old links keep working.
