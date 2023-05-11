const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/main')
const secure_routes = require('./routes/secure')
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

//normal routes
app.use("/", routes);

//SECURE ROUTES - BE CAREFUL
app.use('/', secure_routes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


