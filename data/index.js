// This file should import both data files and export them as shown in the lecture code

import * as listingDataFunctions from "./listings.js"
import * as offerDataFunctions from "./offers.js"
import * as commentDataFunctions from "./comments.js"
import * as userDataFunctions from "./users.js"
import * as transactionDataFunctions from "./transactions.js"
import * as reviewsDataFunctions from "./reviews.js"

export const listingData = listingDataFunctions;
export const offerData = offerDataFunctions;
export const commentData = commentDataFunctions;

export const userData = userDataFunctions;
export const transactionData = transactionDataFunctions;

export const reviewsData = reviewsDataFunctions;
