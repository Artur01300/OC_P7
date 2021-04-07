const db = require("../services/mysql");
const jwt = require('jsonwebtoken');

exports.createComment = (req, res) => {

    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

    let sql = "INSERT INTO groupomania.comment(content, users_id_user, articles_id_article) VALUES (?)";
    let values = [req.body.content, decodedToken.id_user, req.params.id_article];

    db.query(sql, [values], function(err) {
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        return res.status(200).json({message: 'good'});
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
exports.getAllComments = (req, res) => {

    let sql = "SELECT * FROM groupomania.v_get_one_comment_from_user WHERE articles_id_article = ?";

    let values = [req.params.id_article];

    db.query(sql, [values], function (err, data){
        if(err){
            console.log(err)
            return res.status(400).json({err});
        }
        return res.status(200).json({data})
    });
};