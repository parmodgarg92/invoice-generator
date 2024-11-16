const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("./config/database");

dotenv.config();
mongooseDB();

const app = express();
app.use(express.json());

// Sample route
app.get("/", (req, res) => res.send("API is running..."));

// Load routes
app.use("/api/users", require("./routes/user"));
app.use("/api/invoice", require("./routes/invoice"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
