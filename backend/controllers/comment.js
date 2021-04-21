const db = require("../services/mysql");
const jwt = require('jsonwebtoken');

exports.createComment = (req, res) => {

    //Vérification users par le token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "INSERT INTO groupomania.comment(content, users_id_user, articles_id_article) VALUES (?)";
    let values = [req.body.content, decodedToken.id_user, req.params.id_article];

    db.query(sql, [values], function(err) {
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        return res.status(200).json({message: 'Commentaire créé !'});
    });
};

exports.deleteComment = (req, res, next) => {
    //Vérification users par le token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "DELETE FROM groupomania.comment WHERE id_comment = ?";
    db.query(sql, [req.params.id_comment], function(err, data) {
        if (req.params.id_comment || decodedToken.isAdmin) {
            
            if (err) {
                console.log(err)
                return res.status(400).json({err});
            }
            res.status(200).json({ data, message: "Commentaire supprimé !"})
        }

    });
};

exports.getAllComments = (req, res) => {
    //Vérification users par le token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "SELECT * FROM groupomania.v_get_one_comment_from_user WHERE articles_id_article = ?";
    let values = [req.params.id_article];  

    db.query(sql, [values], function(err, data) {
        //création un responseData pour ne pas envoyer l'id user au fronteand
        let responseData = [];

        data.forEach(element => {
            /*
                Pour chaque commentaire on vérifie si le user est le owner de ces commentaire ou l'admin, si owner est true dans,
                le frontend on affiche le bouton de suppréssion si non on le cache
            */
            let ownerVar
            if (element.users_id_user == decodedToken.id_user || decodedToken.isAdmin) {
                ownerVar = true
            }else{
                ownerVar = false
            }
            //Je push dans le responseData pour ne pas envoyer l'id user au fronteand
            responseData.push({
                owner: ownerVar,
                name:element.name,
                content:element.content,
                created_at:element.created_at,
                id_comment:element.id_comment,
                articles_id_article:element.articles_id_article})
            });
            if (err) {
                console.log(err)
                return res.status(400).json({err});
            }
        res.status(200).json({responseData});
    });
};

exports.getOneCommentFromUser = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    
    let sql = "SELECT id_comment, users_id_user, content, created_at, articles_id_article FROM groupomania.comment WHERE id_comment = ?";
   
    let values = [req.params.id_comment];
    db.query(sql, [values], function(err, data) {
        
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        //création un responseData pour ne pas envoyer l'id user au fronteand
        let responseData = [];
        responseData[0] = {
            id_comment:data[0].id_comment, 
            name:data[0].name, 
            content:data[0].content, 
            created_at:data[0].created_at, 
            articles_id_article:data[0].articles_id_article
        }
        if (data[0].users_id_user == decodedToken.id_user || decodedToken.isAdmin) {
            res.status(200).json({owner: true, responseData}); 
        }else{
            res.status(200).json({owner: false, responseData});
        }
    });
};