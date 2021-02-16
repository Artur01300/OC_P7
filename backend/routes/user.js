const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);//Inscription
router.post('/login', userCtrl.login);//Login

router.delete('/:id', userCtrl.deltAccount);//suppression d'un compte de user


module.exports = router;