const express = require("express");

const cors = require("cors");

const fs = require("fs");

const https = require("https");

require("dotenv").config();

const userRoute = require("./routes/userRoute");

const leaveRoute = require("./routes/leaveRoute");

const assetRoute = require("./routes/assetRoute");

const contactUsRoute = require("./routes/contactUsRoute");

const app = express();

require("./config/db");

const port = process.env.PORT || 6001;

// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/leave", leaveRoute);

app.use("/api/asset", assetRoute);

app.use("/api/contactUs", contactUsRoute);

app.listen(port, () => {
  console.log("Server running on Port 6001");
});

// const options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/your_domain.com/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/your_domain.com/fullchain.pem"),
// };

// https.createServer(options, app).listen(6001, () => {
//   console.log("Server is running on https://your_domain.com:6001");
// });

// Optional: Redirect HTTP to HTTPS
// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
//   })
//   .listen(80, () => {
//     console.log("HTTP Server running on port 80 and redirecting to HTTPS");
//   });
