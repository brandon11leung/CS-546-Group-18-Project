import * as helpers from '../helpers.js';
import * as users from './users.js';
import {listings} from '../config/mongoCollections.js';
import * as listingFuncs from './listings.js';
import {ObjectId} from 'mongodb'


export const createComment = async (listingId, posterId, content) => {
    if (!(listingId) || !(posterId) || !(content)) { throw new Error ('Insufficient parameters supplied.'); }

    listingId = helpers.isValidID(listingId, 'listing ID');
    posterId = helpers.isValidID(posterId, 'poster ID');
    content = helpers.isValidString(content, 'content');

    const listingCollection = await listings();
    
    let newComment = {
        listingId: listingId, 
        posterId: posterId,
        content: content
    };

    
	const updatedInfo = await listingCollection.findOneAndUpdate(
		{_id: new ObjectId(listingId)},
		{$push: {comments: newComment} 
    });

    if (updatedInfo.lastErrorObject.n === 0) { throw new Error("Error: unable to update the listing info with the comment.") }

    updatedInfo.value._id = updatedInfo.value._id.toString();
    return updatedInfo.value;

}