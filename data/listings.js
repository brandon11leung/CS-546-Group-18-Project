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
import * as pricecharting from '../utils/pricecharting.js'
import timestamp from "time-stamp";
const validMainConditionArr = ["New", "Graded", "Like New/Open Box", "Used", "For Parts or Not Working"];
const validSecondaryConditionArr = ["Cartridge", "Box", "Manual", "Console", "Controller", "Disc", "Cables", "Redemption Code", "Other", "Outer Box"];
const validListingTypeArr = ["Buy", "Sell", "Trade"];
const validShippingMethodsArr = ["Shipping", "Local Meetup", "Both Shipping and Local Meetup"];
const validReturnPolicyArr = ["No Returns", 
							  "30 Day Returns (Buyer pays for return shipping)", 
							  "30 Day Returns (Seller pays for return shipping)",
							  "60 Day Returns (Buyer pays for return shipping)", 
							  "60 Day Returns (Seller pays for return shipping)",
							  "90 Day Returns (Buyer pays for return shipping)", 
							  "90 Day Returns (Seller pays for return shipping)",
							  "No Preference"];

export const create = async (posterId, title, listingType, mainCondition, secondaryCondition, price, attachments, trades, shippingPrice, shippingMethods, description, returnPolicy, currency, pricechartingID) => {
	
	posterId = helpers.isValidID(posterId);
    title = helpers.isValidString(title);
	listingType = helpers.isValidString(listingType);
	mainCondition = helpers.isValidString(mainCondition);
	helpers.isValidTradeArray(trades);
	if (!pricechartingID == false) {
		helpers.isValidNumber(pricechartingID);
	}
	if(trades.length === 1 && trades[0] === ''){
	}
	else{
		for (let i = 0; i < trades.length; i++) {
			trades[i] = helpers.isValidString(trades[i])
		}
	}
	
	helpers.isValidArray(secondaryCondition);
	for (let i = 0; i < secondaryCondition.length; i++) {
		secondaryCondition[i] = helpers.isValidString(secondaryCondition[i]);
	}
	helpers.isValidPrice(price);
    helpers.isValidString(shippingMethods);
    description = helpers.isValidString(description);
    currency = helpers.isValidString(currency);
    helpers.isValidArray(attachments);
    returnPolicy = helpers.isValidString(returnPolicy);
    helpers.isValidPrice(shippingPrice);
	if (validMainConditionArr.includes(mainCondition) == false) {
		throw new Error("Error: Invalid Main Condition.");
	}
	for (let i = 0; i < secondaryCondition.length; i++) {
		if (validSecondaryConditionArr.includes(secondaryCondition[i]) == false) {
			throw new Error("Error: Invalid Secondary Condition.");
		}
	}
	if (validListingTypeArr.includes(listingType) == false) {
		throw new Error("Error: Invalid Listing Type.");
	}
	if (validShippingMethodsArr.includes(shippingMethods) == false) {
			throw new Error("Error: Invalid Shipping Method.");
		}
	
	if (validReturnPolicyArr.includes(returnPolicy) == false) {
		throw new Error("Error: Invalid Return Policy .");
	}

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
		trades: trades,
		shippingPrice: shippingPrice,
		shippingMethods: shippingMethods,
		description: description,
		returnPolicy: returnPolicy,
		currency: currency,
		pricechartingID: pricechartingID,
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
	return `${deletionInfo.value.title} has been successfully deleted!`;
};

export const updateStatus = async (id, open) => {
	if (typeof(open) !== "boolean") {throw new Error("Error: invalid open type.")}
	id = helpers.isValidID(id);
	const updatedListing = {
		open: open
	}
	const listingCollection = await listings();
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(id)},
		{$set: updatedListing},
		{returnDocument: 'after'})
	if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the listing info.")}
		updatedInfo.value._id = updatedInfo.value._id.toString();
		return updatedInfo.value;
}

