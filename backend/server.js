const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No products found.",
    });
  }
  res.status(200).json({
    success: true,
    message: "All products",
    response: products,
  });
});

// CREATE PRODUCTS
app.post("/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Products added successfully",
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add products",
      error: err.message,
    });
  }
});

// PRODUCT BY ID
app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ 
          success: false,
          message: "Product by ID not found"
         });
    }

    res.status(200).json({ 
      success: true, 
      product 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" });
  }
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

