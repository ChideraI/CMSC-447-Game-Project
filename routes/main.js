const express = require('express');
const asyncMiddleware = require('./asyncMiddleware');

const router = express.Router();
const db_utils = require('../javascript/db')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const db_filename = './user.db';
var db = null

db_utils.connect()
console.log("Populated...")


//Running into problems using ODM thing for SQLITE, lemme come back to this


// Serve the Phaser game on the root URL
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//this is a testendpoint that serves the status of the router
router.get('/status', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
  
});


//this endpoint is for new users
router.post('/signup', asyncMiddleware( async (req, res, next) =>{

    const {username , password} = req.body;
    console.log(req.body)

    console.log(username + " : " + password)
    if(db_utils.insert_user(username, password) == 0){
        res.status(401).json({'message':'user already exists'})
    }else{
        res.status(200).json({ 'status': 'ok' });
    }
    
}));



//ENDPOINT - Logging in
router.post('/login', asyncMiddleware( async (req, res, next) =>{
    const {username, password} = req.body;
    //now that we have recieved the 
    if(db_utils.check_password(username, password)){
        console.log("Failed Login for " + username)
        res.status(401).json({'message':'unauthenticated'})
    }else{
        console.log("Successfully Logged in as " + username)
        res.status(200).json({ 'status': 'ok' });
    }
    

}));

//ENDPOINT - Managing Tokens
router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });


module.exports = router;