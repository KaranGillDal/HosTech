const mongoose = require ('mongoose');

const DiscussionPostScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    body: String,
    title: String,
    images:[String],
    verified: Boolean,
    verifiedusers: [String],
    Comments: [{ type: mongoose.Schema.Types.ObjectId, ref :'DiscussionPostComments'}],
    upvotes: [String],
    downvotes: [String],
    rating:Number,
    userid: String,
    tags:[String],
    type:[String]
});
DiscussionPostScheme.index({title:'text', body:'text'})

module.exports = mongoose.model('DiscussionPost', DiscussionPostScheme);
