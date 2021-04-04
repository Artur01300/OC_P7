import http from "../http";

class ArticlesUrlDada {
    
    getAllArticles(headers){
        return http.get('/api/article/', {headers});
    }
    getOneArticleFromUser(id_article, headers){
        return http.get(`/api/article/${id_article}`, {headers});
    }
    createArticle(data, headers){
        return http.post('/api/article/creat/', data, {headers});
    }

    modifyTextArticle(id_article, data, headers){
        return http.put (`/api/article/${id_article}`, data, {headers});
    }

    delateArticle(id, headers){
        return http.delete('/api/article/', {headers});
    }


}

export default new ArticlesUrlDada();