### Groupomania

C'est un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

## Exigences

* la présentation des fonctionnalités est simple
* la création d’un compte est simple et possible depuis un téléphone mobile
* le profil conten très peu d’informations pour que sa complétion soit rapide
* la suppression du compte est possible
* l’accès à un forum où les salariés publient des contenus multimédias est présent
* l’accès à un forum où les salariés publient des textes doit est présent
* les utilisateurs pouvent facilement repérer les dernières participations des employés
* le ou la chargé-e de communication Groupomania peut modérer les interactions entre salariés


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


Pour **créer un compte**, mettre un **mot de passe** (minimum 7 caractères maximum 20, avec un majuscule, un minuscule, un chiffre et un symbole).


## Technologies utilisés

* serveur : NodeJS ;
* framework : Express ;
* base de données : MySQL;
* Angular CLI
* Vue.js

## Procédure

1. Cloner le projet.
2. Installez @angular/cli globalement 
3. Exécutez npm install.
4. Exécutez nodemon serve pour le back-end.
5. Exécutez npm run serve pour le front-end.
6. Le front-end est visible sur http://localhost:8080.
7. Le back-end est visible sur le port 3000.
