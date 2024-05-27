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
    return res.status(400).json({
      success: false,
      message: "Please provide required fields",
    });
  }

  try {
    // send to user
    let transport = generateMailTransporter();

    // sending mail
    await transport.sendMail({
      from: process.env.EMAIL, // Use a verified email address
      to: "shivanshupanwar19@gmail.com",
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
    });

    // sending response
    return res.status(200).json({
      success: true,
      message: "Mail sent successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sending mail",
    });
  }
};
