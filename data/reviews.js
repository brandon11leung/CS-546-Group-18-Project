/* Luke Bianchi */
import {reviews, users, transactions} from "./../config/mongoCollections.js";
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
  if (!ObjectId.isValid(userFrom)) throw new Error ('invalid object ID on userFrom');

  const userCollection = await users();
  const userFromFound = await userCollection.findOne({_id: new ObjectId(userFrom)});
  if (userFromFound === null) { throw new Error ('userFrom parameter was not found in database'); }

  if (!ObjectId.isValid(userAbout)) throw new Error ('invalid object ID on userAbout');

  const userAboutFound = await userCollection.findOne({_id: new ObjectId(userAbout)});
  if (userAboutFound === null) { throw new Error ('The person you are trying to review is not a registered user.'); }

  const transactionCollection = await transactions();
  const option1 = await transactionCollection.findOne({seller: new ObjectId(userFrom), buyer: new ObjectId(userAbout)});
  const option2 = await transactionCollection.findOne({seller: new ObjectId(userAbout), buyer: new ObjectId(userFrom)}); 

  /* Buyers can review sellers; likewise, sellers can review buyers.
     A reviewer can't review someone who didn't buy from them or 
     if they didn't buy a product from them
  */

  if (option1 === null && option2 === null) {
    throw new Error ('Not allowed to review this person. Buyers can review sellers, and sellers can review buyers.')
  }


  if (isNaN(rating)) {
      throw new Error('Rating is NaN');
  }
  if (rating < 1 || rating > 5 || rating % 1 !== 0) {
      throw new Error('Invalid rating');
  }
  userFrom = userFrom.trim();
  userAbout = userAbout.trim();

  reviewBody = reviewBody.trim();

  if (reviewBody.length < 10 || reviewBody.length > 5000) {
    throw new Error ('Review must be between 10 and 5000 characters.')
  }

  //Check if user already reviewed person
  const val = await checkIfAlrReviewed(userFrom, userAbout);
  if (val === true) {
    throw new Error('User already has reviewed this person');
  }

  let newReview = {
      _id: new ObjectId(),
      userFrom: userFrom,
      userAbout: userAbout,
      reviewBody: reviewBody,
      rating: rating
  }
  
  const insertInfo = await reviewCollection.insertOne(newReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error ('Could not add review');
  }
  
  const updatedInfo = await userCollection.findOneAndUpdate({_id: new ObjectId(userAbout)}, {$push: {reviewedBy: [new ObjectId(userFrom), userFromFound.username, newReview.reviewBody, rating]}});
  if (updatedInfo.lastErrorObject.n === 0) { throw new Error ('Could not add review to the user'); }

  const updatedUser = await userCollection.findOne({_id: new ObjectId(userAbout)});

  let len = updatedUser.reviewedBy.length;
  let newRating = Number(((updatedUser.overallRating * (len - 1) + newReview.rating) / len).toFixed(1))
  

  const updateRating = await userCollection.findOneAndUpdate({_id: new ObjectId(userAbout)}, {$set: {overallRating: newRating}});
  if (updateRating.lastErrorObject.n === 0) { throw new Error ('Could not update to the user'); }

  return {insertedReview: true};
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