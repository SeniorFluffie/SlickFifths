// PRODUCT SCHEMA
var mongoose = require('mongoose');

var productSchema  = mongoose.Schema({
    imagePath: {
        type: String
    },
    title: {
        type: String
    },
    artist: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Product', productSchema);
