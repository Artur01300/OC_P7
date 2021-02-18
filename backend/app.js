const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');//donne accès au chemin de note systeme de fichiers

//Importation de router pour enrégistrer ensuit toutes les demandes effectuées vers /api/forum. 
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');
const commentRoutes = require("./routes/comment");

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//d'envoyer des requêtes avec les méthodes mentionnées ( GET, POST, etc.).
    next();
});

//Pour dire à notre applliquation express de servire le dosier image(backend/images)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());//Il va trensformer le core de la requette en l'objet JS


app.use('/api/article', articleRoutes);
app.use('/api/auth', userRoutes);

app.use('/app/comment', commentRoutes);

module.exports = app;