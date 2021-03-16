import http from "../http";

class UserUrl {
    login(data) {
        return http.post('/api/auth/login', data);
    }
    signup(data) {
        return http.post('/api/auth/signup', data);
    }
    // getCurrentUser(id) {
    //     return http.get(`/auth/${id}`);
    // }
}

export default new UserUrl();