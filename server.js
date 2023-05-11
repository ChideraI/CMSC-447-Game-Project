const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/main')
const secure_routes = require('./routes/secure')
const db_utils = require('./javascript/db')

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname)));


let db = db_utils.connect();

//normal routes
app.use("/", routes);


//SECURE ROUTES - BE CAREFUL
app.use('/', secureRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



