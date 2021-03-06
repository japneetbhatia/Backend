const express = require('express');
// const { mongo } = require('mongoose');

const app = express();
// const router=express.Router();
app.listen('7999', function () {
    console.log('server listening on port 7999');
});

app.use(express.json());
//middleware fn
// app.use((req, res, next) => {
//     //do some work
//     console.log('i am a middleware');
//     next(); // mera kaam ho gya proceed further if nhi lgaya toh reload hota rhega
// });

app.use(express.static('public')); //-> sirf public files dekhe not full code
const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);
//mounting in express

userRouter
    .route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

// app.use((req, res, next) => {
//     //do some work
//     console.log('i am a middleware 2nd time');
//     next();
// });

userRouter
    .route('/:id')
    .get(getUserById);

authRouter
    .route('/signup')
    .post(signupUser);

//Forget Password
authRouter
    .route('/forgetPassword')
    .get(getForgetPassword)
    .post(postForgetPassword, validateEmail);

function getForgetPassword(req, res) {
    res.sendFile('./public/forgetPassword.html', { root: __dirname });
}

function postForgetPassword(req, res, next) {
    let data = req.body;
    console.log('data', data);
    //check if email id is correct- validate
    next();
    // check if user exists in db
    // res.json({
    //     message:"data received",
    //     data:data.email
    // })
};

function validateEmail(req, res) {
    console.log('in validateEmail function');
    console.log(req.body);
    //hw to check if email is correct or not -> @ , .
    //indexOf
    res.json({
        message: "data received",
        data: req.body
    });
}


// https://classroom.pepcoding.com/index
// //redirects
// app.get('/user-all',(req,res)=>{
//     res.redirect('/user');
// });

// //404 page
// app.use((req,res)=>{
//     res.sendFile('public/404.html',{root:__dirname})
// });

function setCreatedAt(req, res, next) {
    let obj=req.body;
    //keys ka arr -> uska length
    let length=Object.keys(obj).length;
    if(length==0){
        return res.status(400).json({message:"cannot create user if req.body is empty"})
    }
    req.body.createdAt=new Date().toISOString();
    next();
}


// signup page
const userModel = require('./models/userModel')
async function signupUser(req, res) {
    // let userDetails=req.body;
    // let name=userDetails.name;
    // let email=userDetails.email;
    // let password=userDetails.password;

    // let{email,name,password}=req.body;
    // user.push({email,name,password}); 
    // Now we learn to add data in mongoDb
    try {
        let userObj = req.body;
        let user = await userModal.create(userObj);
        // console.log('user',req.body);
        console.log('user', user);
        res.json({
            message: 'user signedUp',
            user: userObj
        });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message })
    }
}


let user = [];
// client <- server
//crud- create read update delete
//read
// app.get('/',(req,res)=>{
//     res.send('Home Page');
// });

// app.get('/user',getUser);

function getUser(req, res) {
    console.log('getUser called');
    res.json(user);
}

//post request
// client-> server 
//create
// app.post('/user',createUser);
function createUser(req, res) {
    user = req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}
//update
// app.patch('/user',updateUser);
function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.json(user);
};
//delete 
// app.delete('/user',deleteUser);
function deleteUser(req, res) {
    user = {};
    res.json(user);
    // res.send('ussr has been deleted');
}
//param route
// app.get('/user/:id',getUserById);
function getUserById(req, res) {
    console.log(req.params);
    res.json(req.params.id);
}