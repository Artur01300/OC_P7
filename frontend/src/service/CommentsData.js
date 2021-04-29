//Configuration des requetes avec Axios pour comments
import http from "../http";

class CommentsData {
    getAllComments(id_article, headers) {
        return http.get(`/api/comment/${id_article}`, {headers});
    }

    getOneCommentFromUser(id_comment, headers){
        return http.get(`/api/comment/id_/${id_comment}`, {headers});
    }

    createComment(id_article, data, headers) {
        return http.post(`/api/comment/${id_article}`, data, {headers});
    }
    
    deleteComment(id_comment, headers) {
        return http.delete(`/api/comment/${id_comment}`, {headers});
    }
}

export default new CommentsData();