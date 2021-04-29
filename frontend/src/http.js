//Création de la base d'URL avec Axios

import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json"
    }   
});