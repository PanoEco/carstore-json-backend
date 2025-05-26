module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/login") {
      if (req.body.name === "admin" && req.body.password === "secret") {
        res.status(200).json({
          success: true,
          token: "dummy-jwt-token"
        });
      } else {
        res.status(200).json({ success: false });
      }
    } else {
      next();
    }
  };
  