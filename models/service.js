

const { Schema, model } = require('mongoose');

const ServiceSchema =  Schema({
    title: String,
    description: String,
    starts: Number,
    urlImg: String,
    phone: String,
    whatsapp: String,
    location: String
});

// ServiceSchema.methods.toJSON = function(){
//     const { __v, ...service} = this.toObject();
//     service.uid = _id;
//     return service;
// }

module.exports = model( 'Service', ServiceSchema );
