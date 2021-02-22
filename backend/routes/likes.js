const express = require("express");
const router = express.Router();

const likesCtrl = require("../controllers/likes");
const auth = require("../middleware/auth");


router.post("/", likesCtrl.likes);//like/dislike sur un article

module.exports = router;