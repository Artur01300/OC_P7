//CONFIGURATION D'AXIOS QUI FACILITE LES REQUETES AU BACKEND

import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json"
    }   
});