import http from "../http";

class CommentsDataArticle {
    getAll(id, headers) {
        return http.get(`/api/comment/${id}`, { headers });
    }
    getOne(id, headers) {
        return http.get(`/api/comment/${id}`, { headers });
    }
    create(id, data, headers) {
        return http.post(`/api/comment/${id}`, data, { headers });
    }
    update(id, data, headers) {
        return http.put(`/api/comment/${id}`, data, { headers });
    }
    delete(id, headers) {
        return http.delete(`/api/comment/${id}`, { headers });
    }
}

export default new CommentsDataArticle();