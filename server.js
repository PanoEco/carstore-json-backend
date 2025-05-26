const express = require("express");
const cors = require("cors");
const auth = require("./authMiddleware");
const data = require("./data.json");

const app = express();

// ✅ Enable CORS for frontend
app.use(cors());

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Auth middleware (handles login)
app.use(auth);

// ✅ Routes
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/orders", (req, res) => {
  res.json(data.orders || []);
});

app.post("/api/orders", (req, res) => {
  const newOrder = { ...req.body, id: data.orders.length + 1 };
  data.orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.post("/api/products", (req, res) => {
  const newProduct = { ...req.body, id: data.products.length + 1 };
  data.products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const index = data.products.findIndex(p => p.id === +req.params.id);
  if (index !== -1) {
    data.products[index] = req.body;
    res.json(req.body);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const index = data.products.findIndex(p => p.id === +req.params.id);
  if (index !== -1) {
    const deleted = data.products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.put("/api/orders/:id", (req, res) => {
  const index = data.orders.findIndex(o => o.id === +req.params.id);
  if (index !== -1) {
    data.orders[index] = req.body;
    res.json(req.body);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

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
