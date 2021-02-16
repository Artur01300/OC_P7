const Articles = require("../models/Article");
var db = require("../services/mysql");
const jwt = require('jsonwebtoken');


//quand j'ajoute un article il m'affiche null, pour quoi ?
exports.createArticle = (req, res, next) => {
    let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
    let values = [req.body.title, req.body.content, req.body.id_user, req.body.image];
    // console.log(user_id)

    db.query(sql, [values], function(err, data, filds){
        console.log(err)
        if(err){
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: 'Nouvelle article créé !'})
    });
};


/* 
    Pour après:
    -implémenter modification d'image de l'article ou le contenue
*/


//ajouter id d'article pour supprimerr uniquement un article et pas tout les article
exports.modifyArticle = (req, res, next) => {

    //si dans les parametre il y a un id . metre cett paramètre quand je mettrais l'id de l'article
    if(req.params.id){

        const sql = "UPDATE groupomania.articles SET content = ?  WHERE id_article = ?";
     
        let values = [req.body.content, req.body.id_article];
        db.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            return res.status(201).json({ result })
        });
    }
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