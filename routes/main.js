const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const router = express.Router();


const knex = require('knex')
const bookshelf = require('bookshelf')(knex)


db = bookshelf(knex({
    client: 'sqlite3'
    , connection: { filename: dbFile }
}))


// Serve the Phaser game on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

//this is a testendpoint that serves the status of the router
router.get('/status', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});



//this endpoint is for new users
router.post('/signup', asyncMiddleware( async (req, res, next) =>{

    const {name , email, password} = req.body;


    res.status(200);
    res.json({ 'status': 'ok' });
    
}));




//ENDPOINT - Logging in
router.post('/login', asyncMiddleware( async (req, res, next) =>{
    const {email, password} = req.body;
    //now that we have recieved the 

    console.log("Attempted Login for " + name)

    
    res.status(200).json({ 'status': 'ok' });
}));

//ENDPOINT - Managing Tokens
router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });


module.exports = router;