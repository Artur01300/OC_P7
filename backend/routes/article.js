const express = require('express');
const router = express.Router();

// const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

//ne pas oublier le auth !!!
router.post('/creat', auth, multer, articleCtrl.createArticle);//on poste un article dans reseau social
router.put('/:id', auth, articleCtrl.modifyTextArticle);//modifie le text de l'article.
router.delete('/:id', auth, articleCtrl.delateArticle);//Supprime l'article.
router.get('/', auth, articleCtrl.getAllArticles);//affiche tout les articles
router.get('/:id_user', articleCtrl.getOneArticleFromUser);//afficher uniquement tout les article d'un seul utilisateur

router.post('/delImg', auth, multer, articleCtrl.delImageArticle);//Suprime uniquement l'image de l'article.
router.post('/addImg', auth, multer, articleCtrl.creatImageArticle);//Création uniquement l'image de l'article.

module.exports = router;