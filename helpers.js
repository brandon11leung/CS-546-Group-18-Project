/************************************************************************************
 * Name        : helpers.js
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 helper function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ***********************************************************************************/
// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';

export const isValidString = (arg) => { // Universal
    if (typeof arg === "undefined" || !arg) {throw new Error("Error: a string parameter does not exist.")}
    if (typeof arg !== "string") {throw new Error("Error: a string parameter is not a string.")}
    if (arg.trim() == "") {throw new Error("Error: a string parameter consists of only empty spaces or white space.")}
    arg = arg.trim();
    return arg
}

export const isValidID = (arg) => {
    arg = isValidString(arg);
    arg = arg.trim()
    if (!ObjectId.isValid(arg)) {throw new Error("Error: invalid object ID.")}
    return arg;
}

export const isValidArray = (arg) => { // Universal
    if (typeof arg === "undefined" || !arg) {throw new Error("Error: an array parameter does not exist.")}
    if (arg.length == 0) {throw new Error("Error: an array parameter is empty.")}
}

export const isValidURL = (arg) => { // Specific
    isValidString(arg);
    arg = arg.toLowerCase().trim();
    let urlArr = arg.split('.');
    if (urlArr[0] != "http://www") {throw new Error("Error: the URL does begun with 'http://www.'")}
    if ((arg[arg.length-4] != '.') ||
        (arg[arg.length-3] != 'c') ||
        (arg[arg.length-2] != 'o') ||
        (arg[arg.length-1] != 'm')) {throw new Error("Error: the URL does not contain  'http://www.' or does not end in '.com'.")}
    if (arg.length - 15 < 5) {throw new Error("Error: the URL does not contain at least 5 characters between 'http://www.' and '.com'.")}
    return arg;
}

export const isValidYear = (arg) => { // Specific
    if (typeof arg === "undefined" || !arg) {throw new Error("Error: a number parameter does not exist.")}
    if (typeof arg !== "number") {throw new Error("Error: a number parameter is not a number.")}
    if (arg < 1900 || arg > 2023) {throw new Error("Error: yearBandWasFormed is earlier than 1900 or later than 2024.")}
}

export const isValidDate = (arg) => { // Specific
    arg = isValidString(arg);
    const monthArr = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dateArr = arg.split('/');
    for (let i = 0; i < dateArr.length; i++) {
        if (i < 2) {
            if (dateArr[i].length != 2) {throw new Error("Error: a part of the date is invalid.")}
        } else {
            if (dateArr[i].length != 4) {throw new Error("Error: a part of the date is invalid.")}
        }
        dateArr[i] = Number(dateArr[i]);
        if (isNaN(dateArr[i])) {throw new Error("Error: a part of the date is not a number.")}
    }
    if (dateArr[0] < 1 || dateArr[0] > 12) {throw new Error("Error: the date is invalid.")}
    if (dateArr[1] < 1 || dateArr[1] > monthArr[dateArr[0]]) {throw new Error("Error: the date is invalid.")}
    isValidYear(dateArr[2] - 1);
    return arg;
}

export const isValidRating = (arg) => { // Specific
    if (isNaN(arg)) {throw new Error("Error: rating is not a number.")}
    if ((arg.toString().length == 1 || arg.toString().length == 3) == false) {throw new Error("Error: invalid rating format.")}
    if (arg < 1 || arg > 5) {throw new Error("Error: the rating is invalid.")}
}
