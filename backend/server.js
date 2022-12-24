//Création du serveur qui va écouter la requette http et qui va y répondre à cette requête :
const http = require('http');//Importation du http package node
const app = require('./app');//Importation de notre application


const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3001');//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
app.set('port', port);//On doit dir à l'application express sur quel port elle va tourner

//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
    process.exit(1);
    break;
  default:
    throw error;
  }
};

//Création du serveur
//On passe à notre serveur l'appliquation (app) car cette une fonction qui vas reçevoir la requette et la réponse et qui va les modifier
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);//L'écoute du serveur à les requêtes envoyées 