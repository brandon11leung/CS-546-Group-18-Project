/************************************************************************************
 * Name        : helpers.js
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 helper function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ***********************************************************************************/
// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';

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
