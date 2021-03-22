const mongoose = require ('mongoose');

const UserProfileScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    email: String,
    phone: String,
    name: String,
    location: String,
    profession:[String],
    registeredas: [String],
    diseases:[String],
    timesuffering: String,
    age: String,
    gender: String,
    timediabetes: String,
    degree: String,
    timeeducator: String,
    verification: String,
    verified: Boolean,
    followreq: [String],
    bio: String,
    thoughtlike: [String],
    skills: [String],
    interests: [String],
    movieslike: [String],
    songlike: [String],
    netflixlike: [String],
    homwtown: String,
    province: String,
    country: String,
    profileimage: String,
    reasontojoin: String,
    deviceid: String,
    donationsaved: [{ type: mongoose.Schema.Types.ObjectId, ref :'DonationItem'}]
});

module.exports = mongoose.model('Userprofile', UserProfileScheme);