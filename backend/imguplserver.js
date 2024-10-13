// This is to help us import express which is a necessity when using nodejs to build apps
const express = require('express')
// This to help us import cors which helps prevent errors if our frontend and backend are running on two different ports
const cors = require('cors')
const app = express()

// This is the address which are app will perform from
const PORT = 7777;

// This is to connect our server to our mongo databsse
const mongoose = require('mongoose');

// The url is made up of your mongodb address 
const url = 'mongodb://127.0.0.1:27017/Img_upl'

const img_router = require('./imguplroute');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);
mongoose.connect(url);
db = mongoose.connection

db.on('error', (err)=>{
    console.log('error occurred');
    console.error(err);
})

db.once('open', ()=>{
    console.log('Connected to mongo sever successfull');

})

app.use(cors())
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use('/', img_router);
app.use('/files', express.static('uploads')); //this makes it possible that we can see the image in the browser when we add files to the path and the images ID
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.get('/', (req,res) =>{
    res.write('API Design \n')
    res.write('api : use method request of GET on this route to access all our student \n')
    res.write(' api/:id : to get a student by id \n')
    res.send()
})

app.listen(PORT , () =>{
    console.log(`Listening on PORT ${PORT}`)
})