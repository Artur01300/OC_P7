const Articles = require("../models/Article");
var db = require("../services/mysql");
const jwt = require('jsonwebtoken');


//quand j'ajoute un article il m'affiche null, pour quoi ?
exports.createArticle = (req, res, next) => {
    if(req.file){

        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
        
        let image = (`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
        let values = [req.body.title, req.body.content, req.body.users_id_user, image];
    
        db.query(sql, [values], function(err, data, filds){
            console.log(err)
            if(err){
                console.log(err)
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });

    }else{
        
        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user) VALUES (?)";
        let values = [req.body.title, req.body.content, req.body.users_id_user];
    
        db.query(sql, [values], function(err, data, filds){
            console.log(err)
            if(err){
                console.log(err)
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });
    }
};


//ajouter id d'article pour supprimerr uniquement un article et pas tout les article
exports.modifyArticle = (req, res, next) => {
    
   
};

/* 
    Pour après:
    -implémenter un admin pour supprimer l'article
*/


//arjouté id article pour supprimer uniquement larticle et pas tout les article
exports.delateArticle = (req, res, next) => {
    let sql = "DELETE FROM groupomania.articles WHERE id_article = ?";
    db.query(sql, [req.body.id_article], function(err, data) {
      
    if (err) {
        console.log(err)
        return res.status(400).json({err});
    }
        res.json({status: 200, data, message: "Article supprimé !"})
    });
}