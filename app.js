const express = require('express');  // require express

/* server creation */
const app = express(); // express fn
let port = '8081';

app.listen(port, function() {
    console.log(`Server is listening on port ${port} `);
});

/* types of ports */
// if no response(empty fn) then keeps loading
app.get('/', (req,res) => {  // -> 1.'/' is localhost/ you can also write '/home' is localhost/home 2.(req, res) are callback 3./,/home is route
    // console.log(req); // -> prints the req (many methods are there)
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log('hello from home page');
    res.send('<h1>hello from backend</h1>') //-> send request
    // res.end(); // -> end the request
});

let obj = {
    'name': 'Japneet'
}
app.get('/user', (req, res) => {
    // res.send(obj);
    console.log('users');
    res.json(obj);
});

// showing html page
app.get('/home', (req, res) => {
    console.log(__dirname); //-> get full path of directory
    res.sendFile('./views/index.html', {root:__dirname}); 
});