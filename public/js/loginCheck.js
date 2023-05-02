let letters = /[A-Za-z]/;
let upper = /[A-Z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

/* Valid username */
const validUsername = (username) => {
    if ((typeof username !== "string") || (!(username.replace(/\s/g, '').length) || username.trim().length < 6)) {
       return false;
    }

    if (username.includes(' ')) { return false; }

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



let form = document.getElementById('login-form');
let username = document.getElementById('usernameInput');
let password = document.getElementById('passwordInput');

let errorUsername = document.getElementById('errorUsername');
let errorPassword = document.getElementById('errorPassword');

if (form) {
    form.addEventListener('submit', (event) => {
        errorUsername.hidden = true;
        errorPassword.hidden = true;
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
    });
}