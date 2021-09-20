const mongoose = require('mongoose');

//mongoDB connection
// get link from mongoDb and replace <password> with your password
let db_link = "mongodb+srv://japneetkaur-1111:u7xXGo20gvE9fBfo@cluster0.a7lst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db_link).then(function() {
    console.log('db connected');
})
.catch(function(err) {
    console.log(err);
})