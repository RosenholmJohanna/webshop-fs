const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


const port =8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json())

const httpServer = app.listen(port, function () {
    console.log(`Web server is running on port ${port}`);
  });
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webshop-app",
    multipleStatements: true,
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to the database!");
  });