const mongoose = require('mongoose');

//mongoDB connection
// get link from mongoDb and replace <password> with your password
const {db_link} = require('../secret'); 
var validator = require("email-validator");

mongoose.connect(db_link).then(function(db) {
    // console.log(db);
    console.log('db connected');
})
.catch(function(err) {
    console.log(err);
})

// schema creation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function() {
            return validator.validate(this.email);
        }
    },
    // createdAt : Date, //-> shorthand 
    createdAt: {
        type: Date
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 8,
        validate: function() {
            return this.password == this.confirmPassword;
        }
    },
});

// js pre hook
// an confirm pswd chala jyega mongodb se as it cant be diff from pswd 
userSchema.pre('save', function(){
    this.confirmPassword = undefined;
});

//modal creation
const userModel = mongoose.model('userModal', userSchema);

module.exports = userModel;

// (async function createUser() {
//     let user = {
//         name: 'Japneet',
//         age: 20,
//         email: 'qaz@gmail.com',
//         password: '12345678',
//         confirmPassword: '12345678'
//     };

//     // create collection
//     console.log(userObj);
// })(); // -> made immediate invoke function