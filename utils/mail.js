const nodemailer = require("nodemailer");

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });
