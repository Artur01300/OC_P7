// fonction constructeur
const Articles = function (articles) {
  this.id_article = articles.id_article;
  this.id_user = articles.id_user;
  this.title = articles.title;
  this.content = articles.content;
  this.image = articles.image;
};
  
module.exports = Articles;
  