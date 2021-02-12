const express = require('express');
const router = express.Router();

// const auth = require("../middleware/auth");

const articleCtrl = require("../controllers/article");

router.post('/', articleCtrl.createArticle);//on poste un article dans reseau social

router.put('/:id');//modifie l'article.

router.delete('/:id');//Supprime l'article.

router.get('/');//affiche tout les articles

router.get('/:id');//affiche une aricle


module.exports = router;