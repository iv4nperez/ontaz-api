
const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
    title: String,
    urlImg: String,
    color: String
});

CategorySchema.methods.toJSON = function(){
    const { __v, _id , ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model( 'Category', CategorySchema );
