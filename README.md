### Groupomania

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Exigences

* la présentation des fonctionnalités doit être simple
* la création d’un compte doit être simple et possible depuis un téléphone mobile
* le profil doit contenir très peu d’informations pour que sa complétion soit rapide
* la suppression du compte doit être possible
* l’accès à un forum où les salariés publient des contenus multimédias doit être présent
* l’accès à un forum où les salariés publient des textes doit être présent
* les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
* le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés


## Le back-end

A la racine de backend, créez un fichier `.env` (backend/.env), mettre les valeurs correctes.
Pour se connecter à une base de donnée Mysql:
`DB_USER=`
`DB_PASS=`
`DB_DATABASE=`
`DB_PORT=`
Pour le token d'authentification:
`DB_TOKEN=`


## Le front-end

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.


Pour **créer un compte**, mettre un **mot de passe** (minimum 6 caractères macimum 10).


## Technologies à utilisés

* serveur : NodeJS ;
* framework : Express ;
* base de données : MysSQL;
* Angular CLI

Pour **La base de donnée MYSQL** vous pouvez utiliser le modele **Groupomania_models.mwb** que je vous ai mis dans le dossier backend/services,

## Procédure

1. Cloner le projet.
2. Installez @angular/cli globalement 
3. Exécutez npm install.
4. Exécutez nodemon serve pour le back-end.
5. Exécutez npm run serve pour le front-end.
6. Le front-end est visible sur http://localhost:8080.
7. Le back-end est visible sur le port 3000.
