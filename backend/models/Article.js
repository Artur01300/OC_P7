// const db = require("../services/mysql");

// // fonction constructeur
// const Article = function (article) {
//   this.id_article = article.id_article;
//   this.id_user = article.id_user;
//   this.title = article.title;
//   this.content = article.content;
//   this.image = article.image;
// };


// // tourver tous les articles
// // Article.getAll = (result) => {
// //  db.query("SELECT  * from groupomania.articles", (err, res) => {
// //     if (err) {
// //       result(err, null);
// //       return;
// //     } else {
// //       result (null, res);
// //       return;
// //     }
// //   });
// // };

// // Article.getOne = (id_user, result) => {
// //   // console.log(id_user)
// //   db.query("SELECT * FROM groupomania.articles WHERE users_id_user = ?", [id_user], (err, res) => {
// //     if (err) {
// //       result(err, null);
// //       return;
// //     } else {
// //       result (null, res);
// //       return;
// //     }
// //   });
// // };

// module.exports = Article;