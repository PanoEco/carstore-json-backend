const express = require("express");
const cors = require("cors");
const auth = require("./authMiddleware");
const data = require("./data.json");

const app = express();

// ✅ Enable CORS for frontend
app.use(cors());

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Login route (must be BEFORE auth middleware)
app.post("/api/login", (req, res) => {
  if (req.body.name === "admin" && req.body.password === "secret") {
    res.status(200).json({
      success: true,
      token: "dummy-jwt-token"
    });
  } else {
    res.status(200).json({ success: false });
  }
});

// ✅ Use auth middleware for everything else
app.use(auth);

// ✅ GET all products
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

// ✅ GET all orders
app.get("/api/orders", (req, res) => {
  res.json(data.orders || []);
});

// ✅ POST a new order
app.post("/api/orders", (req, res) => {
  const newOrder = { ...req.body, id: data.orders.length + 1 };
  data.orders.push(newOrder);
  res.status(201).json(newOrder);
});

// ✅ POST a new product
app.post("/api/products", (req, res) => {
  const newProduct = { ...req.body, id: data.products.length + 1 };
  data.products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT update product
app.put("/api/products/:id", (req, res) => {
  const index = data.products.findIndex(p => p.id === +req.params.id);
  if (index !== -1) {
    data.products[index] = req.body;
    res.json(req.body);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// ✅ DELETE product
app.delete("/api/products/:id", (req, res) => {
  const index = data.products.findIndex(p => p.id === +req.params.id);
  if (index !== -1) {
    const deleted = data.products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// ✅ PUT update order
app.put("/api/orders/:id", (req, res) => {
  const index = data.orders.findIndex(o => o.id === +req.params.id);
  if (index !== -1) {
    data.orders[index] = req.body;
    res.json(req.body);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// ✅ DELETE order
app.delete("/api/orders/:id", (req, res) => {
  const index = data.orders.findIndex(o => o.id === +req.params.id);
  if (index !== -1) {
    const deleted = data.orders.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// ✅ Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Port binding for Render
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});
