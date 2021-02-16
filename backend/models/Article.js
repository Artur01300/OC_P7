// fonction constructeur
const Article = function (articles) {
  this.id_article = articles.id_article;
  this.title = articles.title,
  this.content = articles.content,
  this.image = articles.image,
  this.users_email = articles.users_email
};
  
module.exports = Article;
  