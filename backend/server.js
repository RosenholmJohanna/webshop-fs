const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/webshop";
mongoose.connect(mongoUrl).then(() => {
  console.log("Connected to the Database successfully");
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My webbshop project");
});

// SCHEMAS; putting user schemas here due module can't be resolved..
// USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlenght: 3,
  },
  address: String,
  city: String,
  country: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const User = mongoose.model("User", UserSchema);



// PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

//module.exports = mongoose.model("Product", productSchema);
const Product = mongoose.model("Product", productSchema);

// USER LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
         //accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
});

// USER REGISTRATION
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 3) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 3 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      //console.log(newUser);
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          //accessToken: newUser.accessToken,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
    });
  }
});

 //GET PRODUCTS
 app.get("/products", async (req, res)=> {
  const products = await Product.find({});
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No products found."
    });
  }
  res.status(200).json({
    success: true,
    message: "All products", 
    response: products
  }); 
});

// CREATE PRODUCTS
app.post("/products", async (req, res) => {
  try {
    // Assuming req.body contains an array of product objects
    const products = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Products added successfully",
      products: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add products",
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});























// previous for mysql

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// const mysql = require("mysql");
// const cors = require('cors');
// //const listEndpoints = require("express-list-endpoints")
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const port = 8080;
// // enable CORS for requests
// app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(express.json())

// const httpServer = app.listen(port, function () {
//   console.log(`Web server is running on port ${port}`);
// });

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "webshop_app",
//   multipleStatements: true,
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected to the database!");
// });

// const crypto = require("crypto");
//   function hash(data) {
//   const hash = crypto.createHash("sha256");
//   hash.update(data);
//   return hash.digest("hex");
// }

// // REGISTER NEW USER --> hash password
// app.post("/register", function (req, res) {
//     if (!(req.body && req.body.username && req.body.password)) {
//       res.status(400).send({
//         success: false,
//         error: "Name, username & password is required!"
//       });
//       return;
//     }

//     let fields = [ "password", "username"];
//     for (let key in req.body) {
//       if (!fields.includes(key)) {
//         res.status(400).send({
//           success: false,
//           error: "Unknown field: " + key
//         });
//         return;
//       }
//     }

//     let sql = `
//       INSERT INTO users (username, password)
//       VALUES ('${req.body.username}', '${hash(req.body.password)}');
//       SELECT LAST_INSERT_ID();`;

//     console.log(sql);

//     db.query(sql, function (err, result, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({
//           success: false,
//           error: "Server Error"
//         });
//         return;
//       }
//       res.status(200).json({ success: true, });
//     });
//   });

//   // GET USERS
// app.get("/users", function (req, res) {
//     let authHeader = req.headers["authorization"];
//     if (authHeader === undefined) {

//       res.sendStatus(400);
//       return;
//     }
//     let token = authHeader.slice(7);

//     let decoded;
//     try {
//       decoded = jwt.verify(token, "EnHemlighetXyz123%&/");
//     } catch (err) {
//       console.log(err);
//       res.status(401).send("Invalid auth token");
//       return;
//     }

//     let sql = "SELECT * FROM users";
//     console.log(sql);

//     db.query(sql, function (err, result, fields) {
//       res.send(result);
//     });
//   });

// // Might use for later
// // const corsOptions = {
// //   origin: 'http://127.0.0.1:5173', // allow requests from this origin
// // };
// // app.use(cors(corsOptions));

// //import express from "express";
// import cors from "cors";
// import bcrypt from 'bcrypt';
// import mongoose from "mongoose";
// import crypto from "crypto";

// accessToken: {
//   type: String,
//   default: () => crypto.randomBytes(128).toString("hex")
// },