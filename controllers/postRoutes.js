const express = require("express");
const router = express.Router();
const { User, Post } = require("../testmodels");
const tokenAuth = require("../testmiddleware/tokenAuth");
const isMyPost = require("../testmiddleware/isMyPost");

//Get all posts
router.get("/", (req, res) => {
    Post.findAll()
        .then(Posts => {
            res.json(Posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

//Get all posts with user data
router.get("/users", (req, res) => {
    Post.findAll({
        include: [User]
    })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

//find one post
router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id, { include: [User] })
        .then(foundPost => {
            if (foundPost) {
                res.json(foundPost);
            } else {
                res.status(404).send("no such Post");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

//create a post
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

//edit post
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
