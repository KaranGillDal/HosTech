const mongoose = require ('mongoose');

const UserFollowerScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid_Ifollow: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_Ifollowid: String,
    userid_followme: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_followmeid: String
});

module.exports = mongoose.model('Userfollowers', UserFollowerScheme);