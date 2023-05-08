let letters = /[A-Za-z]/;
let upper = /[A-Z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
let ajax = true;


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
let email = document.getElementById('emailAddressInput');
let password = document.getElementById('passwordInput');

let errorEmail = document.getElementById('errorEmail');
let errorPassword = document.getElementById('errorPassword');



if (form) {
    form.addEventListener('submit', (event) => {
        errorEmail.hidden = true;
        errorPassword.hidden = true;
        if (!validEmail(email.value)) {
            event.preventDefault();
            errorEmail.hidden = false;
            errorEmail.innerHTML = 'Email must be in email address format, containing a valid prefix and domain.';
        }

        if (!validPassword(password.value)) {
            event.preventDefault();
            errorPassword.hidden = false;
            errorPassword.innerHTML = 'Password must contain at least eight characters, have at least one uppercase letter, at least one number, and at least one special character. No spaces.';
        }
        // if (ajax === true) {
        //     fetch('/login', {
        //         method: 'POST',
        //         headers: {
        //             emailAddressInput: email.value,
        //             passwordInput: password.value
        //         }
        //     }).then(res => {
        //         if (res.ok) { return res.json(); }
        //         else { throw new Error('Error occurred! Status code: ' + res.status)}
        //     });
        // }
    });

}