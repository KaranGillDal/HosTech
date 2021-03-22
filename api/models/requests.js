const mongoose = require ('mongoose');

const FollowRequestsScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_mainuser: String,
    req_userprofid: [{type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'}],
    userid_req: [String]
});

module.exports = mongoose.model('FollowRequests', FollowRequestsScheme);