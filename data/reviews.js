/* Luke Bianchi */
import {users} from "./../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import * as userjs from './users.js';

export const create = async (
    userFrom,
    userAbout,
    reviewBody,
    rating
) => {
    if ((!userFrom) || (!userAbout) || (!reviewBody) || (!rating)) {
        throw new Error ('All fields need to have values');
    }
    if ((typeof userFrom !== "string") || (typeof userAbout !== "string") || (typeof reviewBody !== "string")) {
        throw new Error ('userFrom, userAbout, and reviewBody must be nonempty strings');
    }
    if ((!(userFrom.replace(/\s/g, '').length)) || (!(userAbout.replace(/\s/g, '').length)) || (!(reviewBody.replace(/\s/g, '').length))) {
        throw new Error ('userFrom, userAbout, and reviewBody must be nonempty strings');
    }
    if (!ObjectId.isValid(userFrom)) throw 'invalid object ID on userFrom';
    if (!ObjectId.isValid(userAbout)) throw 'invalid object ID on userAbout';
    if (isNaN(rating)) {
        throw new Error('Rating is NaN');
    }
    if (rating < 1 || rating > 5 || rating % 1 !== 0) {
        throw new Error('Invalid rating');
    }
    userFrom = userFrom.trim();
    userAbout = userAbout.trim();
    reviewBody = reviewBody.trim();

    const newReview = {
        _id: new ObjectId(),
        userFrom: userFrom,
        userAbout: userAbout,
        reviewBody: reviewBody,
        rating: rating
    }
    const userCollection = await users();
    await userCollection.updateOne({_id: new ObjectId(userAbout)}, {$push: {reviews:newReview}});

    return await get(newReview._id.toString());
}

const arrayEquals = (a, b) => {
    return a.every((val, index) => val === b[index])
}
  
export const get = async (reviewId) => {
    if (!reviewId) {
      throw new Error ('please include reviewId');
    }
    if ((typeof reviewId !== "string") || (!(reviewId.replace(/\s/g, '').length))) {
      throw new Error ('reviewId must be a nonempty string');
    }
    if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';
    reviewId = reviewId.trim();
  
    const allReviews = await userjs.getAllUsers();
    let theReview = null;
  
    allReviews.forEach((user) => {
        user.reviews.forEach((review) => {
            if(arrayEquals([...review._id.toString()], [...reviewId])) {
                theReview = review
            }
        })
    })
  
    if (theReview !== null) {
        return theReview;
    } else {
        throw new Error('Review not found.')
    }
  
};

export default {create, get}