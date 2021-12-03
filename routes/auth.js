const router = require('express').Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const tokenAuth = require("../middleware/tokenAuth")

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    };
});



router.post('/login', async(req,res) => {
    
        
    try{

    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).send("Username or password is incorrect");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Username or password is incorrect")

    const token = jwt.sign({
        email:user.email,
        id:user._id
      },
      process.env.JWT_SECRET
      ,{
        expiresIn:"2h"
      })    
     

     res.status(200).json({token:token,
        user:user});
    } catch(err) {
      res.status(500).json(err);
    }
})


//router.get("/profile",tokenAuth, (req,res)=>{
//    User.findByPk(req.user._id).then(foundUser=>{
//      res.json(foundUser)
//    })
//  })



module.exports = router;