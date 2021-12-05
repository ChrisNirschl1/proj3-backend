const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Post } = require("../testmodels");

//POST Register user with password bcryption
//POST http://localhost:3001/signup - user.id is assigned at this point
// {
//  "email": "user.email",
//  "password": "user.password",
//  }

router.post("/signup", (req, res) => {
  console.log(req.body)
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(newUser => {
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });

//POST Login existing user & grant persistent token authorization
//POST http://localhost:3001/login - token is assigned upon successful login
// {
//  "email": "user.email",
//  "password": "user.password",
//  }

router.post("/login", (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(foundUser => {
          if(!foundUser){
              res.status(401).send("email or password is incorrect.")
          }
          else if(bcrypt.compareSync(req.body.password,foundUser.password)){
              const token = jwt.sign({
                email:foundUser.email,
                id:foundUser.id
              },
              process.env.JWT_SECRET
              ,{
                expiresIn:"2h"
              })    
              res.json({
                token:token,
                user:foundUser
              });
          }
          else {
              res.status(401).send("email or password is incorrect")
          }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });
  
  //GET User BY JWT authorization
  //GET http://localhost:3001/profile + jasonwebtoken

  router.get("/profile",tokenAuth, (req,res)=>{
    User.findByPk(req.user.id).then(foundUser=>{
      res.json(foundUser)
    })
  })
  
  //GET User by ID, including any posts they have made
  //GET http://localhost:3001/api/users/:id/posts - replace :id with userId number

  router.get("/api/users/:id/posts",(req,res)=>{
    User.findByPk(req.params.id,{include:[Post]}).then(foundUser=>{
      res.json(foundUser)
    })
  })
  
  
  module.exports = router;