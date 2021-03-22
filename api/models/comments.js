const mongoose = require ('mongoose');

const CommentsScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref :'Comments'}],
    comment: String,
    rating: Number,
    like:[String],
    postid: { type: mongoose.Schema.Types.ObjectId, ref :'Post'},
    repliedtoid: String,
    date: Date,
    deleted: Boolean
});

module.exports = mongoose.model('Comments', CommentsScheme);
