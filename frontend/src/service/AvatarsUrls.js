import http from "../http";

class AvatarUrlData {
    createAvatar(data, headers){
        return http.post('api/avatars/creatAvatar', data, {headers})
    }
    getOneAvatar(headers){
        return http.get('/api/avatars/showAvatar', {headers})
    }
}

export default new AvatarUrlData();