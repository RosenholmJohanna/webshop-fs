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

const crypto = require("crypto");
  function hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}


// REGISTER NEW USER --> hash password
app.post("/register", function (req, res) {
    if (!(req.body && req.body.username && req.body.password && req.body.name && req.body.email)) {
      res.status(400).send({
        success: false,
        error: "Name, username & password is required!"
      });
      return;
    }
  
    let fields = ["name", "password", "username", "email"];
    for (let key in req.body) {
      if (!fields.includes(key)) {
        res.status(400).send({
          success: false,
          error: "Unknown field: " + key
        });
        return;
      }
    }
  
    let sql = `
      INSERT INTO users (username, name, email, password)
      VALUES ('${req.body.username}', '${req.body.name}', '${req.body.email}', '${hash(req.body.password)}');
      SELECT LAST_INSERT_ID();`;
  
    console.log(sql);
  
    db.query(sql, function (err, result, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          error: "Server Error"
        });
        return;
      }
      res.status(200).json({ success: true, });
    });
  });


  // GET USERS
app.get("/users", function (req, res) {
    let authHeader = req.headers["authorization"];
    if (authHeader === undefined) {
  
      res.sendStatus(400);
      return;
    }
    let token = authHeader.slice(7);
  
    let decoded;
    try {
      decoded = jwt.verify(token, "EnHemlighetXyz123%&/");
    } catch (err) {
      console.log(err);
      res.status(401).send("Invalid auth token");
      return;
    }
  
    let sql = "SELECT * FROM users";
    console.log(sql);
  
    db.query(sql, function (err, result, fields) {
      res.send(result);
    });
  });
  
  