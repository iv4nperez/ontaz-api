

const { Schema, model } = require('mongoose');

const ServiceSchema =  Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: String,
    description: String,
    schedule: String,
    starts: Number,
    urlImg: String,
    phone: String,
    whatsapp: String,
    lat: Number,
    lng: Number,
    location: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

ServiceSchema.methods.toJSON = function(){
    const { __v, _id , ...service} = this.toObject();
    service.uid = _id;
    return service;
}

module.exports = model( 'Service', ServiceSchema );
