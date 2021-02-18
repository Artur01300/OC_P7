const Articles = require("../models/Article");
var db = require("../services/mysql");
const jwt = require('jsonwebtoken');

const fs = require('fs');

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
    
    if (req.file) {
        
        const sql = "UPDATE groupomania.articles SET image = ?  WHERE id_article = ?";
        
        console.log(req.file);

        const image = req.file.filename;
        
        // On supprime l'ancienne image du serveur
        // const image = imagePath.split('/images/')[1];
        // fs.unlinkSync(`images/${image}`);

        let values = [image, req.body.id_article];
  
        db.query(sql, values, function (err, result) {
            
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            return res.status(201).json({ result })
        });
    }else{
        
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

// Clé INNER JOIN sélectionne les enregistrements qui ont des valeurs correspondantes dans les deux tables.
exports.getOneArticle = (req, res, next) => {
    let sql = "SELECT groupomania.articles.id_article, title, content, create_at, image, users_id_user FROM groupomania.articles INNER JOIN users ON articles.users_id_user = users.id_user WHERE groupomania.articles.content = ?";
    db.query(sql, [req.params.content], function (err, data, filds){
        if(err){
            console.log(err)
            return res.status(404).json({err});
        }
        res.json({status: 200, data, message: "Article affiché !"})
    });
};

/*  Clé ORDER BY est utilisé pour trier l'ensemble de résultats par ordre croissant ou décroissant
    Pour trier les enregistrements par ordre décroissant, utilisez le mot clé DESC.
*/
exports.getAllArticles = (req, res, next) => {
    let sql = "SELECT groupomania.articles.id_article, title, content, create_at FROM groupomania.articles INNER JOIN users ON articles.users_id_user = users.id_user ORDER BY create_at DESC"; 
    db.query(sql, function (err, data){
        if(err){
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 200, data, message: "Articles affichés !"})
    });
};