export const update = async (id, open, title, listingType, mainCondition, secondaryCondition, price, attachments, trades, shippingPrice, shippingMethods, description, returnPolicy, currency, pricechartingID) => {
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
	if (!pricechartingID == false) {
		helpers.isValidNumber(pricechartingID, "Pricecharting ID");
	}
	helpers.isValidTradeArray(trades);
	for (let i = 0; i < trades.length; i++) {
		trades[i] = helpers.isValidString(trades[i], "Trade Array Element")
	}
	price = helpers.isValidPrice(price);
    helpers.isValidArray(shippingMethods);
	for (let i = 0; i < shippingMethods.length; i++) {
		shippingMethods[i] = helpers.isValidString(shippingMethods[i]);
	}
    description = helpers.isValidString(description);

    currency = helpers.isValidString(currency);

    const listingCollection = await listings();
    const originalInfo = await listingCollection.findOne({_id: new ObjectId(id)});
    helpers.isValidArray(attachments);
    returnPolicy = helpers.isValidString(returnPolicy);
    helpers.isValidPrice(shippingPrice);
    if (originalInfo.listingType.toLowerCase() == "buy") {
        shippingPrice = 0;
    }

	const updatedListing = {
        open: open,
		title: title,
		timeStampUpdated: timestamp('YYYY/MM/DD - HH:mm:ss'),
		mainCondition: mainCondition,
		secondaryCondition: secondaryCondition,
		price: price,
		attachments: attachments,
		trades: trades,
		shippingPrice: shippingPrice,
		shippingMethods: shippingMethods,
		description: description,
		returnPolicy: returnPolicy,
		currency: currency,
		pricechartingID: pricechartingID
	};
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(id)},
		{$set: updatedListing},
		{returnDocument: 'after'})
	if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the listing info.")}
		updatedInfo.value._id = updatedInfo.value._id.toString();
		return updatedInfo.value;
};

export const searchByTitle = async (searchQuery) => {
    //searchQuery = helpers.isValidString(searchQuery, "Search Query").toLowerCase();
    const listingCollection = await listings();
    const allListings = await getAll();
    let matchedListings = [];
	searchQuery = searchQuery.trim().toLowerCase();
	if (searchQuery != "") {
		for (let i = 0; i < allListings.length; i++) {
			let currListingTitle = allListings[i].title.toLowerCase();
			if (currListingTitle.indexOf(searchQuery) > -1 || currListingTitle.includes(searchQuery)) {
				// matchedListings.push(allListings[i]._id);
				matchedListings.push(allListings[i]);
			}
		}
	} else {
		matchedListings = allListings
	}
    return matchedListings;
}

