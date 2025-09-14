const express = require("express");
const cors = require("cors");

const app = express();
const { connectDB } = require("./utils/db");
const { port } = require("./utils/config");
const userRoutes = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

connectDB();

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
