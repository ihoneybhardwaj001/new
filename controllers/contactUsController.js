const nodemailer = require("nodemailer");
require("dotenv").config();

function generateMailTransporter() {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

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
    // Log the incoming request data
    console.log("Incoming contact request:", req.body);

    let transport = generateMailTransporter();

    // Log transporter details
    console.log("Mailer transporter created.");

    // Sending mail
    const mailOptions = {
      from: process.env.EMAIL, // Use a verified email address
      to: "shivanshupanwar19@gmail.com",
      subject: `Contact Form Submission from ${companyName}`,
      html: `
        <p>Name: ${firstName} ${lastName}</p>
        <p>Company Name: ${companyName}</p>
        <p>Business Email: ${businessEmail}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Country: ${country}</p>
        <p>Message:</p>
        <p>${message}</p>
      `,
    };

    // Log mail options
    console.log("Mail options:", mailOptions);

    const info = await transport.sendMail(mailOptions);

    // Log response from nodemailer
    console.log("Email sent: ", info.response);

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

// const { generateMailTransporter } = require("../utils/mail");

// exports.contactUs = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       companyName,
//       businessEmail,
//       phoneNumber,
//       country,
//       message,
//     } = req.body;

//     if (!firstName || !businessEmail || !message) {
//       console.log("Validation error: Missing required fields.");
//       return res.status(400).json({
//         success: false,
//         message: "Please provide required fields",
//       });
//     }

//     let transport = await generateMailTransporter();

//     // sending mail
//     const response = await transport.sendMail({
//       from: process.env.EMAIL,
//       to: `shivanshupanwar19@gmail.com`,
//       subject: `Contact Form Submission from ${companyName}`,
//       html: `
//       <p>First Name: ${firstName}</p>
//       <p>Last Name: ${lastName}</p>
//       <p>Company Name: ${companyName}</p>
//       <p>Business Email: ${businessEmail}</p>
//       <p>Phone Number: ${phoneNumber}</p>
//       <p>Country: ${country}</p>
//       <p>Message:</p>
//       <p>${message}</p>
//       `,
//     });

//     // console.log(response);

//     // sending response
//     // return res.status(201).json({
//     //   success: true,
//     //   user: {
//     //     id: newUser._id,
//     //     name: newUser.name,
//     //     email: newUser.email,
//     //   },
//     // });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in sending mail",
//     });
//   }
// };
