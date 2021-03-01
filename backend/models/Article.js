const db = require("../services/mysql");

// fonction constructeur
const Articles = function (articles) {
  this.id_article = articles.id_article;
  this.id_user = articles.id_user;
  this.title = articles.title;
  this.content = articles.content;
  this.image = articles.image;
};


// tourver tous les articles
Articles.getAll = (result) => {
 db.query("SELECT  * from groupomania.articles", (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result (null, res);
      return;
    }
  });
};

Articles.getOne = (idUser, result) => {

  db.query("SELECT * FROM groupomania.v_getOneArticle WHERE id_user = ?", [idUser], (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result (null, res);
      return;
    }
  });
};




// exports.getOne = (req, res, next) => {
//   let sql = "SELECT * FROM groupomania.v_getOneArticle WHERE id_user = ?";
//   db.query(sql,[req.body.id_user], function (err, data, filds){

//       if(err){
//           console.log(err)
//           return res.status(404).json({err});
//       }
//       res.json({status: 200, data, message: "Article affiché !"})
//   });
// };


module.exports = Articles;