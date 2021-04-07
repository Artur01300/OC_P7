const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");



router.post("/:id_article", auth, commentCtrl.createComment);//Commentaire sur un article
router.delete("/:id_article", auth, commentCtrl.deleteComment);//Supprime le commentaire
router.get('/:id_article', auth, commentCtrl.getAllComments); //affiche tous les commentaires dédié pour admin


module.exports = router;