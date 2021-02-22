const Comment = function (comment) {
    this.id_comment = comment.id_comment;
    this.content = comment.content;
    this.created_at = comment.created_at;
    this.users_id_user = comment.users_id_user;
    this.articles_id_article = comment.articles_id_article;
};
    
module.exports = Comment;
