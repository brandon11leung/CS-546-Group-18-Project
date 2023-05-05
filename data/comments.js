import * as helpers from '../helpers.js';
import {listings, users} from '../config/mongoCollections.js';
import * as listingFuncs from './listings.js';
import {ObjectId} from 'mongodb'


export const createComment = async (listingId, posterId, content) => {
    if (!(listingId) || !(posterId) || !(content)) { throw new Error ('Insufficient parameters supplied.'); }

    listingId = helpers.isValidID(listingId, 'listing ID');
    posterId = helpers.isValidID(posterId, 'poster ID');
    content = helpers.isValidString(content, 'content');

    const listingCollection = await listings();
    const userCollection = await users();

    const userData = await userCollection.findOne({_id: new ObjectId(posterId)});
    
    if (userData === null) { throw new Error ('User not found in database.'); }
    
    let newComment = {
        _id: new ObjectId(),
        listingId: listingId, 
        username: userData.username,
        posterId: posterId,
        content: content
    };

    
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(listingId)},
		{$push: {comments: newComment} 
    });

    if (updatedInfo.lastErrorObject.n === 0) { throw new Error("Error: unable to add the comment to the listing info.") }

    return newComment;
}

export const removeComment = async (listingId, commentId) => {
    if (!(listingId) || !(commentId)) { throw new Error ('Insufficient parameters supplied.'); }

    listingId = helpers.isValidID(listingId, 'listing ID');
    commentId = helpers.isValidID(commentId, 'comment ID');

    const listingCollection = await listings();

    const updatedInfo = await listingCollection.findOneAndUpdate(
        {_id: new ObjectId(listingId)},
        {$pull: {comments: {_id: new ObjectId(commentId)}}}
    )

    if (updatedInfo.lastErrorObject.n === 0) { throw new Error("Error: unable to remove the comment from the listing info.") }

    updatedInfo.value._id = updatedInfo.value._id.toString();
    return 'The comment has officially been removed';
}
