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

const validPrice = (num) => {
    if (num.length <= 0) { return false; }
    if (num.length === 1 && num[0] === '0') { return false; }
    for (let x of num.split('')){
        if (!nums.includes(x)){
            if (x !== '.'){
                return false
            }
        }
    }
    return true;
}

const validMainCond = (cond) => {
    const condArray = ['Brand New', 'Like New/Open Box', 'Used', 'For Parts or Not Working'];
    //Check state
    if ((typeof cond !== "string") || (!(cond.replace(/\s/g, '').length)) || (cond.trim().length != 2)) {
        return false;
    }

    cond = cond.trim().toUpperCase();

    let findNum = cond.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
        return false;
    }

    if (!condArray.includes(cond)) { return false; }

    return true;
}

const validSecCond = (cond) => {
    const condArray = ["Cartridge", "Box", "Case", "Manual", "Console", "Controller", "Disc", "Cables", "Redemption Code", "Other"];
    //Check state
    if ((typeof cond !== "string") || (!(cond.replace(/\s/g, '').length)) || (cond.trim().length != 2)) {
        return false;
    }

    cond = cond.trim().toUpperCase();

    let findNum = cond.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
        return false;
    }

    if (!condArray.includes(cond)) { return false; }

    return true;
}

let form = document.getElementById('tarde-form');
let listingTitle = document.getElementById('titleInput');
let listingCondition = document.getElementById('conditionInput');
let Cartridge = document.getElementById('Cartridge');
let Box = document.getElementById('Box');
let Case = document.getElementById('Case');
let Manual = document.getElementById('Manual');
let console = document.getElementById('Console');
let Controller = document.getElementById('Controller');
let Disc = document.getElementById('Disc');
let Cables = document.getElementById('Cables');
let RedemptionCode = document.getElementById('RedemptionCode');
let Other = document.getElementById('Other');
let listingPrice = document.getElementById('priceInput');
let listingShippingPrice = document.getElementById('shippingPriceInput');
let listingDesc = document.getElementById('descriptionInput');
let listingShippingMethod = document.getElementById('shippingMethodInput');
let imageInput = document.getElementById('imageInput');


let errorTitle = document.getElementById('errorTitle');
let errorMainCond = document.getElementById('errorMainCond');
let errorSecCond = document.getElementById('errorSecCond');
let errorPrice = document.getElementById('errorPrice');
let errorShipPrice = document.getElementById('errorShipPrice');
let errorDesc = document.getElementById('errorDesc');
let errorRetPol = document.getElementById('errorRetPol');
let errorImgs = document.getElementById('errorImgs');

if (form) {
    form.addEventListener('submit', (event) => {
        if (!validString(listingType.value)) {
            event.preventDefault();
            errorTitle.hidden = false;
            errorTitle.innerHTML = 'Title must be a valid string';
        }
        
        if (!validMainCond(listingCondition.value)) {
            event.preventDefault();
            errorMainCond.hidden = false;
            errorMainCond.innerHTML = 'Main condition must be selected';
        }

        if (!validPrice(listingPrice.value)) {
            event.preventDefault();
            errorPrice.hidden = false;
            errorPrice.innerHTML = 'Price must be a number above 0.';
        }


        if (!validPrice(listingShippingPrice.value)) {
            event.preventDefault();
            errorShipPrice.hidden = false;
            errorShipPrice.innerHTML = 'Shipping Price must be a number above 0.';
        }

        if (!validString(listingDesc.value)) {
            event.preventDefault();
            errorDesc.hidden = false;
            errorDesc.innerHTML = 'Description must be a valid string';
        }

        if (!validString(listingRetPolicy.value)) {
            event.preventDefault();
            errorRetPol.hidden = false;
            errorRetPol.innerHTML = 'Return Policy must be a valid string';
        }

    });
}






