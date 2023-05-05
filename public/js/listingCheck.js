let upper = /[A-Z]/;
let letters = /[A-Za-z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
let allowedExtensions =/(\.jpg|\.jpeg|\.png)$/i;

const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length === 0) { return false; }
    return true;
}

const validPrice = (num) => {
    if (typeof num !== 'number') { return false; }
    if (num <= 0) { return false; }
    return true;
}

const validType = (typ) => {

    const typArray = ['Buy', 'Sell'];
    //Check state
    if ((typeof typ !== "string") || (!(typ.replace(/\s/g, '').length)) || (typ.trim().length != 2)) {
        return false;
    }

    typ = typ.trim().toUpperCase();

    let findNum = typ.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
        return false;
    }

    if (!typArray.includes(typ)) { return false; }

    return true;
 
}

// const validImg = (img) => {
//     if (!allowedExtensions.exec(img)) {
//         alert('Invalid file type');
//         fileInput.value = '';
//         return false;
//     }
//     else
//     {
//         if (img) {
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById(
//                     'imagePreview').innerHTML =
//                     '<img src="' + e.target.result
//                     + '"/>';
//             };
             
//             reader.readAsDataURL(fileInput.files[0]);
//         }
//     }
// }
