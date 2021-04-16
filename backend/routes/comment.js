const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const rateLimit = require('../middleware/limitRepeatedRequests');

router.post("/:id_article", auth, rateLimit, commentCtrl.createComment);//Commentaire sur un article
router.delete("/:id_comment", auth, rateLimit, commentCtrl.deleteComment);//Supprime le commentaire
router.get('/:id_article', auth, rateLimit, commentCtrl.getAllComments); //affiche tous les commentaires dédié pour admin
router.get("/id_/:id_comment", auth, rateLimit, commentCtrl.getOneCommentFromUser); //afficher un commentaire 


module.exports = router;