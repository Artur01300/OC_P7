var db = require("../services/mysql");
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
  .then(hach => {
    const user = new User({
      name : req.body.name,
      email: req.body.email,
      password: hach
    });
  
    let sql = "INSERT INTO groupomania.users(name, email, password) VALUES (?)";
    let values = [user.name, user.email, user.password];
    
    db.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Nombre d'utilisateur inscrit: " + result.affectedRows);
    });
  })
  .then(()=> res.status(201).json({message: 'Utilisateur créé !'}))//Pour éviter le speaneur
  .catch(error => res.status(500).json({error}));
};

