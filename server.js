// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors= require('cors');
const bodyParser=require('body-parser');
const app = express();
// Start up an instance of app
// Cors for cross origin allowance
app.use(cors());
app.use(express.static('website'));
// server port is 8000
app.listen(8000,()=>{console.log('it is ok Bro')});


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/// save data POSt route
app.post('/adddata',(req,res)=>{

    projectData = req.body
    res.json({msg:'done'});
    console.log('the frontend sent the data and data has been saved is :'+JSON.stringify(projectData) );

})
///  send saved data GET route
app.get('/all',(req,res)=>{

    res.json(projectData);
    console.log('server send the  responsed data to frontend correctly');
})

// Setup Server
