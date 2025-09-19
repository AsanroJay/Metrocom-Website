const productSchema = require('../models/product') //for product schema
const mongoose = require('mongoose')

const quotaSchema = mongoose.Schema({
    products: [productSchema],
    name: {type: String, required: true},
    company: {type: String},
    email: {type: String, required: true},
    contact: {type: Number, required: true},

})

module.exports = mongoose.model('Quota',quotaSchema);