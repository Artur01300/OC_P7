const mysql = require("mysql");

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MY20/20hay@',
    database: "groupomania",
    port: 3306,
});

connection.connect(error => {
    if (error) throw error;
    console.log("MySQL connecté");
});

module.exports = connection;
