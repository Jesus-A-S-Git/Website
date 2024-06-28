document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
});
// Setting a custom cursor for the entire website
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.cursor = 'url(../images/cursor.png), auto';
});