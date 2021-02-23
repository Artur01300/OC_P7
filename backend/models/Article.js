// fonction constructeur
const Articles = function (articles) {
  this.id_article = articles.id_article;
  this.users_id_user = articles.users_id_user;
  this.title = articles.title;
  this.content = articles.content;
  this.image = articles.image;
};
  

module.exports = Articles;