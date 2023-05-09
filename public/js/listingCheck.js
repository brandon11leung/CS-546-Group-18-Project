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
    if(Number(num) > 999999999){
        return false
    }
    return true;
}

const validID = (num) => {
    if (num.length <= 0) { return false; }
    if (num.length === 1 && num[0] === '0') { return false; }
    for (let x of num.split('')){
        if (!nums.includes(x)){
                return false
        }
    }
    return true;
}

const validType = (typ) => {

    const typArray = ['Buy', 'Sell'];
    //Check state
    if (!typArray.includes(typ)) { return false; }

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
    const condArray = ["Cartridge", "Box", "Case", "Manual", "Console", "Controller", "Disc", "Cables", "Redemption Code", "Other"]
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

let form = document.getElementById('listing-form');
let listingType = document.getElementById('listingTypeInput');
let listingTitle = document.getElementById('TitleInput');
let pcID = document.getElementById('pcIdInput');
let listingCondition = document.getElementById('conditionInput');
let Cartridge = document.getElementById('Cartridge');
let Box = document.getElementById('Box');
let Case = document.getElementById('Case');
let Manual = document.getElementById('Manual');
let Consoles = document.getElementById('Console');
let Controller = document.getElementById('Controller');
let Disc = document.getElementById('Disc');
let Cables = document.getElementById('Cables');
let RedemptionCode = document.getElementById('RedemptionCode');
let Other = document.getElementById('Other');
let listingPrice = document.getElementById('priceInput');
let listingShippingPrice = document.getElementById('shippingPriceInput');
let listingDesc = document.getElementById('descriptionInput');
let listingRetPolicy = document.getElementById('returnPolicyInput');
let imageInput = document.getElementById('imageInput');
let shipMethodInput = document.getElementById('shipMethodInput');
let tradesInput = document.getElementById('tradesInput');





let errorType = document.getElementById('errorType');
let errorTitle = document.getElementById('errorTitle');
let errorPCID = document.getElementById('errorPCID');
let errorMainCond = document.getElementById('errorMainCond');
let errorPrice = document.getElementById('errorPrice');
let errorShipPrice = document.getElementById('errorShipPrice');
let errorDesc = document.getElementById('errorDesc');
let errorRetPol = document.getElementById('errorRetPol');
let errorImgs = document.getElementById('errorImgs');
let errorShipMethod  = document.getElementById('errorShipMethod');
let errorTrades  = document.getElementById('errorTrades');




if (form) {
    form.addEventListener('submit', (event) => {
        errorType.hidden = true;
        errorTitle.hidden = true;
        errorPCID.hidden = true;
        errorMainCond.hidden = true;
        errorPrice.hidden = true;
        errorShipPrice.hidden = true;
        errorDesc.hidden = true;
        errorRetPol.hidden = true;
        errorImgs.hidden = true;
        let secCond = [];
        if (!validType(listingType.value)) {
            event.preventDefault();
            errorType.hidden = false;
            errorType.innerHTML = 'Type must be either a Buying or Selling listing.';
        }

        if (!validString(listingTitle.value)) {
            event.preventDefault();
            errorTitle.hidden = false;
            errorTitle.innerHTML = 'Title must be a valid string';
        }

        if (!validID(pcID.value)) {
            event.preventDefault();
            errorPCID.hidden = false;
            errorPCID.innerHTML = 'Price Charts ID must be a number above 0.';
        }

        if (!validMainCond(listingCondition.value)) {
            event.preventDefault();
            errorMainCond.hidden = false;
            errorMainCond.innerHTML = 'Main condition must be selected';
        }

        if(validSecCond(Cartridge.value)){
            secCond.push(Cartridge.value);
        }

        if(validSecCond(Box.value)){
            secCond.push(Box.value);
        }

        if(validSecCond(Case.value)){
            secCond.push(Case.value);
        }

        if(validSecCond(Manual.value)){
            secCond.push(Manual.value);
        }

        if(validSecCond(Consoles.value)){
            secCond.push(Consoles.value);
        }

        if(validSecCond(Controller.value)){
            secCond.push(Controller.value);
        }

        if(validSecCond(Disc.value)){
            secCond.push(Disc.value);
        }

        if(validSecCond(Cables.value)){
            secCond.push(Cables.value);
        }

        if(validSecCond(RedemptionCode.value)){
            secCond.push(RedemptionCode.value);
        }

        if(validSecCond(Other.value)){
            secCond.push(Other.value);
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

        if (!validString(shipMethodInput.value)) {
            event.preventDefault();
            errorShipMethod.hidden = false;
            errorShipMethod.innerHTML = 'Shipping Methods must be a valid string';
        }

        if (!validString(listingRetPolicy.value)) {
            event.preventDefault();
            errorRetPol.hidden = false;
            errorRetPol.innerHTML = 'Return Policy must be a valid string';
        }
        for(let x of imageInput.value){
            if (!validImg(x)) {
                event.preventDefault();
                errorImgs.hidden = false;
                errorImgs.innerHTML = 'Please chosse jpg/png/jpeg files only.';
            }
       }
    });
}