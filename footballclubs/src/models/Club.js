const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    fullName: String,
    country: String,
    founded: String,
    site: String,
    stadium: {
        type: mongoose.Types.ObjectId,
        ref: 'stadium'
    }
});

module.exports = mongoose.model('Club', ClubSchema);