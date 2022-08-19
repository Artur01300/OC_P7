import http from "../http";

class AvatarUrlData {
    createAvatar(data, headers){
        return http.post('api/avatars/creatAvatar', data, {headers})
    }
    getOneAvatar(id_user, headers){
        return http.get(`/api/avatars/showAvatar/${id_user}`, {headers})
    }
}

export default new AvatarUrlData();