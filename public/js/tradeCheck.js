let upper = /[A-Z]/;
let letters = /[A-Za-z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
let allowedExtensions = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];


const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length === 0) { return false; }
    return true;
}

const validImg = (img) => {
    let check = true;
    let imgExt = img.split(".");
    let extension = imgExt[(imgExt.length-1)];
    for(let x of allowedExtensions){
        if(x === extension){
            check = false;
        }
    }
    if (check){
        return false;
    }
    return true;
}
let form = document.getElementById('trade-form');
let listingTitle = document.getElementById('titleInput');
let listingDesc = document.getElementById('descriptionInput');


let errorTitle = document.getElementById('errorTitle');
let errorDesc = document.getElementById('errorDesc');

if (form) {
    form.addEventListener('submit', (event) => {
        errorTitle.hidden = true;
        errorDesc.hidden = true;
        if (!validString(listingTitle.value)) {
            event.preventDefault();
            errorTitle.hidden = false;
            errorTitle.innerHTML = 'Title must be a valid string';
        }
        if (!validString(listingDesc.value)) {
            event.preventDefault();
            errorDesc.hidden = false;
            errorDesc.innerHTML = 'Description must be a valid string';
        }

    });
}







