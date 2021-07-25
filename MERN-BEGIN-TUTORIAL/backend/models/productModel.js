const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true},
    rating: {type: Number, required: true , default: 0},
    brand: {type: String, required: true},
    numReviews: {type: Number, required: true},
    description: {type: String, required: true}
}, {
    timestamps: true
})
module.exports = {
    Product: mongoose.model('Product', productSchema)
}