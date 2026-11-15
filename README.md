# Website

Personal résumé site for Jesus A. Saenz. Plain HTML/CSS/JS with no build step: open `index.html` in a browser.

- `index.html` holds all content: About, Experience, Selected projects, Skills, Education, Volunteering, Contact.
- `assets/css/styles.css` holds the colours (light by default, dark optional) at the top, plus a print stylesheet that turns the page into a two-page résumé ("Print résumé" → Save as PDF).
- Photos are openly licensed images from Wikimedia Commons, credited in their captions. They load through `Special:FilePath`; if one fails to load, its figure is removed instead of showing a broken image. To use your own photos, put them in `assets/images/` and change the `src` and caption.
- `about.html`, `projects.html` and `contact.html` redirect to the matching section so old links keep working.
