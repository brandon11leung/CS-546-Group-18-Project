import {listingsMongo} from '../config/mongoCollections.js';
import * as listings from '../data/listings.js';
import * as helpers from '../helpers.js';



export const searchBy = async (searchQuery) => {
    searchQuery = helpers.isValidString(searchQuery, "Search Query").toLowerCase();
    const listingCollection = await listings();
    const listings = await listingCollection.findOne({_id: new ObjectId(id)});
    const allListings = await listings.getAll();
    let matchedListings = [];
    for (let i = 0; i < allListings.length; i++) {
        let currListingTitle = allListings[i].title.toLowerCase();
        if (currListingTitle.indexOf(searchQuery) > -1 || currListingTitle.includes(searchQuery)) {
            // matchedListings.push(allListings[i]._id);
            matchedListings.push(allListings[i]);
        }
    }
    return matchedListings;
}