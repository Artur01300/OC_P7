const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userCtrl.createAccount);//Inscription
router.post('/login', userCtrl.login);//Login
router.get('/user/', auth, userCtrl.getOneUser);//
router.put('/user/', auth, userCtrl.deltAccount);//suppression d'un compte de user


module.exports = router;