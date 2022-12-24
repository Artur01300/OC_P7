const jwt = require('jsonwebtoken');
require('dotenv').config(); 

module.exports = (req, res, next) => {
  
  const token = req.headers.authorization;
  console.log(token)
  
  if (!token) return res.status(401).send({auth: false, message: 'No token provided !'});

    jwt.verify(token, process.env.DB_TOKEN, function(err) {
    if(err) return res.status(500).send({auth: false, message: 'Faild to authenticate token !'});

    next();
  });
}