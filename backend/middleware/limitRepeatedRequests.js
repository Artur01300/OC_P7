//limite les nombre de requête
const rateLimit = require('express-rate-limit');

const createLimiter = rateLimit({
    windowMs: 1 * 60* 1000, //1 minutes
    max: 20, //limite chaque IP à 20 requêtes par fenêtre
    statusCode: 403 //Forbidden
    // message: "Veuillez réessayer dans une minute",
});

module.exports = createLimiter;