require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./db.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:1234",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Auth API is running on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
