const express = require('express');
const router = express.Router();


router.get('/');//Renvoie le tableau de toutes les sauces dans la base de données
router.get('/:id');//Renvoie la sauce avecl'ID fourni
router.post('/');//on poste un article
router.put('/:id');//Met à jour l'article avec l'identifiant fourni.
router.delete('/:id');//Supprime l'article' avec l'ID fourni.
router.post('/:id/like');//Définit le statut "j'aime" pour userID fourni. 

module.exports = router;