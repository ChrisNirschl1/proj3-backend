const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//UDPATE

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Your account has been successfully updated.");
        }catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Only your account can be updated.");
    }
});

//DELETE

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been successfully deleted.");
        }catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Only your account can be deleted.");
    }
});

//GET 

router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err)
    }
});

//FOLLOW

router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId} });
                await currentUser.updateOne({ $push: { followings: req.params.id} });
                res.status(200).json("You are now following this user.");
            } else {
                res.status(403).json("You are already following this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot follow yourself.");
    }
});

//UNFOLLOW

router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId} });
                await currentUser.updateOne({ $pull: { followings: req.params.id} });
                res.status(200).json("You are no longer following this user.");
            } else {
                res.status(403).json("You do not follow this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot unfollow yourself.");
    }
});
module.exports = router