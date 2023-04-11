/*******************************************************************************
 * Name        : bands.js (data)
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 bands data function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
// This data file should export all functions using the ES6 standard as shown in the lecture code
import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helpers from '../helpers.js';

export const create = async (name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
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
