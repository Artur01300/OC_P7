//limite les nombre de requête
const rateLimit = require('express-rate-limit');

const createLimiter = rateLimit({
    windowMs: 1 * 60* 1000, //1 minutes
    max: 30, //limite chaque IP à 30 requêtes par fenêtre
    message: "Veuillez réessayer dans une minute",
});

module.exports = createLimiter;