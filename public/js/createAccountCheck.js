let upper = /[A-Z]/;
let letters = /[A-Za-z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

/* Valid name */
const validName = (name) => {
    if (typeof name !== 'string') { return false; }

    if ((!(name.replace(/\s/g, '').length)) || (name.length < 2) || (name.length > 25)) {
        return false;
    }
    
    let findNum = name.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
        return false; 
    }

    
    return true; /* Name is valid */

}

/* Valid email */
const validEmail = (email) => {

    if (typeof email !== 'string') { return false; }

    if (!email.includes('@')) {
        return false;
    }

    if (email.includes(' ')) {
        return false;
    }

    if ((!email.endsWith('.com')) && (!email.endsWith('.edu')) && (!email.endsWith('.org')) && (!email.endsWith('.net')) && (!email.endsWith('.int')) && (!email.endsWith('.gov')) && (!email.endsWith('.mil'))) {
        return false;
    }

    if (emailAddress[0] === '@') {
        return false;
    }

    // let index = emailAddress.indexOf('@');
    // if (emailAddress[index+1] === '.') {
    //     return false;
    // }

    return true;
} 


/* Valid username */
const validUsername = (username) => {
    if ((typeof username !== "string") || (!(username.replace(/\s/g, '').length) || username.trim().length < 6)) {
       return false;
    }

    if (!letters.test(username)) { return false; }

    return true;
}


/* Valid password */
const validPassword = (password) => {
    if (typeof password !== 'string') { return false; }
    //Check password
    if ((!(password.replace(/\s/g, '').length)) || (password.length < 8)) {
      return false;
    }

    if (!upper.test(password) || !nums.test(password) || !specials.test(password)) {
        return false;
    }
    
    return true;
}


/* Valid city */
const validCity = (city) => {
    if ((typeof city !== "string") || (!(city.replace(/\s/g, '').length)) || (city.trim().length < 2)) {
        return false;
    }

    city = city.trim();

    if (nums.test(city) || specials.test(city)) { return false; }

    return true;
}


const validState = (state) => {

    const stateArray = ['AL','AK','AZ','AR','CA','CO','CT', 'DC', 'DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA', 'PR', 'RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    //Check state
    if ((typeof state !== "string") || (!(state.replace(/\s/g, '').length)) || (state.trim().length != 2)) {
        return false;
    }

    state = state.trim().toUpperCase();

    let findNum = state.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
        return false;
    }

    if (!stateArray.includes(state)) { return false; }

    
    return true;

}



let form = document.getElementById('registration-form');

let firstName = document.getElementById('firstNameInput');
let lastName = document.getElementById('lastNameInput');
let emailAddress = document.getElementById('emailAddressInput');
let username = document.getElementById('usernameInput');
let password = document.getElementById('passwordInput');
let confirmPassword = document.getElementById('confirmPasswordInput');
let city = document.getElementById('cityInput');
let state = document.getElementById('stateInput');


let errorFirstName = document.getElementById('errorFirstName');
let errorLastName = document.getElementById('errorLastName');
let errorEmail = document.getElementById('errorEmail');
let errorUsername = document.getElementById('errorUsername');
let errorPassword = document.getElementById('errorPassword');
let errorConfirm = document.getElementById('errorConfirm');
let errorCity = document.getElementById('errorCity');
let errorState = document.getElementById('errorState');



/* The plan is to have multiple error lines so that way it would alert
   the user for each invalid input instead of just the first one. */


if (form) {
    

    form.addEventListener('submit', (event) => {

        errorFirstName.hidden = true;
        errorLastName.hidden = true;
        errorEmail.hidden = true;
        errorUsername.hidden = true;
        errorPassword.hidden = true;
        errorConfirm.hidden = true;
        errorCity.hidden = true;
        errorState.hidden = true;

        if (!validName(firstName.value)) {
            event.preventDefault();
            errorFirstName.hidden = false;
            errorFirstName.innerHTML = 'First name must be between 2 and 25 characters, only letters and no spaces.';
        }

        if (!validName(lastName.value)) {
            event.preventDefault();
            errorLastName.hidden = false;
            errorLastName.innerHTML = 'Last name must be between 2 and 25 characters, only letters and no spaces.';
        }

        if (!validEmail(emailAddress.value)) {
            event.preventDefault();
            errorEmail.hidden = false;
            errorEmail.innerHTML = 'Email must be in email format and contain a valid prefix and domain.';
        }

        if (!validUsername(username.value)) {
            event.preventDefault();
            errorUsername.hidden = false;
            errorUsername.innerHTML = 'Username must be at least six characters and contain at least one letter and no spaces.';
        }

        if (!validPassword(password.value)) {
            event.preventDefault();
            errorPassword.hidden = false;
            errorPassword.innerHTML = 'Password must contain at least eight characters, have at least one uppercase letter, at least one number, and at least one special character. No spaces.';
        }

        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            errorConfirm.hidden = false;
            errorConfirm.innerHTML = 'Both password fields must match.'
        }

        if (!validCity(city.value)) {
            event.preventDefault();
            errorCity.hidden = false;
            errorCity.innerHTML = 'City must contain at least two characters and cannot contain numbers or special characters.'
        }

        if (!validState(state.value)) {
            event.preventDefault();
            errorState.hidden = false;
            errorState.innerHTML = 'State must be a valid abbreviated state.'
        }
    
    });
}