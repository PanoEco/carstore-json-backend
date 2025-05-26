const express = require("express");
const auth = require("./authMiddleware");
const data = require("./data.json");

const app = express();
app.use(express.json());
app.use(auth);

// ✅ Correct route prefix
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/orders", (req, res) => {
  res.json(data.orders || []);
});

// Default fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Render-required port binding
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});
