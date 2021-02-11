const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
    host : 'localhost',
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect(error => {
    if (error) throw error;
    console.log("MySQL connecté");
});

module.exports = connection;
