const db = require("../services/mysql");
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createAvatar = (req, res) =>{
    // PostMan
    // let tokenSplice = token.slice(7);
    // const decodedToken = jwt.verify(tokenSplice, process.env.DB_TOKEN);

    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "INSERT INTO groupomania.avatar(users_id_user, img_avatar) VALUES (?)";
    let values = [decodedToken.id_user, req.file.filename];

    db.query(sql, [values], (err) =>{
        if(err){
            return res.status(400).json({err});
        }
    });
    res.json({status: 201, message: 'Avatar créé !'});
}