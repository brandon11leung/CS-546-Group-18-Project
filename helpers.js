/************************************************************************************
 * Name        : helpers.js
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 helper function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ***********************************************************************************/
// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';


let upper = /[A-Z]/;
let letters = /[A-Za-z]/;
let nums = /\d/;
let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


export const validName = (name) => {
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
export const validEmail = (email) => {

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


/* Valid username */
export const validUsername = (username) => {
    if ((typeof username !== "string") || (!(username.replace(/\s/g, '').length) || username.trim().length < 6)) {
       return false;
    }

    if (!letters.test(username)) { return false; }

    if (username.includes(' ')) { return false; }

    return true;
}


/* Valid password */
export const validPassword = (password) => {
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

export const validDOB = (dob) => {
    if (typeof dob !== 'string') { return false; }

    let splitDate = dob.split('-');
    if (splitDate.length !== 3) { return false; }
    

    /* Parse arguments first */
    let yearDate = parseInt(splitDate[0]);
    let monthDate = parseInt(splitDate[1]);
    let dayDate = parseInt(splitDate[2]);

    /* Check ages */
    if (yearDate < 1922 || yearDate > 2005) { return false; }

    /* Then check months */
    if (monthDate < 1 || monthDate > 12) { return false; }
    let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /* ...don't forget leap years! */
    if (monthDate === 2 && yearDate % 4 === 0) {
      monthArr[monthDate - 1] = 29;
    }

    /* Check the days */
    if (dayDate < 1 || dayDate > monthArr[monthDate - 1]) { return false; }

    const currDate = new Date();
    let currDay = currDate.getDate();
    let currMonth = currDate.getMonth() + 1;

    /* Edge cases */

    if (yearDate === 1922) {
      if ((monthDate === currMonth && dayDate <= currDay) || (monthDate < currMonth)) {
        return false;
      }
    }
    if (yearDate === 2005) {
      if ((monthDate === currMonth && dayDate > currDay) || (monthDate > currMonth)) {
        return false;
      }
    }

    return true;
}

/* Valid city */
export const validCity = (city) => {
    if ((typeof city !== "string") || (!(city.replace(/\s/g, '').length)) || (city.trim().length < 2)) {
        return false;
    }

    city = city.trim();

    if (nums.test(city) || specials.test(city)) { return false; }

    return true;
}


export const validState = (state) => {

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

export const isValidString = (arg, argName) => { // Universal
    if (!isValidString) {throw new Error(`Error: the ${argName} parameter does not exist.`)}
    if (typeof arg === "undefined" || !arg) {throw new Error(`Error: the ${argName} parameter is undefined.`)}
    if (typeof arg !== "string") {throw new Error(`Error: the ${argName} parameter is not a valid string.`)}
    if (arg.trim() == "") {throw new Error(`Error: the ${argName} parameter consists of only white space.`)}
    arg = arg.trim();
    return arg
}

export const isValidNumber = (arg, argName) => {
    if (isNaN(arg)) {throw new Error(`Error: the ${argName} parameter is not a valid number.`)}
}

export const isValidID = (arg, argName) => {
    arg = isValidString(arg);
    arg = arg.trim()
    if (!ObjectId.isValid(arg)) {throw new Error(`Error: the ${argName} parameter is not a valid ID.`)}
    return arg;
}

export const isValidArray = (arg, argName) => { // Universal
    if (!arg) {throw new Error(`Error: the ${argName} parameter does not exist.`)}
    if (typeof arg === "undefined") {throw new Error(`Error: the ${argName} is undefined.`)}
    if (Array.isArray(arg) == false) {throw new Error(`Error: the ${argName} is not a valid array`)}
    if (arg.length == 0) {throw new Error(`Error: the ${argName} parameter is an empty array.`)}
    
}

export const isValidPrice = (arg, argName) => {
    isValidNumber(arg);
    if (Number(arg.toFixed(2)) !== arg) {throw new Error(`Error: the ${argName} parameter is not a valid price`)}
    return arg
}
