/*******************************************************************************
 * Name        : offers.js (data)
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Final Project offer data function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/

import {listings} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helpers from '../helpers.js';

export const create = async (listingId, posterId, username, title, desc) => { // Good?
    listingId = helpers.isValidID(listingId);
    posterId = helpers.isValidID(posterId);
    title = helpers.isValidString(title);
	username = helpers.isValidString(username);
    desc = helpers.isValidString(desc);
    const offerId = new ObjectId();
	const newOffer = {
        _id: offerId,
		listingId: new ObjectId(listingId),
        posterId: new ObjectId(posterId),
		username: username,
        title: title,
        desc: desc
	};

	const listingCollection = await listings();
    const checkUser = await listingCollection.findOne({'_id': new ObjectId(listingId)});
	for (let i = 0; i < checkUser.offers.length; i++) {
		if (checkUser.offers[i].posterId == posterId) {throw new Error("Error: A user cannot make more than one offer to a listing at once.")}
	}
	await listingCollection.updateOne({_id: new ObjectId(listingId)}, {$push: {offers: newOffer}});
	return await get(offerId.toString());
};

export const getAll = async (listingId) => {
	listingId = helpers.isValidID(listingId);
	const listingCollection = await listings();
	const listingObj = await listingCollection.findOne({'_id': new ObjectId(listingId)});
	if (listingObj === null) {throw new Error("Error: there is no listing with that id.")}
	let offerArr = listingObj.offers;
	for (let i = 0; i < offerArr.length; i++) {
		offerArr[i]._id = offerArr[i]._id.toString();
	}
	return offerArr;
};

export const get = async (offerId) => {
	offerId = helpers.isValidID(offerId);
	const listingCollection = await listings();
	const listingObj = await listingCollection.findOne({"offers._id": new ObjectId(offerId)});
	if (listingObj === null) {throw new Error("Error: there is no listing with that id.")}
	for (let i = 0; i < listingObj.offers.length; i++) {
		if (listingObj.offers[i]._id.toString() == offerId.toString()) {
			listingObj.offers[i]._id = listingObj.offers[i]._id.toString()
			return listingObj.offers[i]
		}
	}
	throw new Error("Error: album with that id was not found.")
};
	
export const remove = async (offerId) => {
	offerId = helpers.isValidID(offerId);
	const listingCollection = await listings();
    const listingObj = await listingCollection.findOneAndUpdate({"offers._id": new ObjectId(offerId)},
    {$pull: {offers: {_id: new ObjectId(offerId)}}},{returnOriginal: true});
	if (listingObj === null) {throw new Error("Error: there is no offer with that id.")}
	return listingObj.value;
};

export default {create, get, getAll, remove}
