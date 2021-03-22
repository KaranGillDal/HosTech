const mongoose = require ('mongoose');

const PostScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    post: String,
    header: String,
    imageurl:[String],
    userimage: String,
    type:String,
    like: Number,
    verified: Boolean,
    verifiedusers: [String],
    likelist: [String],
    Added: [{Type: String, Url: String}],
    Comments: [{ type: mongoose.Schema.Types.ObjectId, ref :'Comments'}],
    AverageRating: Number,
    TotalRating: Number,
    Rating: [{userid: String, rating: Number}],
    authorization: String,
    userid: String,
    userimg:String,
    award:[String],
    tags:[String],
    anonymous: Boolean
});


PostScheme.index({post:'text', header:'text'})
var di = mongoose.model('Post', PostScheme);
di.syncIndexes();
module.exports = di

