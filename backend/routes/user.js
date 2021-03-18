const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.createAccount);//Inscription
router.post('/login', userCtrl.login);//Login

router.get("/user/:id_user", userCtrl.getOneUser);
router.delete('/user/:id_user', userCtrl.deltAccount);//suppression d'un compte de user


module.exports = router;