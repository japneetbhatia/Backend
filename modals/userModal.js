const mongoose = require('mongoose');

//mongoDB connection
// get link from mongoDb and replace <password> with your password
let db_link = requie('../secret'); 
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

//modal creation
const userModal = mongoose.modelNames('userModal', userSchema);

(async function createUser() {
    let user = {
        name: 'Japneet',
        age: 20,
        email: 'qaz@gmail.com',
        password: '12345678',
        confirmPassword: '12345678'
    };

    // create collection
    let userObj = await userModal.create(user);
    console.log(userObj);
})(); // -> made immediate invoke function