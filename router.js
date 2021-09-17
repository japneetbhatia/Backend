const express=require('express');
const app=express();
app.listen('6001',function(){
    console.log('server listening on port 6001');
});

app.use(express.json());

app.use(express.static('public'));
const userRouter=express.Router();  //-> router creation

app.use('/user',userRouter); //-> bu default / user laga hoga

userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

//comment only to run 404 page
// userRouter
// .route('/:id')
// .get(getUserById);

//404 Page
//this app.use is middleware fn it always run
// jab kuch na chale tabhi we want this to run so add this at last
app.use((req, res) => {
    res.sendFile('public/404.html', {root:__dirname})
});

let user=[];
// client <- server
//crud- create read update delete
//read
// app.get('/',(req,res)=>{
//     res.send('Home Page');
// });
// app.get('/user',getUser);

function getUser(req,res){
    console.log('getUser called');
    res.json(user);
}

//post request
// client-> server 
//create
// app.post('/user',createUser);
function createUser(req,res){
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}

//update
// app.patch('/user',updateUser);
function updateUser (req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
};

//delete 
// app.delete('/user',deleteUser);
function deleteUser(req,res){
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
}

//param route
// app.get('/user/:id',getUserById);
function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}

