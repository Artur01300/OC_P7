const mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'MY20/20hay@',
    database : 'groupomania',
    port: '3306'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Connection réussi");
});

module.exports = connection;
