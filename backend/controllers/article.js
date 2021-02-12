const Article = require("../models/Article");
var db = require("../services/mysql");
const jwt = require('jsonwebtoken');


exports.createArticle = (req, res, next) => {
    let sql = "INSERT INTO groupomania.articles(title, content, create_at, users_email, imarge) VALUES (?)";
    let values = [req.body.title, req.body.content, req.body.create_at, req.body.users_email, req.body.imarge];

    db.query(sql, [values], function(err, data, filds){
        if(err){
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: 'Nouvelle article créé !'})
    });
};