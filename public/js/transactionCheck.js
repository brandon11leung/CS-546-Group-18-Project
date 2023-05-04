let upper = /[A-Z]/;
let lower = /[a-z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
let citySpecials = /[&,:;()[\]{}+#$%@!?"•°]/;


const validEmail = (email) => {

    if (typeof email !== 'string') { return false; }

    email = email.trim().toLowerCase();

    if (!email.includes('@')) {
        return false;
    }

    if (email.includes(' ')) {
        return false;
    }

    if ((!email.endsWith('.com')) && (!email.endsWith('.edu')) && (!email.endsWith('.org')) && (!email.endsWith('.net')) && (!email.endsWith('.int')) && (!email.endsWith('.gov')) && (!email.endsWith('.mil'))) {
        return false;
    }

    if (email[0] === '@') {
        return false;
    }

    let index = email.indexOf('@');
    if (email[index+1] === '.') {
        return false;
    }

    return true;
}

let form = document.getElementById('address-form');

let errorName = document.getElementById('errorName');
let errorEmail = document.getElementById('errorEmail');
let errorAddress = document.getElementById('errorAddress');
let errorCity = document.getElementById('errorCity');
let errorState = document.getElementById('errorState');
let errorZip = document.getElementById('errorZip');
let errorCountry = document.getElementById('errorCountry');
let errorMissings = document.getElementById('errorMissings');

if (form) {
    form.addEventListener('submit', (event) => {
        let name = document.getElementById('name');
        let email = document.getElementById('email');
        let address = document.getElementById('address');
        let city = document.getElementById('city');
        let state = document.getElementById('state');
        let zip = document.getElementById('zip');
        let country = document.getElementById('country');
        let error;

        errorName.hidden = true;
        errorEmail.hidden = true;
        errorAddress.hidden = true;
        errorCity.hidden = true;
        errorZip.hidden = true;
        errorCountry.hidden = true;

        name = name.value.trim();
        email = email.value.trim();
        address = address.value.trim();
        city = city.value.trim();
        zip = zip.value.trim();
        country = country.value
        state = state.value;

        event.preventDefault();

        if (!validEmail(email)) {
            errorEmail.hidden = false;
            errorEmail.innerHTML = 'Error: Email must be in email address format, containing a valid prefix and domain.';
        }

        //Check Name
        if ((!(name.replace(/\s/g, '').length)) || (name.length < 2) || (name.length > 25)) {
            error = 'Error: Name either an empty space(s) or does not meet the length specifications'
            errorName.hidden = false;
            errorName.innerHTML = error;
        }
        let findNum = name.match(/[^a-zA-Z\s]+/g);
        if (findNum !== null) {
            error = 'Error: Name contains a number or special character'
            errorName.hidden = false;
            errorName.innerHTML = error;
        }

        //Check country
        if (country === 'Select a country') {
            error = 'Error: Select a country'
            errorCountry.hidden = false;
            errorCountry.innerHTML = error;
        }

        //Check missings
        let notThere = {name: false, email: false, address: false, city: false, zip: false}
        if (name === '') {
            notThere.name = true;
        }
        if (email === '') {
            notThere.email = true;
        }
        if (address === '') {
            notThere.address = true;
        }
        if (city === '') {
            notThere.city = true;
        }
        if (zip === '') {
            notThere.zip = true;
        }
        error = 'Error the following fields are missing: ';
        let errorHelp2 = false;
        for (let key in notThere) {
            if (notThere[key] === true) {
            error += `${key}, `;
            errorHelp2 = true;
            }
        }
        error = error.slice(0, -2);
        if (errorHelp2) {
            errorMissings.hidden = false;
            errorMissings.innerHTML = error;
        }

        //Check zipcode
        if ((!(zip.replace(/\s/g, '').length)) || (zip.length < 5) || (zip.length > 5)) {
            error = 'Error: invalid zipcode';
            errorZip.hidden = false;
            errorZip.innerHTML = error;
        }
        findNum = zip.match(/[a-zA-Z]+/g);
        if (findNum !== null) {
            error = 'Error: invalid zipcode';
            errorZip.hidden = false;
            errorZip.innerHTML = error;
        }

        //Check City
        if ((city.length < 2) || (city.length > 85)) {
            error = 'Error: invalid City';
            errorCity.hidden = false;
            errorCity.innerHTML = error;
        }
        let findInvalidSpecial = city.match(citySpecials);
        if (findInvalidSpecial !== null) {
            error = 'Error: City contains an invalid special character'
            errorCity.hidden = false;
            errorCity.innerHTML = error;
        }

        let findNUMS = city.match(nums);
        if (findNUMS !== null) {
            error = 'Error: City contains a number'
            errorCity.hidden = false;
            errorCity.innerHTML = error;
        }

        //Check State
        if (state === 'Select a state') {
            error = 'Error: Select a state'
            errorState.hidden = false;
            errorState.innerHTML = error;
        }
    })
}

let form2 = document.getElementById('payment-form');

let errorCardholder = document.getElementById('errorCardholder');
let errorCardnumber = document.getElementById('errorCardnumber');
let errorExpiration = document.getElementById('errorExpiration');
let errorCvv = document.getElementById('errorCvv');

if (form2) {
    form2.addEventListener('submit', (event) => {
        let cardholder = document.getElementById('cardholder');
        let cardnumber = document.getElementById('cardnumber');
        let expiration = document.getElementById('expiration');
        let cvv = document.getElementById('cvv');
        let error;

        errorCardholder.hidden = true;
        errorCardnumber.hidden = true;
        errorExpiration.hidden = true;
        errorCvv.hidden = true;

        cardholder = cardholder.value.trim();
        cardnumber = cardnumber.value.trim();
        expiration = expiration.value.trim();
        cvv = cvv.value.trim();

        event.preventDefault();

        //Check Name
        if ((!(cardholder.replace(/\s/g, '').length)) || (cardholder.length < 2) || (cardholder.length > 25)) {
            error = 'Error: Name either an empty space(s) or does not meet the length specifications'
            errorCardholder.hidden = false;
            errorCardholder.innerHTML = error;
        }
        let findNum = cardholder.match(/[^a-zA-Z\s]+/g);
        if (findNum !== null) {
            error = 'Error: Name contains a number or special character'
            errorCardholder.hidden = false;
            errorCardholder.innerHTML = error;
        }

        //Check cardnumber
        if (cardnumber.match(upper) !== null || cardnumber.match(lower) !== null || cardnumber.match(specials)) {
            error = 'Error: Invalid cardnumber'
            errorCardnumber.hidden = false;
            errorCardnumber.innerHTML = error;
        }
        if (cardnumber.length < 13 || cardnumber.length > 16) {
            error = 'Error: Invalid cardnumber'
            errorCardnumber.hidden = false;
            errorCardnumber.innerHTML = error;
        }

        //Check cvv
        if (cvv.match(upper) !== null || cvv.match(lower) !== null || cvv.match(specials)) {
            error = 'Error: Invalid cvv'
            errorCardnumber.hidden = false;
            errorCardnumber.innerHTML = error;
        }
        if (cvv.length < 3 || cvv.length > 4) {
            error = 'Error: Invalid cvv'
            errorCardnumber.hidden = false;
            errorCardnumber.innerHTML = error;
        }

        //Check Expiration
        let beg = expiration.slice(0,2);
        let mid = expiration.slice(2,3);
        let end = expiration.slice(3);
        if (beg.match(nums) === null) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
        if (mid.match(/[/]/) === null) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
        if (end.match(nums) === null) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
        if (end.length !== 2) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
            //Check the year
        let validYears = [];
        let validMonths = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); 
        let stryear = currentYear.toString();
        let stryear3 = stryear.slice(2);
        stryear = parseInt(stryear3);
        for (let i = stryear; i < stryear+6; i++) {
            validYears.push(i);
        }
        const stringYear = validYears.map(String);
        if (stringYear.includes(end) === false) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
            //Check the month
        if (validMonths.includes(beg) === false) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
        const checkMnth = parseInt(beg);
        let currentMonth = currentDate.getMonth();
        currentMonth = currentMonth + 1;
        if (checkMnth < currentMonth && end === stryear3) {
            error = 'Error: Invalid expiration date'
            errorExpiration.hidden = false;
            errorExpiration.innerHTML = error;
        }
    })
}