var db = require("../services/mysql");
const User = require('../models/User');

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createAccount = (req, res, next) => {
  //Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 caractère spécial, une longeur d'un moins 7 caractères
  const passwordRegex = /^(?=.{7,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  const password = req.body.password;

  //test() vérifie s'il y a une correspondance entre un password et passwordRegex. 
  if (!passwordRegex.test(password)) {
    return res.status(406).json('Current password does not meet the requirments');
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
    /*
      si l'adresse d-mail est idantique alors user n'est pas autorisé pour l'inscription, 
      et on affiche ce message erreur et on l'interdit de créer un nouveau compte
    */
    if (err)
      res.status(500).send({
      message: err.message + "|" + " Cette adresse e-mail est déjà utilisée !",
    });
    else res.send(data);
    });
  });
};


exports.login = (req, res, next) => {
  User.loginModel(req.body.email, (err, data) => {
    //si on n'a pas trouver les user(si address email n'est pas correct) on envoie le 401 pour dire non trouvé

    if(data.length === 0){
      return res.status(401).json({error: 'Utilisateur non trouvé !'});
    }
    //Si user est supprimé son compte, il peut pas se connécter à nouveau
    if(data[0].state === 1){
      return res.status(405).json({error: 'Utilisateur non autorisé !'});
    }
    // si user est bon alors on cript le mot de passe
    bcrypt.compare(req.body.password, data[0].password)
    .then(valid =>{
      if(!valid){//il reçoit le boolean, c'est-à-dire, si le mot de passe n'est pas valable
        return res.status(401).json({error: 'Mot de passe incorrect !'});
      }
      /*
        si on arrive ici alors la comparaison est true. dans ce cas-là on renvoie la bonne connexion et l'objet json qui contient 
        id d'user dans la base et on envoie la token
      */
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

exports.getOneUser = (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
  
  User.getOneUserModel(decodedToken.id_user, (err, data) => {
    console.log('datadfgsdfgdsg')
    if(err){
      return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "User affiché !"})
  });
};

exports.deltAccount = (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
  
  User.deltAccountModel(decodedToken.id_user, (err, data) => {
    if (err) {
      return res.status(400).json({err: "suppression est échoué"});
    };
    res.json({status: 200, data, message: "Votre compte a bien été supprimé !"});
  });
};