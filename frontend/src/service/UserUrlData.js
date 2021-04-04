import http from "../http";

class UserUrlData {
    login(data) {
        return http.post('/api/auth/login/', data);
    }
    signup(data) {
        return http.post('/api/auth/signup', data);
    }
    getCurrentUser(headers) {
        return http.get('/api/auth/user/', {headers});
    }
    deltAccount(headers, data) {
        return http.put('/api/auth/user/', data, {headers});
    }
}

export default new UserUrlData();