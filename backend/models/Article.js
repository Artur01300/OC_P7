// fonction constructeur

const Article = function (articles) {
  
    this.id = articles.id_article;
    this.title = articles.title,
    this.content = articles.content,
    this.create_at = articles.create_at,
    this.imarge = articles.imarge,
    this.users_email = articles.users_email
  };
  
  module.exports = Article;
  