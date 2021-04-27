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

// User.login = (email, result) => {
//   db.query("SELECT * FROM groupomania.users WHERE email = ?", email, (err, res) => {
//     if (err) {
//       result(err, null);
//       return;
//     } else {
//       result (null, res);
//       return;
//     }
//   });
// };

module.exports = User;
