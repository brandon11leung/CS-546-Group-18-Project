const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length < 10 || str.length > 5000) { return false; }
    return true;
}

const validRating = (rating) => {
    rating = Number(rating);
    if (rating < 1 || rating > 5 || rating % 1 !== 0) {
        return false;
    }
    return true;
}

let form = document.getElementById('review-form');
let content = document.getElementById('contentInput');
let rating = document.getElementById('ratingInput');

let errorContent = document.getElementById('errorContent');
let errorRating = document.getElementById('errorRating');

if (form) {
    form.addEventListener('submit', (event) => {
        errorContent.hidden = true;
        errorRating.hidden = true;
        if (!validString(content.value)) {
            event.preventDefault();
            errorContent.hidden = false;
            errorContent.innerHTML = 'Content must be between 10 to 5000 characters long.';
        }
        if (!validRating(rating.value)) {
            event.preventDefault();
            errorRating.hidden = false;
            errorRating.innerHTML = 'Rating must be between 1 to 5, no exceptions.';
        }
    });
}