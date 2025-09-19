const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sku: {type: String, required: true},
    status: {type: String, required: true, enum:['available', 'unavailable', 'discontinued', 'out of order']},
    images: [String],
    color: [String],
    description: [String],
    card_description: {type: String},
    category: {type: String},
    subcategory: {type: String}
})

module.exports = mongoose.model('Product',productSchema);