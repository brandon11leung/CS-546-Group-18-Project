import {users} from "./../config/mongoCollections.js";
import {MongoClient, ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
const saltRounds = 16;

export const createUser = async (
    firstName, //error checked
    lastName, //error checked
    emailAddress, //error checked
    username,
    age,
    dob,
    password, //error checked
    city,
    state,
  ) => {
    if ((!firstName) || (!lastName) || (!emailAddress) || (!password) || (!username) || (!age) || (!dob) || (!city) || (state)) {
      throw new Error ('All fields need to have valid values');
    }
  
    firstName = firstName.trim();
    lastName = lastName.trim();
    emailAddress = emailAddress.toLowerCase();
  
    //Check firstName
    if ((typeof firstName !== "string") || (!(firstName.replace(/\s/g, '').length)) || (firstName.length < 2) || (firstName.length > 25)) {
      throw new Error ('firstName field is invalid');
    }
    let findNum = firstName.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
      throw new Error ('firstName contains a number or special character');
    }
  
    //Check lastName
    if ((typeof lastName !== "string") || (!(lastName.replace(/\s/g, '').length)) || (lastName.length < 2) || (lastName.length > 25)) {
      throw new Error ('lastName field is invalid');
    }
    findNum = lastName.match(/[^a-zA-Z]+/g);
    if (findNum !== null) {
      throw new Error ('lastName contains a number or special character');
    }
  
    //Check email
    if (!emailAddress.includes('@')) {
      throw new Error ('invalid email');
    }
    if (emailAddress.includes(' ')) {
      throw new Error ('invalid email');
    }
    if ((!emailAddress.endsWith('.com')) && (!emailAddress.endsWith('.edu')) && (!emailAddress.endsWith('.org')) && (!emailAddress.endsWith('.net')) && (!emailAddress.endsWith('.int')) && (!emailAddress.endsWith('.gov')) && (!emailAddress.endsWith('.mil'))) {
      throw new Error ('invalid email');
    }
    if (emailAddress[0] === '@') {
      throw new Error ('invalid email');
    }
    let index = emailAddress.indexOf('@');
    if (emailAddress[index+1] === '.') {
      throw new Error ('invalid email');
    }
  
    //Check password
    if ((typeof password !== 'string') || (!(password.replace(/\s/g, '').length)) || (password.length < 8)) {
      throw new Error ('invalid password');
    }
    let upper = /[A-Z]/;
    let nums = /\d/;
    let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!upper.test(password) || !nums.test(password) || !specials.test(password)) {
      throw new Error ('invalid password');
    }
    const hash = await bcrypt.hash(password, saltRounds);
  
    //end of error checking

    //Creat doc
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const doc = `${month}/${day}/${year}`;
  
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      age: age,
      dob: dob,
      doc: doc,
      username: username,
      password: hash,
      city: city,
      state: state,
      comments: [],
      reviews: [],
      purchaseHistory: {},
      salesHistory: {},
      currentListings: [],
      watchedListings: [],
      overallRating: 0,
    };
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error ('Could not add user');
    }
  
    return {insertedUser: true};
  };
  
  export const checkUser = async (emailAddress, password) => {
    if ((!emailAddress) || (!password)) {
      throw new Error ('All fields need to have valid values');
    }
    emailAddress = emailAddress.toLowerCase();
    emailAddress = emailAddress.trim();
  
    //Check email
    if (!emailAddress.includes('@')) {
      throw new Error ('invalid email');
    }
    if (emailAddress.includes(' ')) {
      throw new Error ('invalid email');
    }
    if ((!emailAddress.endsWith('.com')) && (!emailAddress.endsWith('.edu')) && (!emailAddress.endsWith('.org')) && (!emailAddress.endsWith('.net')) && (!emailAddress.endsWith('.int')) && (!emailAddress.endsWith('.gov')) && (!emailAddress.endsWith('.mil'))) {
      throw new Error ('invalid email');
    }
    if (emailAddress[0] === '@') {
      throw new Error ('invalid email');
    }
    let index = emailAddress.indexOf('@');
    if (emailAddress[index+1] === '.') {
      throw new Error ('invalid email');
    }
  
    //Check password
    if ((typeof password !== 'string') || (!(password.replace(/\s/g, '').length)) || (password.length < 8)) {
      throw new Error ('invalid password');
    }
    let upper = /[A-Z]/;
    let nums = /\d/;
    let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!upper.test(password) || !nums.test(password) || !specials.test(password)) {
      throw new Error ('invalid password');
    }
  
    //End of error checking
    
    const userCollection = await users();
    const userro = await userCollection.findOne({emailAddress: emailAddress});
    if (userro === null) {
      throw new Error ('Either the email address or password is invalid');
    }
    userro._id = userro._id.toString();
    let compareToMatch = false;
    try {
      compareToMatch = await bcrypt.compare(password, userro.password);
    } catch (e) {
      //no op
    }
  
    if (compareToMatch) {
      return [userro.firstName, userro.lastName, userro.emailAddress, userro.role];
    } else {
      throw new Error ('Either the email address or password is invalid');
    }
    
  };