const mongoose = require ('mongoose');
const DonationItemScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    images: [String],
    name: String,
    description: String,
    location: String,
    medicationtype: String,
    savedby: [String],
    owner: String,
    contactdetails: String
});

DonationItemScheme.index({name:'text'})
var di = mongoose.model('DonationItem', DonationItemScheme);
di.syncIndexes();
module.exports = di