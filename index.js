const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const http = require("http");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const leaveRoute = require("./routes/leaveRoute");
const assetRoute = require("./routes/assetRoute");
const contactUsRoute = require("./routes/contactUsRoute");

const app = express();

require("./config/db");

// const httpsPort = process.env.HTTPS_PORT || 443;
// const httpPort = process.env.HTTP_PORT || 81;

// Enable CORS
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/user", userRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/asset", assetRoute);
app.use("/api/contactUs", contactUsRoute);

// SSL/TLS certificates
// const options = {
//   key: fs.readFileSync("/path/to/your/privkey.pem"),
//   cert: fs.readFileSync("/path/to/your/fullchain.pem"),
//   // Uncomment the following line if you have an intermediate certificate
//   // ca: fs.readFileSync("/path/to/your/chain.pem")
// };

const options = {
  key: fs.readFileSync(
    "/home/systaldyn.in/public_html/systaldyn-backend/cert/key.pem"
  ),
  cert: fs.readFileSync(
    "/home/systaldyn.in/public_html/systaldyn-backend/cert#/cert.pem"
  ),
};

https.createServer(options, app).listen(443, () => {
  console.log("Server running on port 443");
});

// HTTPS server
// https.createServer(options, app).listen(httpsPort, () => {
//   console.log(`HTTPS Server running on port ${httpsPort}`);
// });

// Optional: Redirect HTTP to HTTPS
// http
//   .createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
//   })
//   .listen(httpPort, () => {
//     console.log(
//       `HTTP Server running on port ${httpPort} and redirecting to HTTPS`
//     );
//   });

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

// // const options = {
// //   key: fs.readFileSync("/etc/letsencrypt/live/your_domain.com/privkey.pem"),
// //   cert: fs.readFileSync("/etc/letsencrypt/live/your_domain.com/fullchain.pem"),
// // };

// // https.createServer(options, app).listen(6001, () => {
// //   console.log("Server is running on https://your_domain.com:6001");
// // });

// // app.listen(port, () => {
// //   console.log("Server running on Port 6001");
// // });

// // Optional: Redirect HTTP to HTTPS
// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
//   })
//   .listen(80, () => {
//     console.log("HTTP Server running on port 80 and redirecting to HTTPS");
//   });
