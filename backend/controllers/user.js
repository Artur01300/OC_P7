var db = require("../services/mysql");
const User = require('../models/User');

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createAccount = (req, res, next) => {
  //Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 caractère spécial, une longeur d'un moins 7
  const passwordRegex = /^(?=.{7,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  const password = req.body.password;

  //test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. 
  if (!passwordRegex.test(password)) {
    return res.status(406).json('Current password does not match');
  }

  bcrypt
  .hash(password, 10) //password hashing
  .then((hash) => {
    //Créatin d'un user depuit inputs
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  // Sauvgard de user dans db
  User.signup(user, (err, data) => {
    if (err)
      res.status(500).send({
      message: err.message + "|" + " Cette adresse  e-mail est déjà utilisée !",
    });
    else res.send(data);
    });
  });
};

exports.login = (req, res, next) => {
  let sql = "SELECT * FROM groupomania.users WHERE email = ?";
  db.query(sql, [req.body.email], function(err, data, result){
    //console.error(err);
    if(data.length === 0){//si on n'a pas trouver les user on envoie le 401 pour dire non autorisé
      return res.status(401).json({error: 'Utilisateur non trouvé !'});
    }
    // si user est bon alors on cript le mot de passe
    bcrypt.compare(req.body.password, data[0].password)
    .then(valid =>{
      if(!valid){//il reçoit le boolean, c'est-à-dire, si le mot de passe n'est pas valable
          return res.status(401).json({error: 'Mot de passe incorrect !'});
      }
      //si on arrive ici alors la comparaison est true. dans ce cas-là on renvoie la bonne connexion et l'objet json qui contient id d'user dans la base
      //et on envoie la token
      res.status(200).json({
        token: jwt.sign(
          {id_user:data[0].id_user, isAdmin: data[0].isAdmin, name:data[0].name},
            `${process.env.DB_TOKEN}`,
            {expiresIn: '24h'}
          )
      });
    })
    .catch(error => res.status(500).json({error}));
  });
};

/*
Pour après:
  -implémenter un d'avatar pour user
  -implémnter un admin pour supprimer l'outilisateur
*/

//

exports.getOneUser = (req, res, next) => {
  
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);

  let sql = "SELECT users.id_user, users.name, users.email FROM groupomania.users where users.id_user = ?";
  db.query(sql, decodedToken.id_user, function (err, data, filds){
    if(err){
      return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "User affiché !"})
  });
};

//Problème de suppression d'un user

exports.deltAccount = (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
  
  let sql = "UPDATE groupomania.users SET state = 1  WHERE id_user = ?";
  db.query(sql, decodedToken.id_user, function (err, data) {
    if (err) {
      console.log(err)
      return res.status(400).json({err: "suppression est échoué"});
    }
    res.json({status: 200, data, message: "Votre compte a bien été supprimé !"});
  });
};