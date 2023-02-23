const mongoose = require('mongoose');
const Payment = new mongoose.Schema({
    UserID : {
        type : String,
        required : true,
    },
    Amount : {
        type : Number,
        required : true,
    }
})
module.exports = mongoose.model('Payment',PaymentSchema)