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
import timestamp from "time-stamp";

export const create = async (posterId, title, listingType, mainCondition, secondaryCondition, price, attachments, shippingPrice, shippingMethods, description, returnPolicy, currency) => {
	posterId = helpers.isValidID(posterId);
    title = helpers.isValidString(title);
	listingType = helpers.isValidString(listingType);
	mainCondition = helpers.isValidString(mainCondition);
	
    helpers.isValidArray(secondaryCondition);
	for (let i = 0; i < secondaryCondition.length; i++) {
		secondaryCondition[i] = helpers.isValidString(secondaryCondition[i]);
	}
	helpers.isValidPrice(price);
    helpers.isValidArray(shippingMethods);
	for (let i = 0; i < shippingMethods.length; i++) {
		shippingMethods[i] = helpers.isValidString(shippingMethods[i]);
    }
    description = helpers.isValidString(description);
    currency = helpers.isValidString(currency);
	
    helpers.isValidArray(attachments);
    returnPolicy = helpers.isValidString(returnPolicy);
    helpers.isValidPrice(shippingPrice);

    if (listingType == "Buy") {
        shippingPrice = 0;
    }

	let newListing = {
		posterId: new ObjectId(posterId),
        open: true,
        listingType: listingType,
		title: title,
		timeStampPosted: timestamp('YYYY/MM/DD - HH:mm:ss'),
        timeStampUpdated: timestamp('YYYY/MM/DD - HH:mm:ss'),
		mainCondition: mainCondition,
		secondaryCondition: secondaryCondition,
		price: price,
		attachments: attachments,
		shippingPrice: shippingPrice,
		shippingMethods: shippingMethods,
		description: description,
		returnPolicy: returnPolicy,
		currency: currency,
		offers: [],
		comments: []
    };
	const listingCollection = await listings();
	const insertInfo = await listingCollection.insertOne(newListing);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {throw new Error("Error: unable to add listing.")}
	const newId = insertInfo.insertedId.toString();
	const listing = await get(newId);
	return listing;
};


export const getAll = async () => {
	const listingCollection = await listings();
	let listingList = await listingCollection.find({}).toArray();
	if (!listingList) {throw new Error("Error: was unable to get all listings.")}
	listingList = listingList.map((element) => {
		element._id = element._id.toString();
		return element;
	});
	return listingList;
};

export const get = async (id) => {
	id = helpers.isValidString(id);
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
    const listingCollection = await listings();
    const listing = await listingCollection.findOne({_id: new ObjectId(id)});
    if (listing === null) {throw new Error("Error: there is no listing with that id.")}
    listing._id = listing._id.toString();
    return listing;
};

export const remove = async (id) => {
	id = helpers.isValidID(id)
	const listingCollection = await listings();
	const deletionInfo = await listingCollection.findOneAndDelete({_id: new ObjectId(id)});
	if (deletionInfo.lastErrorObject.n === 0) {throw new Error(`Error: was unable to delete listing with id of ${id}.`)}
	return `${deletionInfo.value.name} has been successfully deleted!`;
};

export const update = async (id, open, title, listingType, mainCondition, secondaryCondition, price, attachments, shippingPrice, shippingMethods, description, returnPolicy, currency) => {
	if (typeof(open) !== "boolean") {throw new Error("Error: invalid open type.")}
	id = helpers.isValidID(id);
    title = helpers.isValidString(title);
	listingType = helpers.isValidString(listingType);
	if ((listingType == "Buy" || listingType == "Sell") == false) {throw new Error("Error: invalid listing type.")}
	mainCondition = helpers.isValidString(mainCondition);
    helpers.isValidArray(secondaryCondition);
	for (let i = 0; i < secondaryCondition.length; i++) {
		secondaryCondition[i] = helpers.isValidString(secondaryCondition[i]);
	}
	price = helpers.isValidPrice(price);
    helpers.isValidArray(shippingMethods);
	for (let i = 0; i < shippingMethods.length; i++) {
		shippingMethods[i] = helpers.isValidString(shippingMethods[i]);
	}
    description = helpers.isValidString(description);
    helpers.isValidPrice(rejectionOfferValue);
    currency = helpers.isValidString(currency);

    const listingCollection = await listings();
    const originalInfo = await listingCollection.findOne({_id: new ObjectId(id)});
    console.log(originalInfo)
    helpers.isValidArray(attachments);
    returnPolicy = helpers.isValidString(returnPolicy);
    helpers.isValidPrice(shippingPrice);
    if (originalInfo.listingType.toLowerCase() == "buy") {
        shippingPrice = 0;
    }

	const updatedListing = {
        open: true,
		title: title,
		timeStampUpdated: timestamp('YYYY/MM/DD - HH:mm:ss'),
		mainCondition: mainCondition,
		secondaryCondition: secondaryCondition,
		price: price,
		attachments: attachments,
		shippingPrice: shippingPrice,
		shippingMethods: shippingMethods,
		description: description,
		returnPolicy: returnPolicy,
		currency: currency
	};
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(id)},
		{$set: updatedListing},
		{returnDocument: 'after'})
	if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the listing info.")}
		updatedInfo.value._id = updatedInfo.value._id.toString();
		return updatedInfo.value;
};
