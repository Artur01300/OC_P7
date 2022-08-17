import http from "../http";

class AvatarUrlData {
    createAvatar(data, headers){
        return http.post('api/avatars/creatAvatar', data, {headers})
    }
}

export default new AvatarUrlData();