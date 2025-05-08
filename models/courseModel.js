const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    price: { type: Number, required: true }
}, {
    timestamps: true 
});

const courseModel = mongoose.model('courseModel', schema);
module.exports = courseModel;