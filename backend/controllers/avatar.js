const db = require("../services/mysql");
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createAvatar = (req, res) =>{
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    if(req.file){
        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
        let values = [decodedToken.id_user, req.file.filename];

        db.query(sql, [values], (err, data) =>{
            if(err){
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Avatar créé !'})
        });

    }
}