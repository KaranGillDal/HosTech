const mongoose = require ('mongoose');
const { text } = require('body-parser');
const AddingScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    time: Date,
    fulltime: Date,
    bloodsugar: Number,
    bloodsugarunit: String,
    bpsystolic: String,
    bpdiastolic: String,
    weight: Number,
    weightunits: String,
    medicine:[],
    exercise: [],
    mood:[],
    carbsintake:[],
    note: String,
    noteimages: [String],
    userid: String,
    mycarblist:[],
    bloodsugarcondition: String,
    bloodpressuresystoliccondition: String,
    bloodpressurediastoliccondition: String
}, { autoIndex: false });
AddingScheme.index({note:'text'})
var di = mongoose.model('AddingBook', AddingScheme);
di.syncIndexes();
module.exports = di