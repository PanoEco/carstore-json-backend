const express = require("express");
const auth = require("./authMiddleware");
const data = require("./data.json");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for frontend access
app.use(cors());

// ✅ Middleware for parsing JSON
app.use(express.json());

/**
 * ✅ Allow login without token
 * This MUST come before the auth middleware
 */
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

// ✅ Add auth middleware AFTER login route
app.use(auth);

// ✅ API routes
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/orders", (req, res) => {
  res.json(data.orders || []);
});

app.post("/api/orders", (req, res) => {
  const newOrder = {
    ...req.body,
    id: data.orders.length + 1
  };
  data.orders.push(newOrder);
  res.status(201).json(newOrder);
});

// ✅ Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ JSON backend running on port ${port}`);
});
