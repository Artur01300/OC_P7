const Comment = require("../models/Comment");
const db = require("../services/mysql");

exports.createComment = (req, res, next) => {
    let sql = "INSERT INTO groupomania.comment(content, users_id_user, articles_id_article) VALUES (?)";
    let values = [req.body.content, req.body.users_id_user, req.body.articles_id_article];
    console.log(req.body)

    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            console.log(err)
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouveau commentaire ajouté !"})
    });
};