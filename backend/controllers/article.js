// const Article = require("../models/Article");
const db = require("../services/mysql");
const jwt = require('jsonwebtoken');

const fs = require('fs');

//quand j'ajoute un article il m'affiche null, pour quoi ?
exports.createArticle = (req, res) => {
    
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    if(req.file){

        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
        let values = [req.body.title, req.body.content, decodedToken.id_user, req.file.filename];
    
        db.query(sql, [values], function(err, data){
            if(err){
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });

    }else{
        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user) VALUES (?)";
        let values = [req.body.title, req.body.content, decodedToken.id_user,];
    
        db.query(sql, [values], function(err, data){
            if(err){
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });
    }
};


//ajouter id d'article pour supprimerr uniquement un article et pas tout les article
exports.modifyTextArticle = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    if(decodedToken.id_user){
        const sql = "UPDATE groupomania.articles SET content = ?, title = ?  WHERE id_article = ?";
        let values = [req.body.content, req.body.title, req.params.id_article];
        db.query(sql, values, function (err, result) {
            if (err) throw err;

            console.log(result.affectedRows + " record(s) updated");
            res.status(201).json({ result })
        });
    };

};

exports.creatImageArticle = (req, res) => {
    let sql = "UPDATE groupomania.articles SET image = ? WHERE articles.id_article = ? AND articles.users_id_user = ?";

    let values = [req.file.filename, req.body.id_article, req.body.users_id_user];
    db.query(sql, values, function(err, data){
        console.log('LOG 67 ',err)
        if(err){
            console.log('LOG 69 ',err)
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: 'Image ajouté !'})
    });
}

/*
    Pour après:
    -implémenter un admin pour supprimer l'article
*/

exports.delateArticle = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    
    const sqlSelectFile = "SELECT image FROM groupomania.articles WHERE id_article = ? AND users_id_user = ?";
    const sqlDeleteArticle = "DELETE FROM groupomania.articles WHERE id_article = ? AND users_id_user = ?";
    
    let values = [req.params.id_article, decodedToken.id_user];

    db.query(sqlSelectFile, values, function (err, result){

        if (err) {
            console.log(err)
            return res.status(500).json({err});
        }
        if(result[0].image){
            let image = `images/${result[0].image}`

            if (image){
                fs.unlinkSync(image);
            }
        }
    });
    
    db.query(sqlDeleteArticle, values, function(err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({err});
        }
        res.status(200).json({message: "Article supprimé !"});
    });
}

exports.delImageArticle = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    const sqlSelect = "SELECT * groupomania.articles.image from articles WHERE id_article = ? AND users_id_user = ?";
    const sqlUpdate = "UPDATE groupomania.articles SET image = null WHERE id_article = ? AND users_id_user = ?";
    let values = [req.body.id_article, decodedToken.id_user];

    db.query(sqlSelect, values, function (err, result) {

        //Récupération de l'image depuis front-end
        let image = `images/${result[0].image}`
        //Si il y a l'image, alors on supprime l'image et on met à jour le BDD
    if (fs.existsSync(image)) {
      
        db.query(sqlUpdate, values, function (err, result){
            
            if(err){
                console.log(err);
                return res.status(404).json({err});
            }
        });
        fs.unlinkSync(image);
        return res.status(201).json({message: 'Image supprimé !'});
        }else{
            return res.status(400).json({message: 'Erreur suppression suppretion image !'});
        }
    });
};

exports.getOneArticleFromUser = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "SELECT * FROM groupomania.articles WHERE id_article = ?";

    db.query(sql, [req.params.id_article], function(err, data, fields){
        
        if (err) {
            console.log(err);
            return res.status(400).json({err});
        }
        if (data[0].users_id_user == decodedToken.id_user){
            res.status(200).json({owner: true, data})
        } else {
            res.status(200).json({owner: false, data})
        }        
    });
}

exports.getAllArticles = (req, res, next) => {
    let sql = "SELECT name, title, content, image, create_at, id_article FROM groupomania.v_getonearticle";

    db.query(sql, function (err, data) {
    if (err) {
        return res.status(400).json({err});
    }
    res.status(200).json({data})
  });
};