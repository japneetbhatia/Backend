// server creation
const express = require('express');
const app = express();

app.listen('5000', function() {
    console.log('server listening on port 5000');
});

app.use(express.json()); //-> middleware function, jo bhi data get post etc hota h vo json form mei accept hota hai

let user = {};

//crud : create read update delete

//get request
// client <- server
//read
app.get('/', (req, res)=> {
    res.send('Home Page');
});

app.get('/user', (req, res) => {
    res.json(user);
});

//post request
// client -> server
//create
app.post('/user', (req, res) => {
    user = req.body;  //-> jo data post karna hota hai vo req mei atta h
    // console.log(req.body);
    res.send('data has been added suceesfully');
});

//update 
app.patch('/user', (req,res)=> {
    let obj = req.body;
    for(let key in obj) {
        user[key] = obj[key];
    }
    res.json(user);
});

//delete
app.delete('/user', (req,res)=> {
    user = {};
    res.json(user);
});


//parameter route
app.get('/user/:id',(req, res)=> {
    console.log(req.params);
    // res.send(req.params.id);
    res.json(req.params.id);
});