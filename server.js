const express = require("express");
const auth = require("./authMiddleware");
const data = require("./data.json");
const cors = require("cors"); // ✅ Add this line

const app = express();

app.use(cors()); // ✅ Enable CORS for all routes
app.use(express.json());
app.use(auth);

// ✅ API routes
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

// fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});
