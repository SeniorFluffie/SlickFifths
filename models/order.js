// ORDER SCHEMA
var mongoose = require('mongoose');

var orderSchema  = mongoose.Schema({
    orderID: {
        type    : String,
        index   : true
    },
    username: {
        type    : String
    },
    orderPrice: {
        type    : String
    },
    address: {
        type    : String
    },
    orderDate: {
        type    : Date
    },
    shipping: {
        type    : Boolean
    }
});

var Order = module.exports = mongoose.model('Order', orderSchema);
