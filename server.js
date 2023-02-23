const express = require('express')
const CORS = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User');
const app = express();
app.use(express.json())
app.use(CORS())
const URI = 'mongodb://localhost:27017';
const apiKey = 
mongoose.connect(URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
},err => {
    if(err) throw err;
    console.log('Connected to MONGODB')
})
app.post('/register',async(req,res)=>{
    const {Fullname,Username,Email,Password} = req.body;
    const UserIsPresent = User.findOne({Username: Username});
    if(UserIsPresent)
    {
        res.status(400).json({'message' : 'User already present'})
    }
    const newUser = new User({Fullname : Fullname,Username : Username,Email : Email,Password : Password});
    UserSave = await newUser.save();
    if(UserSave)
    {
        res.status(200).json({'message' : 'User Saved'})
    }
})
app.post('/login',async(req,res){
    const {Email,Password} = req.body;
    const UserIsPresent = User.findOne({Email : Email});
    if(!UserIsPresent)
    {
        res.status(400).json({'message' : 'Doesnt exist'})
    }
    res.status(200).json({'message' : 'login Successful'})
})
app.get('/leaderboard',async(req,res)=>{

})
app.use('/api',require('./Routes/AuthRoute'))
const PORT = 5000;
app.listen(PORT,() => {
    console.log('Server is listening at port : ',PORT)
})