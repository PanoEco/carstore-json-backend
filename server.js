const express = require("express");
const auth = require("./authMiddleware");
const data = require("./data.json");

const app = express();

// Parse incoming JSON
app.use(express.json());

// Authentication middleware
app.use(auth);

// Example route to get products
app.get("/products", (req, res) => {
  res.json(data.products);
});

// Default fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Use PORT environment variable (Render requires this)
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});

