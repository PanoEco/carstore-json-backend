const express = require("express");
const auth = require("./authMiddleware");
const data = require("./data.json");

const app = express();

// Parse incoming JSON
app.use(express.json());

// Authentication middleware
app.use(auth);

// ✅ Prefix routes with `/api` to match frontend
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/orders", (req, res) => {
  res.json(data.orders || []);
});

// Default fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Use Render port binding
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});
