const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length === 0) { return false; }
    return true;
}

let form = document.getElementById('comment-form');
let comment = document.getElementById('commentInput');
let listing = document.getElementById('ListingId');
let errorComment= document.getElementById('errorComment');

if (form) {
    form.addEventListener('submit', (event) => {
        if (!validString(comment.value)) {
            event.preventDefault();
            errorComment.hidden = false;
            errorComment.innerHTML = 'Comment must be a valiod string.';
        }
        }
    
    )};