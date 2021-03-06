const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const cors = require("cors");

// Sets up the Express App
// =============================================================
const app = express();
//LOCAL
//app.use(cors())
//DEPLOYED
 app.use(cors({
     origin:["https://soundbyte100.herokuapp.com"]
    //do not add trailing slash
}));
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const {User} = require('./testmodels');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});


// Add to package.json script if missing -  "seed": "node testseeds/seed.js"



