const mongoose = require('mongoose');

const trendingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: [{ type: mongoose.Schema.Types.ObjectId, ref :'Post'}]
});

module.exports = mongoose.model('Trending', trendingSchema);