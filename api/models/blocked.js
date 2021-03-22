const mongoose = require ('mongoose');

const BlockedScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    userid_mainuser: String,
    blocked_userprofid: [{type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'}],
    userid_blocked: [String]
});

module.exports = mongoose.model('BlockedUser', BlockedScheme);