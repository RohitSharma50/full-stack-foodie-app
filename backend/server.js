require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./db.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:1234", // frontend dev server

  "https://full-stack-foodie-app-1.onrender.com", // production
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
