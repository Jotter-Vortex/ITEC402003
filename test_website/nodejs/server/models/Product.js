// product 모델을 만든거임
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        maxlength:50
    },
    description :{
        type: String,
    },
    price:{

        type: Number,
        default: 0
    },
    images:{
        type: Array,
        default: []
    },
    sold: {
        type:Number,
        maxlength: 100,
        default: 0
    },
    views:{ // 사람들이 얼마나 봤는지에 대한 정보
        type: Number,
        default:0
    }

}, {timestamps : true}) // 자동적으로 등록시간이나 업데이트시간이 등록이 됨.


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }