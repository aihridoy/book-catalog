// server.js
const express = require("express");
const app = express();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Express server is running on port 8000 🚀");
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
