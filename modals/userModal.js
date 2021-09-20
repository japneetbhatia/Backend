const mongoose = require('mongoose');

//mongoDB connection
// get link from mongoDb and replace <password> with your password

mongoose.connect(db_link).then(function() {
    console.log('db connected');
})
.catch(function(err) {
    console.log(err);
})
