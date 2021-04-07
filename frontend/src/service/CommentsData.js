import http from "../http";

class CommentsData {
    getAll(id_article, headers) {
        return http.get(`/api/comment/${id_article}`, {headers});
    }
    createComment(id_article, data, headers) {
        return http.post(`/api/comment/${id_article}`, data, {headers});
    }
    delete(id_article, headers) {
        return http.delete(`/api/comment/${id_article}`, {headers});
    }
}

export default new CommentsData();