const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");



router.post("/:id_user", commentCtrl.createComment);//Commentaire sur un article
router.put("/:id_user", commentCtrl.modifyComment);//modifie le commentaire posté
router.delete("/:id_user", commentCtrl.deleteComment);//Supprime le commentaire
router.get("/:id_user", commentCtrl.getOneCommentFromUser); //afficher un commentaire

router.get("/", commentCtrl.getAllComments); //affiche tous les commentaires dédié pour admin




module.exports = router;
