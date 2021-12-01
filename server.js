const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
 }).then(() => console.log("MongoDB is connected!"))
 .catch(err => console.error(err));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8080, () => {
    console.log("Now connected to the Backend server!");
})








//app.get("/", (req,res)=> {
//    res.send("Welcome to the Zucc's Home page!")
//})
//
//app.get("/users", (req,res)=> {
//    res.send("Welcome to the Zucc's User page!")
//})





//const path = require('path');
//const express = require('express');
//const session = require('express-session');
//require('dotenv').config();
//
//const routes = require('./controllers');
//const sequelize = require('./config/connection');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);
//
//const app = express();
//const PORT = process.env.PORT || 3001;
//
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
//
//
//const sesh = {
//    secret: process.env.SECRET,
//    cookie: {},
//    resave: false,
//    saveUninitialized: true,
//    store: new SequelizeStore({
//      db: sequelize
//    })
//  };
//  
//  app.use(session(sesh));
//
//sequelize.sync({ force: false }).then(() => {
//    app.listen(PORT, () => console.log('Tuned into Port '+PORT));
//  });
//  