import http from "../http";


// router.post('/', multer, articleCtrl.createArticle);//on poste un article dans reseau social
// router.get('/:id_user', articleCtrl.getOneArticleFromUser);//afficher uniquement tout les article d'un seul utilisateur
// router.get('/', auth, articleCtrl.getAllArticles);//affiche tout les articles
// router.put('/:id', auth, articleCtrl.modifyTextArticle);//modifie le text de l'article.
// router.delete('/:id', auth, articleCtrl.delateArticle);//Supprime l'article. 


// router.post('/delImg', auth, multer, articleCtrl.delImageArticle);//Suprime uniquement l'image de l'article.
// router.post('/addImg', auth, multer, articleCtrl.creatImageArticle);//Création uniquement l'image de l'article.

class ArticlesUrlDada {
    
    getAllArticles(headers){
        return http.get('/api/article/', {headers});
    }
    createArticle(data, headers){
        return http.post('/api/article/creat', data, {headers});
    }

    getOneArticleFromUser(id, headers){
        return http.get(`api/article/${id}`, {headers});
    }


    modifyTextArticle(id, data, headers){
        return http.put(`api/article/${id}`, data, {headers});
    }

    delateArticle(id, headers){
        return http.delete(`api/article/${id}`, {headers});
    }

}

export default new ArticlesUrlDada();