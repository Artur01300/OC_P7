// const Article = require("../models/Article");
const db = require("../services/mysql");
const jwt = require('jsonwebtoken');

const fs = require('fs');

//quand j'ajoute un article il m'affiche null, pour quoi ?
exports.createArticle = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    if(req.file){

        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
        let values = [req.body.title, req.body.content, decodedToken.id_user, req.file.filename];
    
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
        let values = [req.body.title, req.body.content, decodedToken.id_user,];
    
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
exports.modifyTextArticle = (req, res, next) => {

    if(req.params.id){
        const sql = "UPDATE groupomania.articles SET content = ?  WHERE id_article = ?";
        let values = [req.body.content, req.body.id_article];
        db.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            return res.status(201).json({ result })
        });
    };

};

exports.delImageArticle = (req, res, next) => {
    const sql = "SELECT groupomania.articles.image from articles WHERE id_article = ? AND users_id_user = ?"
    let values = [req.body.id_article, req.body.users_id_user];

    db.query(sql, values, function (err, result) {

        //Récupération de l'image depuis front-end
        let image = `images/${result[0].image}`
        //Si il y a l'image, alors on supprime l'image et on met à jour le BDD
    if (fs.existsSync(image)) {
        fs.unlinkSync(image);
        
        const sql = "UPDATE groupomania.articles SET image = null WHERE id_article = ? AND users_id_user = ?";
        let values = [req.body.id_article, req.body.users_id_user];
        db.query(sql, values, function (err, result){

            if(err){
                console.log(err);
                return res.status(404).json({err});
            }
        });
        return res.status(201).json({message: 'Image supprimé !'});
        }else{
            return res.status(400).json({message: 'Erreur suppression suppretion image !'});
        }
    });
};

exports.creatImageArticle = (req, res, next) => {
    let sql = "UPDATE groupomania.articles SET image = ? WHERE articles.id_article = ? AND articles.users_id_user = ?";

    let values = [req.file.filename, req.body.id_article, req.body.users_id_user];
    db.query(sql, values, function(err, data, filds){
        console.log(err)
        if(err){
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: 'Image ajouté !'})
    });
}

/*
    Pour après:
    -implémenter un admin pour supprimer l'article
*/

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

exports.getOneArticleFromUser = (req, res, next) => {
    let sql = "SELECT * FROM groupomania.articles WHERE id_article = ?";
    db.query(sql, [req.params.id_article], function(err, data, fields){
        if (err) {
            console.log(err);
            return res.status(400).json({err});
        }
        res.json({status: 200, data, message: "Article d'un utilisateur affiché !"})
        console.log("Article d'un utilisateur affiché !")
    });
}

// exports.getAllArticleFromOneUser = (req, res) => {
// //    console.log(req.params)
//     Article.getOne(req.params.id_user, (err, data) => {

//         if (err) {
//            console.log(err)
//         }else{
//             console.log(data)
//             res.json({status: 200, data, message: "Article affichés !"})
//         }
//     });
// };

exports.getAllArticles = (req, res, next) => {
    let sql = "SELECT * FROM groupomania.v_getonearticle";

    db.query(sql, function (err, data) {
    if (err) {
        return res.status(400).json({err});
    }
    res.json({status: 200, data, message: "Articles affichés !"})
    console.log('Accèd forum')
  });
};