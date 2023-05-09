/* Luke Bianchi */
import {listings, transactions, users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import timestamp from "time-stamp";
import{updateStatus} from "./listings.js";

export const createTransaction = async (
    listingId,
    // listingName,
    // timestamps,
    // price,
    // seller,
    buyerOrSeller
) => {
    const listingCollection = await listings();
    const transactionCollection = await transactions();
    if ((!listingId) || (!buyerOrSeller)) {
        throw new Error ('All fields need to have values');
    }
    if ((typeof listingId !== "string") || (typeof buyerOrSeller !== "string")) {
        throw new Error ('listingId and buyer must be nonempty strings');
    }
    if ((!(listingId.replace(/\s/g, '').length)) || (!(buyerOrSeller.replace(/\s/g, '').length))) {
        throw new Error ('listingId and buyer must be nonempty strings');
    }
    listingId = listingId.trim();
    buyerOrSeller = buyerOrSeller.trim();
    if (!ObjectId.isValid(listingId)) throw 'invalid object ID on listingId';
    if (!ObjectId.isValid(buyerOrSeller)) throw 'invalid object ID on listingId';

    //Find listing
    let listing = await listingCollection.findOne({_id: new ObjectId(listingId)});
    if (listing === null) { throw new Error('Listing not found in database'); }
    
    if (listing.open === false) { throw new Error('The listing is not open'); }

    if (listing.posterId.equals(new ObjectId(buyerOrSeller))) { throw new Error('Seller/buyer cannot purchase their own listing!'); }

    // console.log(listing);

    if (listing.listingType === 'Sell') {
        var newTransaction = {
            _id: new ObjectId(),
            listingId: listingId,
            listingName: listing.title,
            timestamp: timestamp('YYYY/MM/DD - HH:mm:ss'),
            price: listing.price,
            seller: listing.posterId,
            buyer: new ObjectId(buyerOrSeller)
        }

        let userData = await users();
        let buyer = await userData.findOne({_id: new ObjectId(buyerOrSeller)});
        let seller = await userData.findOne({_id: new ObjectId(listing.posterId)});
        
        //Update purchaseHistory for buyer
        let updatedUser = {
            $push: { purchaseHistory: {_id: new ObjectId(listingId), username: seller.username, title: listing.title, price: listing.price}}
        }

        let updatedInfo = await userData.findOneAndUpdate(
            {_id: new ObjectId(buyerOrSeller)},
            updatedUser,
            {returnDocument: 'after'})
        if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the user info.")}
            updatedInfo.value._id = updatedInfo.value._id.toString();

        //Update salesHistory for seller
        updatedUser = {
            $push: { salesHistory: {_id: new ObjectId(listingId), username: buyer.username, title: listing.title, price: listing.price}},
            $pull: { currentListings: {_id: new ObjectId(listingId) }}
        }
        userData = await users();
        updatedInfo = await userData.findOneAndUpdate(
            {_id: new ObjectId(listing.posterId)},
            updatedUser,
            {returnDocument: 'after'})
        if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the user info.")}
            updatedInfo.value._id = updatedInfo.value._id.toString();
    } else {
        var newTransaction = {
            _id: new ObjectId(),
            listingId: listingId,
            listingName: listing.title,
            timestamp: timestamp('YYYY/MM/DD - HH:mm:ss'),
            price: listing.price,
            seller: new ObjectId(buyerOrSeller),
            buyer: listing.posterId
        }
        //Update purchaseHistory for buyer
        let userData = await users();
        let seller = await userData.findOne({_id: new ObjectId(buyerOrSeller)});
        let buyer = await userData.findOne({_id: new ObjectId(listing.posterId)});
        let updatedUser = {
            $push: { purchaseHistory: {_id: new ObjectId(listingId), username: seller.username, title: listing.title, price: listing.price} }
        }
        let updatedInfo = await userData.findOneAndUpdate(
            {_id: new ObjectId(listing.posterId)},
            updatedUser,
            {returnDocument: 'after'})
        if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the user info.")}
            updatedInfo.value._id = updatedInfo.value._id.toString(); 

        //Update salesHistory for seller
        
        updatedUser = {
            $push: { salesHistory: {_id: new ObjectId(listingId), username: buyer.username, title: listing.title, price: listing.price} },
            $pull: { currentListings: {_id: new ObjectId(listingId) }}
        } 
        userData = await users();
        updatedInfo = await userData.findOneAndUpdate(
            {_id: new ObjectId(buyerOrSeller)},
            updatedUser,
            {returnDocument: 'after'})
        if (updatedInfo.lastErrorObject.n === 0) {throw new Error("Error: unable to update the user info.")}
            updatedInfo.value._id = updatedInfo.value._id.toString();
    }
    
    const insertInfo = await transactionCollection.insertOne(newTransaction);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error ('Could not add transaction');
    }

    await updateStatus(listingId, false);
    
    return {insertedTransaction: true};

}

export default {createTransaction}

