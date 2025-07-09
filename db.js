const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ MongoDB Connected Successfully");
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = mongoose;
