const express = require('express');

//création de route poste avec la méthode signup et login
router.post('/signup');
router.post('/login');

//exportation de routeur pour importer dans l'app.js
module.exports = router;