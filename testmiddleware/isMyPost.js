const {Post} = require("../models")

const isMyPost = (req,res,next)=>{
    Post.findByPk(req.params.id).then(foundPost=>{
        if(!foundPost){
            return res.status(404).json({msg:"We could not find your post..."})
        }
        else if(foundPost.UserId===req.user.id){
            next()
        } else {
            res.status(403).json({msg:"Wait! This is not your post!"})
        }
    })
}
module.exports = isMyPost