// const Article = require("../models/Article");
const db = require("../services/mysql");
const jwt = require('jsonwebtoken');
const fs = require('fs');


exports.createArticle = (req, res) => {

    //Vérification users par le token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    if(req.file){

        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user, image) VALUES (?)";
        let values = [req.body.title, req.body.content, decodedToken.id_user, req.file.filename];
    
        db.query(sql, [values], (err, data) =>{
            if(err){
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });

    }else{
        let sql = "INSERT INTO groupomania.articles(title, content, users_id_user) VALUES (?)";
        let values = [req.body.title, req.body.content, decodedToken.id_user,];
    
        db.query(sql, [values], (err, data) =>{
            if(err){
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: 'Nouvelle article créé !'})
        });
    };
};

exports.modifyTextArticle = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    if(decodedToken.id_user){
        const sql = "UPDATE groupomania.articles SET content = ?, title = ?  WHERE id_article = ?";
        let values = [req.body.content, req.body.title, req.params.id_article];
        db.query(sql, values, (err, result) =>{
            if (err) throw err;

            console.log(result.affectedRows + " record(s) updated");
            res.status(201).json({ result })
        });
    };

};

exports.delateArticle = (req, res) => {
    //Vérification users par le tocken
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    //Pour supprimer l'article par l'Admin
    const sqlADMINSelectFile = "SELECT image FROM groupomania.articles WHERE id_article = ?";
    const sqlADMINDeleteArticle = "DELETE FROM groupomania.articles WHERE id_article = ?";

    //Pour supprimer l'article par le users
    const sqlSelectFile = "SELECT image FROM groupomania.articles WHERE id_article = ? AND users_id_user = ?"; 
    const sqlDeleteArticle = "DELETE FROM groupomania.articles WHERE id_article = ? AND users_id_user = ?";
    
    let valuesADMIN = [req.params.id_article];
    let values = [req.params.id_article, decodedToken.id_user];

    //On vérifie si c'est l'admin, alors on supprimer l'article
    if (decodedToken.isAdmin){
        db.query(sqlADMINSelectFile, valuesADMIN, (err, result) =>{

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
        db.query(sqlADMINDeleteArticle, valuesADMIN, (err, data) =>{

            if (err) {
                console.log(err)
                return res.status(500).json({err});
            }
            res.status(200).json({message: "Article supprimé !"});
        });
    } else {
        //si c'est le user, alors on supprime l'article
        db.query(sqlSelectFile, values, (err, result) =>{
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
        db.query(sqlDeleteArticle, values, (err, data) => {

            if (err) {
                console.log(err)
                return res.status(500).json({err});
            }
            res.status(200).json({message: "Article supprimé !"});
        });
    }
}

exports.getOneArticleFromUser = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    
    let sql = "SELECT * FROM groupomania.articles WHERE id_article = ?";
    
    db.query(sql, [req.params.id_article], (err, data, fields) =>{
        
        if (err) {
            console.log(err);
            return res.status(400).json({err});
        }
        if (data[0].users_id_user == decodedToken.id_user || decodedToken.isAdmin){
            res.status(200).json({owner: true, data})
        } else {
            res.status(200).json({owner: false, data})
        }        
    });
}

exports.getAllArticles = (req, res, next) => {
    let sql = "SELECT name, title, content, image, create_at, id_article FROM groupomania.v_getonearticle ORDER BY create_at DESC";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(400).json({err});
        }
        res.status(200).json({data})
    });
};
