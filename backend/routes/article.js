const express = require('express');
const router = express.Router();

// const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");
const auth = require('../middleware/auth');

router.post('/', articleCtrl.createArticle);//on poste un article dans reseau social
router.put('/:id', articleCtrl.modifyArticle);//modifie l'article.
router.delete('/:id', articleCtrl.delateArticle);//Supprime l'article.
router.get('/');//affiche tout les articles
router.get('/:id');//affiche une aricle


module.exports = router;