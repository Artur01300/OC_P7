const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000
app.use(bodyParser.json());


//  **************   Connection MySQL ******************************* 

const sqlCon = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'MY20/20hay@',
  DB: "groupomania",
  port: 3306,
});


sqlCon.connect(function(err) {
    if (err) throw err;
    sqlCon.query("SELECT * FROM groupomania.users email", function (err, result) 
    {
      if (err) throw err;
      console.log(result);
    });
});




app.post('/', function(req, res){//res  = send 'Hello Alexi / req = resive

    res.status(201).json({
    message: 'Objet créé !'
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});