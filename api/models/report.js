const mongoose = require ('mongoose');

const ReportScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    report: [String]
});

module.exports = mongoose.model('Report', ReportScheme);