const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    class: String,
    marks: Number
});

module.exports = mongoose.model('Student', studentSchema);