const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");



router.post("/", commentCtrl.createComment);//Commentaire sur un article
router.put("/", commentCtrl.modifyComment);//modifie le commentaire posté
router.delete("/", commentCtrl.deleteComment);//Supprime le commentaire
router.get("/id", commentCtrl.getOneCommentFromUser); //afficher un commentaire

router.get("/", commentCtrl.getAllComments); //affiche tous les commentaires dédié pour admin




module.exports = router;
