import http from "../http";

class UserUrlData {
    login(data) {
        return http.post('/api/auth/login/', data);
    }
    signup(data) {
        return http.post('/api/auth/signup', data);
    }
    getCurrentUser(id) {
        return http.get(`api/auth/user/${id}`);
    }
    deleteUser(id) {
        return http.put(`/api/auth/user/${id}`);
    }
}

export default new UserUrlData();