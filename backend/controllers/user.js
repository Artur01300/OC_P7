var db = require("../services/mysql");
const User = require('../models/User');

require('dotenv').config();

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
      if (err)
        throw err;
        console.log("Nombre d'utilisateur créé: " + result.affectedRows);
    });
  })
  .then(()=> res.status(201).json())//Pour éviter le speaneur
  .catch(error => res.status(500).json({error}));
};



//Login permet de connecter aux users exictent 
exports.login = (req, res, next) => {
  
  let sql = "SELECT * FROM groupomania.users WHERE email = ?";
  db.query(sql, [req.body.email], function(err, data, result){
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
          userName:data[0].name,
          token: jwt.sign(
          //création d'objet avec user id(userId), qui serra l'identifiant d'utilisateur du user(user._id)
          {userName: data[0].name},
            `${process.env.DB_TOKEN}`,//ce 2em argument c'est la clé secret d'encodage
            {expiresIn: '24h'}//3em argument c'est un argument de configuration où on applique une expiration de notre token dans 24h
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


//Problème de suppression d'un user
exports.deltAccount = (req, res, next) => {
  let sql = "DELETE FROM groupomania.users WHERE id_user = ?";

  db.query(sql, [req.body.id_user], function(err, data, fields) {
    if (err) {
      console.log(err)
      return res.status(400).json({err: "suppression est échoué"});
    }
    res.json({status: 200, data, message: "Votre compte a bien été supprimé !"});
  });
};
