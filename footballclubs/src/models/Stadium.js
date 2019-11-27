const mongoose = require('mongoose');

const StadiumSchema = new mongoose.Schema({
    name: String,
    built: String,
    capacity: Number
});

module.exports = mongoose.model('stadium', StadiumSchema, 'stadium');