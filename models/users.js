
const { Schema, model } = require('mongoose');

const UsersSchema =  Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    status: {
        type: Boolean,
        default: true
    }
});

UsersSchema.methods.toJSON = function(){
    const { __v, _id, status, password, ...users } = this.toObject();
    users.uid = _id;
    return users;
}

module.exports = model( 'Users', UsersSchema );
