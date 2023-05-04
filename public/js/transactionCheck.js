let upper = /[A-Z]/;
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
            error = 'Error: Select a state';
            errorState.hidden = false;
            errorState.innerHTML = error;
        }
    })
}