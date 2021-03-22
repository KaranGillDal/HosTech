const mongoose = require ('mongoose');

const DiscussionPostCommentsScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    date: Date,
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref :'DiscussionPostComments'}],
    comment: String,
    upvotes: [String],
    downvotes: [String],
    images:[String],
    postid: { type: mongoose.Schema.Types.ObjectId, ref :'DiscussionPost'}
});

module.exports = mongoose.model('DiscussionPostComments', DiscussionPostCommentsScheme);
