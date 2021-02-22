const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");



router.post("/", commentCtrl.createComment);//Commentaire sur un article
router.put("/", commentCtrl.modifyComment);//modifie le commentaire posté
router.delete("/", commentCtrl.deleteComment);//Supprime le commentaire
router.get("/", commentCtrl.getAllComments); //affiche tous les commentaires
router.get("/:id", commentCtrl.getOneComment); //afficher un commentaire





module.exports = router;
