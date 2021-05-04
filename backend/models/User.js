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
    };
    result(null, newUser);//...newUser: pour récupèrer touts les infos de User
  });
};

User.loginModel = (email, result) => {
  db.query("SELECT * FROM groupomania.users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
      return;
    };
    //le res: pour retourner le resultat à mon controlers/user.js
    result(null, res);
  });
};

User.getOneUserModel = (id_user, result) => {
  db.query("SELECT users.name, users.email FROM groupomania.users where users.id_user = ?", id_user, (err, res) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
      return;
    };
    result(null, res);
  });
};

User.deltAccountModel = (id_user, result) => {
  db.query("UPDATE groupomania.users SET state = 1  WHERE id_user = ?", id_user, (err, res) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
      return;
    };
    result(null, res);
  });
};

module.exports = User;
