const Comment = require("../models/Comment");
const db = require("../services/mysql");

exports.createComment = (req, res, next) => {
    let sql = "INSERT INTO groupomania.comment(content, users_id_user, articles_id_article) VALUES (?)";
    let values = [req.body.content, req.body.users_id_user, req.body.articles_id_article];

    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouveau commentaire ajouté !"})
    });
};


exports.modifyComment = (req, res, next) => {
    let sql = "UPDATE groupomania.comment SET content = ? WHERE comment.id_comment = ? AND id_comment";
    let values = [req.body.content, req.body.id_comment, req.body.articles_id_article];
    db.query(sql, values, function(err, data, fields) {
        console.log(err)
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Commentaire modifié !"})
    });
};

exports.deleteComment = (req, res, next) => {
    let sql = "DELETE FROM groupomania.comment WHERE id_comment = ?";
    db.query(sql, [req.body.id_comment], function(err, data) {

        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 200, data, message: "Commentaire supprimé !"})
    });
};

// pour admin pour supprimer ou voir tous les comment de users 
exports.getAllComments = (req, res, next) => {
    let sql = "SELECT  * from groupomania.comment";
    db.query(sql, function (err, data){
        if(err){
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 200, data, message: "Commentaires affichés !"})
    });
};


exports.getOneCommentFromUser = (req, res, next) => {
    let sql = "SELECT * FROM groupomania.v_get_one_comment_from_user WHERE id_user = ?";
    db.query(sql, [req.body.id_user], function(err, data) {
        
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 200, data, message: "Commentaires d'un utilisateur affichés!"})
    });
};
