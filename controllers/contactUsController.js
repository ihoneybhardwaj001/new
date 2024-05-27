const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactUs = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    businessEmail,
    phoneNumber,
    country,
    message,
  } = req.body;

  if (!firstName || !businessEmail || !message) {
    console.log("Validation error: Missing required fields.");
    return res.status(400).json({
      success: false,
      message: "Please provide required fields",
    });
  }

  try {
    console.log("Incoming contact request:", req.body);

    const msg = {
      to: "shivanshupanwar19@gmail.com",
      from: process.env.EMAIL, // Use your verified sender
      subject: `Contact Form Submission from ${companyName}`,
      html: `
        <p>First Name: ${firstName}</p>
        <p>Last Name: ${lastName}</p>
        <p>Company Name: ${companyName}</p>
        <p>Business Email: ${businessEmail}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Country: ${country}</p>
        <p>Message:</p>
        <p>${message}</p>
      `,
    };

    console.log("Mail options:", msg);

    const info = await sgMail.send(msg);
    console.log("Email sent successfully:", info);

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Error in sending mail",
    });
  }
};

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// function generateMailTransporter() {
//   return nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
// }

// exports.contactUs = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     companyName,
//     businessEmail,
//     phoneNumber,
//     country,
//     message,
//   } = req.body;

//   if (!firstName || !businessEmail || !message) {
//     console.log("Validation error: Missing required fields.");
//     return res.status(400).json({
//       success: false,
//       message: "Please provide required fields",
//     });
//   }

//   try {
//     // Log the incoming request data
//     console.log("Incoming contact request:", req.body);

//     let transport = generateMailTransporter();

//     // Log transporter details
//     console.log("Mailer transporter created.");

//     // Sending mail
//     const mailOptions = {
//       from: process.env.EMAIL, // Use a verified email address
//       to: "shivanshupanwar19@gmail.com",
//       subject: `Contact Form Submission from ${companyName}`,
//       html: `
//         <p>Name: ${firstName} ${lastName}</p>
//         <p>Company Name: ${companyName}</p>
//         <p>Business Email: ${businessEmail}</p>
//         <p>Phone Number: ${phoneNumber}</p>
//         <p>Country: ${country}</p>
//         <p>Message:</p>
//         <p>${message}</p>
//       `,
//     };

//     // Log mail options
//     console.log("Mail options:", mailOptions);

//     const info = await transport.sendMail(mailOptions);

//     // Log response from nodemailer
//     console.log("Email sent: ", info.response);

//     return res.status(200).json({
//       success: true,
//       message: "Mail sent successfully!",
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in sending mail",
//     });
//   }
// };
