const mongoose = require ('mongoose');

const FollowMeScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_mainuser: String,
    follower_userprofid: [{type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'}],
    userid_follower: [String]
});

module.exports = mongoose.model('FollowMe', FollowMeScheme);