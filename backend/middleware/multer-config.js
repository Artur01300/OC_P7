//gére les fichiers entrantes dans les requêtes HTTP
const multer = require('multer');

//en utilisant les MIME_TYPES, on génère les extensions du fichier en préparant un dictionniair
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    "image/gif": "gif"
};

//Création d'un objet de configuration pour multer pour enregistrer sur le disque
const storage = multer.diskStorage({

    //l'objet de configuration a besoin 2 élément: déstination 
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //Ici on va générer un nouveau nom pour les fichiers
        //flie.originalname = nom d'origin du fichier et on enleve le point
        const dot = file.originalname.split('.')[0];
        //is il y a un espase vide dans le nom de fichier on remplace par _
        const name = dot.split(' ').join('_');

        /*  On applique une extention au ficier qui serra l'élément de notre dictionnaire pour générer les extantion du ficher
            qui est envoyer par le frontend
        */
        const extension = MIME_TYPES[file.mimetype];

        /* on appelle le collback, ()on passe le 1e argument nulle pour dire il n'ya pas d'erreur, et on  crée le file name entier
         Data.now() pour permetre nos fichier être plus unique */

        callback(null, name + Date.now() + '.' + extension);
    }
});

/*on exporte le middelwar multer en appelant le multer à la quelle on passe notre objet storage et on  apelle la méthode single pour dire
    il sagie un fichier unique et on explique à multer qu'il sagie le fichier image uniquement
*/


module.exports = multer({
    storage: storage,
    limits: {fileSize: 1200000}// La taile de l'image ne doit pas dépassé le 1.2 Mo
}).single('image');