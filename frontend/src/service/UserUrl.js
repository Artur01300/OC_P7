import http from "../http";
// axios.post("http://localhost:3000/api/auth/signup", this.form)

class UserUrl {
    login(data) {
        return http.post('/auth/login', data);
    }
    signup(data) {
        return http.post('/api/auth/signup', data);
    }
    // getCurrentUser(id) {
    //     return http.get(`/auth/${id}`);
    // }
}

export default new UserUrl();