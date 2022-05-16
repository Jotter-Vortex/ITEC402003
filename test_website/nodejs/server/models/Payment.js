// product 모델을 만든거임
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({

    // 필드는 세 가지 있었음.user, data, payment
    user: {
        type : Array,
        default : []
    },
    data: {
        type : Array,
        default: []
    },
    product: {
        type : Array,
        default: []
    }
}, { timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }