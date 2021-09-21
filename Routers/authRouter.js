const express = require('express');
const authRouter = express.Router();

app.use('/auth', authRouter);

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