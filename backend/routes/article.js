const express = require('express');
const router = express.Router();

const articleCtrl = require("../controllers/article"); 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/creat', auth, multer, articleCtrl.createArticle);//on poste un article dans reseau social
router.get('/', auth, articleCtrl.getAllArticles);//affiche tout les articles
router.get('/:id_article', auth, articleCtrl.getOneArticleFromUser);//Affiche uniquement un article de l'article de user
router.put('/:id_article', auth, articleCtrl.modifyTextArticle);//modifie le text de l'article.
router.delete('/:id_article', auth, articleCtrl.delateArticle);//Supprime l'article. 


module.exports = router;