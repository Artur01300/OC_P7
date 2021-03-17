const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.createAccount);//Inscription
router.post('/login', userCtrl.login);//Login

router.get("/:id", userCtrl.getOneUser);
router.delete('/:id', userCtrl.deltAccount);//suppression d'un compte de user


module.exports = router;