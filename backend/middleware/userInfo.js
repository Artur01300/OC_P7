const jwt = require('jsonwebtoken');
require('dotenv').config(); 


// module.exports = (decodedJWT) => {
  
//     const token = req.headers.authorization;
//     const decodedJWT =  jwt.verify(token, process.env.DB_TOKEN);
    
//     return decodedJWT;

// }


let decodedJWT = new DecodedJWT();

const token = req.headers.authorization;
const decodedJWT =  jwt.verify(token, process.env.DB_TOKEN);
decodedJWT.decodedJWT;

module.exports = decodedJWT;