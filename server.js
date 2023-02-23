const express = require('express')
const CORS = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
app.use(CORS())
const URI = 'mongodb://localhost:27017';
mongoose.connect(URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
},err => {
    if(err) throw err;
    console.log('Connected to MONGODB')
})
app.use('/api',require('./Routes/AuthRoute'))
const PORT = 5000;
app.listen(PORT,() => {
    console.log('Server is listening at port : ',PORT)
})