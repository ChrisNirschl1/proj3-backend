const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.use(userRoutes)
router.use("/api/posts",postRoutes)

module.exports = router;