export const filterByElements = async (listings, elements) => { 
	let filteredListings = []
	for (let i = 0; i < listings.length; i++) {
		let matchFilter = true;
		if (typeof elements.open !== "boolean" && elements.open !== null) {
			throw new Error("Error: Open is not a boolean.");
		}
		if (elements.open == false && listings[i].open == true) {
			matchFilter = false;
		} else if (elements.open == true && listings[i].open == false) {
			matchFilter = false;
		}
		if (elements.console != null) {
			if (listings[i].pricechartingID == null) {
				matchFilter = false;
			} else {
				if (pricecharting.ntscConsoleArr.includes(elements.console) == false) {
					throw new Error("Error: Invalid Console.");
				}
				let listingConsole = await pricecharting.searchByID(listings[i].pricechartingID)
				listingConsole = listingConsole.consoleName;
				if (elements.console.includes(listingConsole) == false) {
					matchFilter = false;
				}
			}
		}
	
	if ((validMainConditionArr.includes(elements.mainCondition) == false || validMainConditionArr.includes(listings[i].mainCondition) == false) && elements.mainCondition != null) {
		throw new Error("Error: Invalid Main Condition.");
	}
	if (elements.mainCondition == "New" && listings[i].mainCondition != "New") {
		matchFilter = false;
	} else if (elements.mainCondition == "Graded" && listings[i].mainCondition != "Graded") {
		matchFilter = false;
	} else if (elements.mainCondition == "Like New/Open Box" && listings[i].mainCondition != "Like New/Open Box") {
		matchFilter = false;
	} else if (elements.mainCondition == "Used" && listings[i].mainCondition != "Used") {
		matchFilter = false;
	} else if (elements.mainCondition == "For Parts or Not Working" && listings[i].mainCondition != "For Parts or Not Working") {
		matchFilter = false;
	}
	if (elements.secondaryCondition.length > 0 && listings[i].secondaryCondition.length > 0) {
		let check = false;
		for (let j = 0; j < elements.secondaryCondition.length; j++) {
			if (validSecondaryConditionArr.includes(elements.secondaryCondition[j]) == false && validSecondaryConditionArr.includes(listings[i].secondaryCondition[j]) == false) {
				throw new Error("Error: Invalid Secondary Condition.");
			}
			// if (elements.secondaryCondition.includes(listings[i].secondaryCondition[j])) {
			// 	check = true;
			// }
			if (listings[i].secondaryCondition.includes(elements.secondaryCondition[j]) == false) {
				check = true;
			}
		}
		if (check == true) {
			matchFilter = false;
		}
	}
		if ((validListingTypeArr.includes(elements.listingType) == false || validListingTypeArr.includes(listings[i].listingType) == false) && elements.listingType != null) {
			throw new Error("Error: Invalid Listing Type.");
		}
		if (elements.listingType == "Sell" && listings[i].listingType != "Sell") {
			matchFilter = false;
		} else if (elements.listingType == "Buy" && listings[i].listingType != "Buy") {
			matchFilter = false;
		}
		if (typeof elements.trades !== "boolean" && elements.trades !== null) {
			throw new Error("Error: Trades is not a boolean.");
		}
		if (elements.trades == true && listings[i].trades.length == 0) {
			matchFilter = false;
		}
		
		if (validShippingMethodsArr.includes(elements.shippingMethods) == false && elements.shippingMethods != null) {
			throw new Error("Error: Invalid Shipping Method.");
		}
		if (((listings[i].shippingMethods != elements.shippingMethods) && elements.shippingMethods != null) && (listings[i].shippingMethods != "Both Shipping and Local Meetup")) {
			matchFilter = false;
		} 
		
		if (typeof elements.freeShipping !== "boolean" && elements.freeShipping !== null) {
			throw new Error("Error: Free Shipping is not a boolean.");
		}
		if (elements.freeShipping == true && listings[i].shippingPrice > 0 && listings[i].listingType == "Sell") {
			matchFilter = false;
		} else if (elements.freeShipping == false && listings[i].shippingPrice == 0 && listings[i].listingType == "Sell") {
			matchFilter = false;
		}
		if (elements.returnPolicy == false && listings[i].returnPolicy != "No Returns") {
			matchFilter = false;

		} else if (elements.returnPolicy == true && listings[i].returnPolicy == "No Returns") {
			matchFilter = false;
	
		}

		if (matchFilter == true) {
			filteredListings.push(listings[i]);
		}
	}
	return filteredListings;
}

