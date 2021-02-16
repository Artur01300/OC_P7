const Article = require("../models/Article");
var db = require("../services/mysql");
const jwt = require('jsonwebtoken');


exports.createArticle = (req, res, next) => {
    let sql = "INSERT INTO groupomania.articles(title, content, users_email, image) VALUES (?)";
    let values = [req.body.title, req.body.content, req.body.users_email, req.body.image];

    db.query(sql, [values], function(err, data, filds){
        if(err){
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: 'Nouvelle article créé !'})
    });
};


/* 
    Pour après:
    -implémenter modification d'image de l'article
*/

exports.modifyArticle = (req, res, next) => {

    const sql = "UPDATE groupomania.articles SET content = ?  WHERE users_email = ?";
    let values = [req.body.content, req.body.users_email];
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        return res.status(201).json({ result })
    });
    
};

/* 
    Pour après:
    -implémenter un admin pour supprimer l'article
*/

exports.delateArticle = (req, res, next) => {
    let sql = "DELETE FROM groupomania.articles WHERE users_email = ?";
    db.query(sql, [req.body.users_email], function(err, data) {
      
    if (err) {
        console.log(err)
        return res.status(400).json({err});
    }
        res.json({status: 200, data, message: "Article supprimé !"})
    });
}