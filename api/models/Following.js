const mongoose = require ('mongoose');

const FollowingScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    post: [{ type: mongoose.Schema.Types.ObjectId, ref :'Post'}]
});

module.exports = mongoose.model('Followingpost', FollowingScheme);