export const sortByElement = async (listings, element, order) => {

	const validElementArr = ["Default", "By Alphabetically", "By Newest", "By Price"]
	let sortedArr = []
	if (validElementArr.includes(element) == false) {
		throw new Error("Error: invalid element parameter.");
	}
	if ((order == 0 || order == 1) == false) {
		throw new Error("Error: invalid order parameter.");
	}
	if (element == "Default") {
		let tier0 = []; // Below Market Price
		let tier1 = []; // At Market Price
		let tier2 = []; // Other items or For Parts or Not Working
		let tier3 = []; // No Pricecharting data
		let tier4 = []; // Above Market price
		const multiplier0 = 0.8;
		const multiplier1 = 1.5;
		
		for (let i = 0; i < listings.length; i++) {
		
			if (listings[i].listingType == "Buy") {
				tier1.push(listings[i]);
				continue;
			}
	
			let tempShippingPrice = listings[i].shippingPrice;
			if (listings[i].shippingPrice > 25) {
				tempShippingPrice = 25;
			}
			let pricechartingData = await pricecharting.searchByID(listings[i].pricechartingID);
			let comp;
			if (listings[i].mainCondition == "New") {
				comp = pricechartingData.newPrice;
			} else if (listings[i].mainCondition == "Graded") {
				comp = pricechartingData.gradedPrice;
			} else if (listings[i].mainCondition == "Used") {
				let binary = 1000;
				if ((listings[i].secondaryCondition.includes("Cartridge") || listings[i].secondaryCondition.includes("Disc") || listings[i].secondaryCondition.includes("Console")) && pricechartingData.loosePrice) {binary += 100}
				if ((listings[i].secondaryCondition.includes("Manual")) && pricechartingData.manualPrice) {binary += 10}
				if ((listings[i].secondaryCondition.includes("Box") || listings[i].secondaryCondition.includes("Case")) && pricechartingData.boxPrice) {binary += 1}
				if (binary == 1111) {
					comp = pricechartingData.cibPrice;
				} else if (binary == 1100) {
					comp = pricechartingData.loosePrice;
				} else if (binary == 1011) {
					comp = pricechartingData.manualPrice + pricechartingData.boxPrice;
				} else if (binary == 1110) {
					comp = pricechartingData.loosePrice + pricechartingData.manualPrice;
				} else if (binary == 1101) {
					comp = pricechartingData.loosePrice + pricechartingData.boxPrice;
				} else if (binary == 1010) {
					comp = pricechartingData.manualPrice
				} else if (binary == 1001) {
					comp = pricechartingData.boxPrice;
				} else {
					tier2.push(listings[i]);
					continue;
				}
			} else {
				tier3.push(listings[i]);
				continue; 
			}
		
			if (listings[i].price + tempShippingPrice <= comp * multiplier1) {
				tier1.push(listings[i]);
			} else if (listings[i].price + tempShippingPrice <= comp * multiplier0) {
				tier0.push(listings[i]);
				tier1.push(listings[i]);
			}
			else {
				tier4.push(listings[i]);
			}
			// console.log("Tier 1")
			// console.log(tier1)
			// console.log("Tier 2")
			// console.log(tier2)
			// console.log("Tier 3")
			// console.log(tier3)
			// console.log("Tier 4")
			// console.log(tier4)
		}
		sortedArr = tier1.concat(tier2.concat(tier3.concat(tier4)))
	}

	if (element == "By Alphabetically") {
		let titleArr = [];
		for (let i = 0; i < listings.length; i++) {
			titleArr.push(listings[i].title);
		}
		titleArr.sort();
		for (let i = 0; i < titleArr.length; i++) {
			for (let j = 0; j < listings.length; j++) {
				if (titleArr[i] == listings[j].title) {
					sortedArr[i] = listings[j];
					break;
				}
			}
		}
	}
	if (element == "By Newest") {
		
		let timestampArr = [];
		for (let i = 0; i < listings.length; i++) {
			timestampArr.push(listings[i].timeStampUpdated);
		}
		helpers.timestampSort(timestampArr);
		for (let i = 0; i < timestampArr.length; i++) {
			for (let j = 0; j < listings.length; j++) {
				if (timestampArr[i] == listings[j].timeStampUpdated) {
					sortedArr[i] = listings[j];
					listings.splice(listings.indexOf(listings[j]), 1)
					break;
				}
			}
		}
		sortedArr = sortedArr.reverse();
	}
	if (element == "By Price") {
		let priceArr = [];
		for (let i = 0; i < listings.length; i++) {
			priceArr.push(listings[i].price + listings[i].shippingPrice);
		}
		priceArr = helpers.stupidSort(priceArr);
		for (let i = 0; i < priceArr.length; i++) {
			for (let j = 0; j < listings.length; j++) {
				if (priceArr[i] == listings[j].price + listings[j].shippingPrice) {
					sortedArr[i] = listings[j];
					listings.splice(listings.indexOf(listings[j]), 1)
					break;
				}
			}
		}
		console.log(sortedArr)
	}
	if (order == 1) {
		sortedArr = sortedArr.reverse();
	}
	return sortedArr;
}

export const addComment = async (Listingid, username, posterid, comment) => {
	if (typeof(comment) !== "string") {throw new Error("Error: invalid comment type.")}
	if (typeof(username) !== "string") {throw new Error("Error: invalid username type.")}
	Listingid = helpers.isValidID(Listingid);
	posterid = helpers.isValidID(posterid);
	const listingCollection = await listings();
	const newComment = {
		_id: new ObjectId(),
		listingId: Listingid,
		username: username,
		posterId: posterid,
		content: comment
	}
	let listing = await get(Listingid);
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(Listingid)},
		{$set: {comments: listing['comments'].concat(newComment)}},
		{returnDocument: 'after'})
	if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the listing info.")}
		updatedInfo.value._id = updatedInfo.value._id.toString();
		return updatedInfo.value;
}

export default {create, get, getAll, remove, update, updateStatus, addComment}
