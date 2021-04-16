const express = require('express');
const router = express.Router();

const articleCtrl = require("../controllers/article"); 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('../middleware/limitRepeatedRequests');

router.post('/creat', auth, rateLimit, multer, articleCtrl.createArticle);//on poste un article dans reseau social
router.get('/', auth, rateLimit, articleCtrl.getAllArticles);//affiche tout les articles
router.get('/:id_article', auth, rateLimit, articleCtrl.getOneArticleFromUser);//Affiche uniquement un article de l'article de user
router.put('/:id_article', auth, rateLimit, articleCtrl.modifyTextArticle);//modifie le text de l'article.
router.delete('/:id_article', auth, rateLimit, articleCtrl.delateArticle);//Supprime l'article. 


module.exports = router;