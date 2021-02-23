const Likes = require("../models/Likes");
const db = require("../services/mysql");

exports.likes = (req, res, next) => {

    let sql = "INSERT INTO groupomania.likes(likesUserId, likesArticlesIdArticle, like, dislike) VALUES (?)";
    let values = [req.body.likesUserId, req.body.likesArticlesIdArticle, req.body.like];
    db.query(sql, [values], function(err, data, fields) {
        console.log(err)
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Like/dislike créé !"})
    });
};