import http from "../http";

class ArticlesUrlDada {
    
    getAllArticles(headers){
        return http.get('/api/article/', {headers});
    }
    createArticle(data, headers){
        return http.post('/api/article/creat/', data, {headers});
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