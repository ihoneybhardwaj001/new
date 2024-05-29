const express = require("express");

const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/userRoute");

const leaveRoute = require("./routes/leaveRoute");

const assetRoute = require("./routes/assetRoute");

const contactUsRoute = require("./routes/contactUsRoute");

const app = express();

require("./config/db");

const port = process.env.PORT || 2024;

// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/leave", leaveRoute);

app.use("/api/asset", assetRoute);

app.use("/api/contactUs", contactUsRoute);

app.listen(port, () => {
  console.log("Server running on Port 2024");
});
