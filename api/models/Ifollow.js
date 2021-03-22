const mongoose = require ('mongoose');

const IFollowScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_mainuser: String,
    following_userprofid: [{type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'}],
    userid_following: [String]
});

module.exports = mongoose.model('IFollow', IFollowScheme);