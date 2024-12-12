require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const app = express();

connectDB();

app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;