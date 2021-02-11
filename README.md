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

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

Pour accéder aux sauces: **créer un compte**, mettre un **mot de passe fort** (minimum 8 caractères avec des **majuscules**, **minuscules**,
**deux chiffres** et **un symbole**).


## Technologies à utilisés

* framework : Express ;
* serveur : NodeJS ;
* base de données : MysSQL;


## Procédure

1. Cloner le projet.
2. Installez @angular/cli globalement 
3. Exécutez npm install pour le backend et forntend.
4. Exécutez npm start pour le back-end.
5. Exécution de l’API sur http://localhost:3000.
6. Exécutez ng serve pour le front-end sur http://localhost:4200/.