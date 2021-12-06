const express = require("express");
const router = express.Router();
const { User, Post } = require("../testmodels");
const tokenAuth = require("../testmiddleware/tokenAuth");
const isMyPost = require("../testmiddleware/isMyPost");


//GET all posts from all users
//GET http://localhost:3001/api/posts
//   {
//  "description": "post description",
//  "songname": "title of song"
//    }

router.get("/", (req, res) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then(Posts => {
      res.json(Posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});



//GET all posts, can include user data
//GET http://localhost:3001/api/posts/ = grabs all posts from all users
//GET http://localhost:3001/api/posts/users = grab all posts from all users and includes user data

router.get("/users", (req, res) => {
  Post.findAll({
      order:[["createdAt", "DESC"]],
  })
    .then(Posts => {
      res.json(Posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});



//GET a single post by its id/pk
//GET http://localhost:3001/api/posts/:id - also includes user data

router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id, { include: [User] })
    .then(foundPost => {
      if (foundPost) {
        res.json(foundPost);
      } else {
        res.status(404).send("No posts could be found.");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});



//POST create a single post
//POST http://localhost:3001/api/posts/ - requires token authorization for userId association
//  {
//  "description": "OMG the best song EVER!!!",
//  "songname": "Gangnam Style"
//  }

router.post("/", tokenAuth, (req, res) => {
  Post.create({
    songname: req.body.songname,
    description: req.body.description,
    UserId: req.user.id
  })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});



//PUT User can edit a post of their creation
//PUT http://localhost:3001/api/posts/:id - requires token authorization for userId association
// userID must match isMyPost authentication for successful edit
//  {
//  "songname": "Songs of the somethings",
//  "description": "I used to think this was the BEST song...now I KNOW IT'S THE BEST SONG!"
//  }
router.put("/:id", tokenAuth, isMyPost, (req, res) => {
  Post.update(
    {
      songname: req.body.songname,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedPost => {
      res.json(updatedPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});



//DELETE User can delete a post of their creation
//DELETE http://localhost:3001/api/posts/:id - requires token authorization for userId association
//userId must match isMyPost authentication for successful deletion
router.delete("/:id", tokenAuth, isMyPost, (req, res) => {
  console.log(req.params.id)
  Post.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(delPost => {
      res.json(delPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});
module.exports = router;
