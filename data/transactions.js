/* Luke Bianchi */
import {listings, transactions} from '../config/mongoCollections.js';
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
    if (listing === null) { throw new Error('Review not found in database'); }

    // console.log(listing);

    if (listing.listingType === 'Sell') {
        var newTransaction = {
            _id: new ObjectId(),
            listingId: listingId,
            listingName: listing.title,
            timestamp: timestamp('YYYY/MM/DD - HH:mm:ss'),
            price: listing.price,
            seller: listing.posterId,
            buyer: buyerOrSeller
        }
    } else {
        var newTransaction = {
            _id: new ObjectId(),
            listingId: listingId,
            listingName: listing.title,
            timestamp: timestamp('YYYY/MM/DD - HH:mm:ss'),
            price: listing.price,
            seller: buyerOrSeller,
            buyer: listing.posterId
        }
    }
    
    const insertInfo = await transactionCollection.insertOne(newTransaction);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error ('Could not add user');
    }

    await updateStatus(listingId, false);
  
    return {insertedTransaction: true};

}

export default {createTransaction}

