const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");
//Commentaire sur un article
router.post("/", commentCtrl.createComment);

//modifie le commentaire posté
// router.put("/:comment", commentCtrl.modifyComment);




module.exports = router;
