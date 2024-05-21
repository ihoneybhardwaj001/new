const nodeMailer = require("nodemailer");

require("dotenv").config();

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
    // set up the email transporter using SMTP
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Replace with your email,
        pass: process.env.EMAIL_PASS, // Replace with your password or app-specific password
      },
    });

    // Email options

    const mailOptions = {
      from: businessEmail,
      to: "shiavnshupanwar19@gmail.com", // Replace with your email
      subject: `Contact Form Submission from ${companyName}`,
      text: `First Name : ${firstName}\nLast Name: ${lastName}\nCompany Name: ${companyName}\nBussiness Email: ${businessEmail}\nPhone Number : ${phoneNumber}\nCountry : ${country}\n\nMessage : \n${message}`,
    };

    // send the email

    await transporter.sendMail(mailOptions);

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error in sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Error in sending email",
    });
  }
};
