const db = require("../services/mysql");
// fonction constructeur
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.signup = (newUser, result) => {
  db.query("INSERT INTO groupomania.users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
      return;
    }
    console.log("Le compte est créé !");
    result(null, {id: res.insertId, ...newUser });    
  });
};

module.exports = User;
