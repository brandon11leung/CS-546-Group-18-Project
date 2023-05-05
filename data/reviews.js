/* Luke Bianchi */
import {reviews} from "./../config/mongoCollections.js";
import {ObjectId} from 'mongodb';

export const createReview = async (
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

    if (reviewBody.length < 10 || reviewBody.length > 1500) {
      throw new Error ('Error: Character limit too short or too long')
    }
    reviewBody = reviewBody.trim();

    //Check if user already reviewed person
    const val = await checkIfAlrReviewed(userFrom, userAbout);
    if (val === true) {
      throw new Error('User already has reviewed this person');
    }

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
  
const getReview = async (reviewId) => {
    if (!reviewId) {
      throw new Error ('please include reviewId');
    }
    if ((typeof reviewId !== "string") || (!(reviewId.replace(/\s/g, '').length))) {
      throw new Error ('reviewId must be a nonempty string');
    }
    if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';
    reviewId = reviewId.trim();
  

    const reviewData = await reviews();
    let review = await reviewData.findOne({_id: new ObjectId(reviewId)});
  
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

const removeReview = async (id) => {
    if (!id) {
      throw new Error ('needs an id parameter');
    }
    if (typeof id !== "string" || !(id.replace(/\s/g, '').length)) {
      throw new Error ('id must be a nonempty string');
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const reviewCollection = await reviews();
    const deletionInfo = await reviewCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });
  
    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete review with id of ${id}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  };

const checkIfAlrReviewed = async (from, about) => {
    if (!from || !about) {
      throw new Error ('needs from and about parameters');
    }
    if (typeof from !== "string" || !(from.replace(/\s/g, '').length)) {
      throw new Error ('about must be a nonempty string');
    }
    if (typeof about !== "string" || !(about.replace(/\s/g, '').length)) {
      throw new Error ('about must be a nonempty string');
    }
    from = from.trim();
    about = about.trim();
    if (!ObjectId.isValid(from)) throw 'invalid object ID';
    if (!ObjectId.isValid(about)) throw 'invalid object ID';
    const reviewCollection = await reviews();
    let reviewList = await reviewCollection.find({}).toArray();
    // console.log(reviewList);

    let found = false;
    reviewList.forEach(review => {
      if (from === review.userFrom && about === review.userAbout) {
        found = true;
      };
    })
    return found;
}


export default {createReview, getReview, getAllReviews, removeReview, checkIfAlrReviewed}