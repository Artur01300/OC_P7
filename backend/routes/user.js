const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/limitRepeatedRequests');


router.post('/signup', rateLimit, userCtrl.createAccount);//Inscription
router.post('/login', rateLimit, userCtrl.login);//Login
router.get('/user/', rateLimit, auth, userCtrl.getOneUser);//
router.put('/user/', rateLimit, auth, userCtrl.deltAccount);//suppression d'un compte de user


module.exports = router;