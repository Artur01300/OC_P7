const express = require('express');

//Transforme les req en objet json utilisable
const bodyParser = require('body-parser');


const path = require('path');//donne accès au chemin de note systeme de fichiers

//Importation de router pour enrégistrer ensuit toutes les demandes effectuées vers /api/sauce. 
const saucesRoutes = require('./routes/forum');
const userRoutes = require('./routes/user');

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2c730.mongodb.net/piquante?retryWrites=true&w=majority`,
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();//Il serra notre appliquation


//Pour éviter l'erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//d'envoyer des requêtes avec les méthodes mentionnées ( GET, POST, etc.).
    next();
});

//Pour dire à notre applliquation express de servire le dosier image(backend/images)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());//Il va trensformer le core de la requette en l'objet JS

//On va remettr le début la route et on va dire pour cet route là, on utilise le routeur qui est exposé par sauseRoutes

// app.use('/api/sauces', saucesRoutes);

//enrégiste les routes ici(app.use) et la route attantu par le frontend c'est ('/api/auth')
//auth ça serra la racine de tousse qui est route lier les authentifications et on passe les userRoutes

// app.use('/api/auth', userRoutes);

module.exports = app;//On éxporte cet appliquation pour qu'on puisse accedès depuis un autre fichier dans notre projet