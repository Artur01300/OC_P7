// fonction constructeur
const User = function (user) {
  this.id_user = user.id_user;
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  // this.isAdmin = user.isAdmin;
  // this.idimage = user.idimage;
};

module.exports = User;
