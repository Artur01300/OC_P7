const express = require('express');
const router = express.Router();

const avatarCtrl = require("../controllers/avatar"); 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('../middleware/limitRepeatedRequests');


router.post('/creatAvatar', rateLimit, multer, avatarCtrl.createAvatar);

module.exports = router;