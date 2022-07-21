
const { Schema, model } = require('mongoose');

const ProductSchema =  Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    urlImg: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    status: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function(){
    const { __v, _id , ...product } = this.toObject();
    product.uid = _id;
    return product;
}

module.exports = model( 'Product', ProductSchema );
