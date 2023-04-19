/************************************************************************************
 * Name        : listings.js (data)
 * Author      : Brandon Leung
 * Date        : April 17, 2023
 * Description : Final Project listings data function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ***********************************************************************************/
// This data file should export all functions using the ES6 standard as shown in the lecture code
import {listings} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helpers from '../helpers.js';

// {
//     "_id": ObjectId("6423820abc55383093f595fd"),
//     "posterId": ObjectId("6423820abc55383093f595fa"),
//     "open": true,
//     "listingType": [
//     "Sell",
//     "Trade"
//     ],
//     "title": "Pokemon Soulsilver Big Box with Pokewalker CIB",
//     "timestamps": {
//     "datePosted": "03/25/2023",
//     "timePosted": "15:21:32",
//     "dateUpdated": "03/30/2023",
//     "timeUpdated": "17:03:42"
//     },
//     "mainCondition": "Used",
//     "secondaryCondition": [
//     "Cartridge",
//     "Box",
//     "Game Manual",
//     "Inserts",
//     "Pokewalker & clip",
//     "Pokewalker Cardboard Insert",
//     "Outer Box",
//     "Plastic Case for Outer Box"
//     ],
//     "price": 290,
//     "tradeWants": [
//     "Pokemon Heartgold Big Box with Pokewalker CIB",,
//     "Rhythm Thief & the Emperor's Treasure CIB"
//     ],
//     "attachments": [
//     "https://i.imgur.com/RUG7UTW.jpeg",
//     "https://i.imgur.com/iBy6UNA.png",
//     "https://i.imgur.com/qcmgHj4.png",
//     "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
//     ],
//     "shippingPrice": 10,
//     "shippingMethods": [
//     "USPS Priority Mail",
//     "Local Meetup"
//     ],
//     "description": "Comes with everything except for Pokewalker manual and
//     Pokewalker sleeves.",
//     "returnPolicy": "Returns accepted within 30 days. Buyer must pay for return
//     shipping.",
//     "rejectionOfferValue": 270,
//     "currency": "United States Dollar",
//     "acceptedPaymentMethods": [
//     "Paypal G&S",
//     "Paypal F&F"
//     ],
//     "offers": {...},
//     "comments" : {...}
//     }

export const create = async (posterId, title, listingType, mainCondition, secondaryCondition, price, attachments, shippingPrice, shippingMethods, description, returnPolicy, rejectionOfferValue, currency, acceptedPaymentMethods) => {
	helpers.isValidID(posterId);
    helpers.isValidString(title);
	helpers.isValidString(listingType);
	helpers.isValidString(recordCompany);
	helpers.isValidURL(website);
	helpers.isValidArray(genre);
	helpers.isValidArray(groupMembers);
	helpers.isValidYear(yearBandWasFormed);
	for (let i = 0; i < genre.length; i++) {
		helpers.isValidString(genre[i]);
		genre[i] = genre[i].trim()
	}
	for (let i = 0; i < groupMembers.length; i++) {
		helpers.isValidString(groupMembers[i]);
		groupMembers[i] = groupMembers[i].trim();
	}
	name = name.trim();
	website = website.trim();
	recordCompany = recordCompany.trim();

	let newBand= {
		name: name,
		genre: genre,
		website: website,
		recordCompany: recordCompany,
		groupMembers: groupMembers,
		yearBandWasFormed: yearBandWasFormed,
		albums: [],
		overallRating: 0
    };
	const bandCollection = await bands();
	const insertInfo = await bandCollection.insertOne(newBand);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {throw new Error("Error: unable to add band.")}
	const newId = insertInfo.insertedId.toString();
	const band = await get(newId);
	return band;
};

export const getAll = async () => {
	const bandCollection = await bands();
	let bandList = await bandCollection.find({}, {projection:{_id: 1, name: 1}}).toArray();
	if (!bandList) {throw new Error("Error: was unable to get all bands.")}
	bandList = bandList.map((element) => {
		element._id = element._id.toString();
		return element;
	});
	return bandList;
};

export const get = async (id) => {
	helpers.isValidString(id);
	id = id.trim();
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: new ObjectId(id)});
    if (band === null) {throw new Error("Error: there is no band with that id.")}
    band._id = band._id.toString();
    return band;
};

export const remove = async (id) => {
	helpers.isValidString(id);
	id = id.trim();
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
	const bandCollection = await bands();
	const deletionInfo = await bandCollection.findOneAndDelete({_id: new ObjectId(id)});
	if (deletionInfo.lastErrorObject.n === 0) {throw new Error(`Error: was unable to delete band with id of ${id}.`)}
	return `${deletionInfo.value.name} has been successfully deleted!`;
};

export const update = async (id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	helpers.isValidString(id);
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID")}
	helpers.isValidString(name);
	helpers.isValidString(website);
	helpers.isValidString(recordCompany);
	helpers.isValidURL(website);
	helpers.isValidArray(genre);
	helpers.isValidArray(groupMembers);
	helpers.isValidYear(yearBandWasFormed);
	for (let i = 0; i < genre.length; i++) {
		helpers.isValidString(genre[i]);
		genre[i] = genre[i].trim()
	}
	for (let i = 0; i < groupMembers.length; i++) {
		helpers.isValidString(groupMembers[i]);
		groupMembers[i] = groupMembers[i].trim();
	}
	name = name.trim();
	website = website.trim();
	recordCompany = recordCompany.trim();
	const updatedBand = {
		name: name,
		genre: genre,
		website: website,
		recordCompany: recordCompany,
		groupMembers: groupMembers,
		yearBandWasFormed: yearBandWasFormed
	};
	const bandCollection = await bands();
	const updatedInfo = await bandCollection.findOneAndUpdate(
		{_id: new ObjectId(id)},
		{$set: updatedBand},
		{returnDocument: 'after'})
	if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the band info.")}
		updatedInfo.value._id = updatedInfo.value._id.toString();
		return updatedInfo.value;
};
