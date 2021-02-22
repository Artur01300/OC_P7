const express = require('express');
const router = express.Router();

// const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

//ne pas oublier le auth !!!
router.post('/', multer, articleCtrl.createArticle);//on poste un article dans reseau social
router.put('/:id', articleCtrl.modifyTextArticle);//modifie le text de l'article.
router.post('/:id', multer, articleCtrl.delImageArticle);//modifie l'article.
router.delete('/:id', articleCtrl.delateArticle);//Supprime l'article.
router.get('/', articleCtrl.getAllArticles);//affiche tout les articles
router.get('/id', articleCtrl.getOneArticle);//affiche une aricle


module.exports = router;