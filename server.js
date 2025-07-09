require("dotenv").config(); // 👈 Must be very first

const express = require("express");
const cors = require("cors"); // <== ✅ Add this

const app = express();
const db = require("./db.js");

const PORT = process.env.PORT || 5000; // ✅ Define early

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:1234", // or "*", but be cautious for security
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes (Uncomment if needed later)
const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Auth API is running on port " + PORT); // ✅ use PORT
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
// mongodb+srv://rohitshar0801:<db_password>@foodie.bodhu.mongodb.net/
//new //mongodb+srv://rohitshar0801:rohit@123@foodie.bodhu.mongodb.net/
