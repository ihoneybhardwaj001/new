const express = require("express");
// const fs = require("fs");
// const https = require("https");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const leaveRoute = require("./routes/leaveRoute");
const assetRoute = require("./routes/assetRoute");
const contactUsRoute = require("./routes/contactUsRoute");

const app = express();
require("./config/db");

const port = process.env.PORT || 6001;

// SSL/TLS certificates
// const options = {
//   key: fs.readFileSync("C:/Users/asus/key.pem"),
//   cert: fs.readFileSync("C:/Users/asus/cert.pem"),
// };

// Middleware to check the origin of incoming requests
// const allowOnlyFromFrontend = (req, res, next) => {
//   const allowedOrigin = "http://systaldyn.in"; // Replace with your frontend URL
//   const origin = req.headers.origin;
//   if (origin === allowedOrigin) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, OPTIONS"
//     ); // Add OPTIONS method
//     next();
//   } else {
//     res.status(403).json({ error: "Unauthorized" });
//   }
// };

app.use(express.json());

// Apply the middleware to all routes
// app.use(allowOnlyFromFrontend);

// Handle OPTIONS requests separately
// app.options("*", (req, res) => {
//   res.sendStatus(200);
// });

// Enable CORS
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/asset", assetRoute);
app.use("/api/contactUs", contactUsRoute);

app.listen(port, () => {
  console.log("Server running on Port 6001");
});

// HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log(`Server running on https://localhost:${port}`);
// });

// const express = require("express");

// const cors = require("cors");

// const fs = require("fs");

// const https = require("https");

// require("dotenv").config();

// const userRoute = require("./routes/userRoute");

// const leaveRoute = require("./routes/leaveRoute");

// const assetRoute = require("./routes/assetRoute");

// const contactUsRoute = require("./routes/contactUsRoute");

// const app = express();

// require("./config/db");

// const port = process.env.PORT || 6001;

// // Enable CORS
// app.use(cors());

// app.use(express.json());

// app.use("/api/user", userRoute);

// app.use("/api/leave", leaveRoute);

// app.use("/api/asset", assetRoute);

// app.use("/api/contactUs", contactUsRoute);

// app.listen(port, () => {
//   console.log("Server running on Port 6001");
// });
