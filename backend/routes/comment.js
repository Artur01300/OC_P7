const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/:id_article", auth, commentCtrl.createComment);//Commentaire sur un article
router.delete("/:id_comment", auth, commentCtrl.deleteComment);//Supprime le commentaire
router.get('/:id_article', auth, commentCtrl.getAllComments); //affiche tous les commentaires dédié pour admin
router.get("/id_/:id_comment", auth, commentCtrl.getOneCommentFromUser); //afficher un commentaire 


module.exports = router;