// fonction constructeur
const User = function (user) {
  // this.id = user.id,
  this.name = user.name,
  this.email = user.email,
  this.password = user.password
  // this.isAdmin = user.isAdmin,
  // this.idimage = user.idimage
};

module.exports = User;
