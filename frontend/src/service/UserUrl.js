import http from "../http";

class UserUrl {
    login(data) {
        return http.post('/api/auth/login/', data);
    }
    signup(data) {
        return http.post('/api/auth/signup', data);
    }
    getCurrentUser(id) {//ok ?
        return http.get(`api/article/${id}`);
    }
    deleteUser(id) {
        return http.delete(`/api/auth/login${id}`);
    }
}

export default new UserUrl();