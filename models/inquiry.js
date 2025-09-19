const mongoose = require('mongoose')

const inquirySchema = mongoose.Schema({
    name: {type: String, required: true},
    company: {type: String},
    email: {type: String, required: true},
    contact: {type: Number, required: true},
    inquiry: {type: String, required: true}

})

module.exports = mongoose.model('Inquiry',inquirySchema);