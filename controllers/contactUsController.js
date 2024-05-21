const nodeMailer = require("nodemailer");

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
        user: "shiavnshupanwar19@gmail.com", // Replace with your email,
        pass: "fbez wjez fwlp bnxo", // Replace with your password or app-specific password
      },
    });

    // Email options

    const mailOptions = {
      form: businessEmail,
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
    return res.status(500).json({
      success: false,
      message: "Error in sending email",
    });
  }
};
