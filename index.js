const express = require("express");
const app = express();
const port = 3000;

// Use JSON middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/products");
});

// Sample data: 5 initial products
let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "A comfortable wireless mouse with long battery life.",
    price: 25.99,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    description: "A portable speaker with excellent sound quality.",
    price: 55.5,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Water Bottle",
    description: "A 500ml water bottle made of stainless steel.",
    price: 18.2,
    category: "Home & Kitchen",
  },
  {
    id: 4,
    name: "Running Shoes",
    description: "Lightweight running shoes for all terrains.",
    price: 75.0,
    category: "Sports",
  },
  {
    id: 5,
    name: "Desk Lamp",
    description:
      "An adjustable LED desk lamp with multiple brightness settings.",
    price: 30.0,
    category: "Home & Office",
  },
];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET a product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST a new product (Create)
app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id =
    products.length > 0 ? products[products.length - 1].id + 1 : 1; // Auto-increment ID
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT (Full Update) an existing product by ID
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    products[index] = { id: productId, ...req.body }; // Replace the product entirely
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// PATCH (Partial Update) an existing product by ID
app.patch("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    Object.assign(product, req.body); // Merge updated fields into the product
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// DELETE a product by ID
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    products.splice(index, 1); // Remove the product from the list
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Product API is running at http://localhost:${port}`);
});
