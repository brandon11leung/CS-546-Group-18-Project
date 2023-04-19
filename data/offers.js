/*******************************************************************************
 * Name        : albums.js (data)
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 albums data function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
// This data file should export all functions using the ES6 standard as shown in the lecture code
import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helpers from '../helpers.js';

export const create = async (bandId, title, releaseDate, tracks, rating) => { // Good?
    helpers.isValidString(bandId);
	if (!ObjectId.isValid(bandId)) {throw new Error("Error: invalid object ID")}
	helpers.isValidString(title);
	helpers.isValidDate(releaseDate);
	helpers.isValidArray(tracks);
	for (let i = 0; i < tracks.length; i++) {
		tracks[i] = helpers.isValidString(tracks[i]);
	}
	helpers.isValidRating(rating);
	let albumId = new ObjectId();
	const newAlbum = {
		_id: albumId,
		title: title,
		releaseDate: releaseDate,
		tracks: tracks,
		rating: rating
	};
	const bandsCollection = await bands();
	const bandObjDup = await bandsCollection.findOne({'_id': new ObjectId(bandId)});
	for (let i = 0; i < bandObjDup.albums.length; i++) {
		if (bandObjDup.albums[i].title == title) {throw new Error("Error: A band cannot have albums that share the same name.")}
	}
	await bandsCollection.updateOne({_id: new ObjectId(bandId)}, {$push: {albums: newAlbum}});
	const bandObj = await bandsCollection.findOne({'_id': new ObjectId(bandId)});
	let allRatings = 0;
	let numRatings = 0
	for (let i = 0; i < bandObj.albums.length; i++) {
		allRatings += bandObj.albums[i].rating;
		numRatings++;
	}
	let overallRating = +(allRatings/numRatings).toFixed(1);
	await bandsCollection.updateOne({_id: new ObjectId(bandId)}, {$set: {overallRating: overallRating}});
	return await get(albumId.toString());
};

export const getAll = async (bandId) => {
	bandId = helpers.isValidID(bandId);
	const bandsCollection = await bands();
	const bandObj = await bandsCollection.findOne({'_id': new ObjectId(bandId)});
	if (bandObj === null) {throw new Error("Error: there is no band with that id.")}
	let albumArr = bandObj.albums;
	for (let i = 0; i < albumArr.length; i++) {
		albumArr[i]._id = albumArr[i]._id.toString();
	}
	return albumArr;
};

export const get = async (albumId) => {
	albumId = helpers.isValidID(albumId);
	const bandsCollection = await bands();
	const bandObj = await bandsCollection.findOne({"albums._id": new ObjectId(albumId)});
	if (bandObj === null) {throw new Error("Error: there is no band with that id.")}
	for (let i = 0; i < bandObj.albums.length; i++) {
		if (bandObj.albums[i]._id.toString() == albumId.toString()) {
			bandObj.albums[i]._id = bandObj.albums[i]._id.toString()
			return bandObj.albums[i]
		}
	}
	throw new Error("Error: album with that id was not found.")
};
	
export const remove = async (albumId) => {
	helpers.isValidID(albumId);
	const bandsCollection = await bands();
    const bandObj = await bandsCollection.findOneAndUpdate({"albums._id": new ObjectId(albumId)},
    {$pull: {albums: {_id: new ObjectId(albumId)}}},{returnOriginal: true});
	if (bandObj === null) {throw new Error("Error: there is no album with that id.")}
	let allRatings = 0;
	let numRatings = 0;
	let overallRating = 0;
	if (bandObj.value.albums.length > 1) {
		for (let i = 0; i < bandObj.value.albums.length; i++) {
			if (bandObj.value.albums[i]._id.toString() != albumId.toString()) {
				allRatings += bandObj.value.albums[i].rating;
				numRatings++;
			} 
			overallRating = +(allRatings/numRatings).toFixed(1);
		}		
	}
	await bandsCollection.updateOne({_id: bandObj.value._id}, {$set: {overallRating: overallRating}});
	return bandObj.value;
};
