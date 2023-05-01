/* Luke Bianchi */
import {reviews} from "./../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import * as userjs from './users.js';

export const create = async (
    userFrom,
    userAbout,
    reviewBody,
    rating
) => {
    const reviewCollection = await reviews();
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
    
    const insertInfo = await reviewCollection.insertOne(newReview);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error ('Could not add user');
    }
  
    return {insertedUser: true};
}

const arrayEquals = (a, b) => {
    return a.every((val, index) => val === b[index])
}
  
const get = async (reviewId) => {
    if (!reviewId) {
      throw new Error ('please include reviewId');
    }
    if ((typeof reviewId !== "string") || (!(reviewId.replace(/\s/g, '').length))) {
      throw new Error ('reviewId must be a nonempty string');
    }
    if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';
    reviewId = reviewId.trim();
  

    const reviewData = await reviews();
    let review = await reviewData.findOne({_id: new ObjectId(id)});
  
    if (review === null) { throw new Error('Review not found in database'); }
    review._id = review._id.toString();
  
    return review;
  
};

const getAllReviews = async () => {

    const reviewData = await reviews();
  
    let reviewList = await reviewData.find({}).toArray();
  
    if (!reviewList) { throw new Error ('Unable to find all users'); }
  
    reviewList = reviewList.map((item) =>  { 
    item._id = item._id.toString(); 
    return item; });
    return userList;
  };

export default {create, get, getAllReviews}