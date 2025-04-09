const nodemailer = require('nodemailer')

const sendEmail = async options => {
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },        
    };

    const transporter = nodemailer.createTransport(transport);

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

   await transporter.sendMail(message)
}

/* const nodemailer = require('nodemailer'); */

// Create a transporter using SMTP transport
/* let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com', // Your email address
    pass: 'your_password' // Your email password
  }
});

// Generate a unique token for password reset (you'll need to implement this)
const resetToken = 'unique_token_here';

// Define the email options
let mailOptions = {
  from: 'your.email@gmail.com', // Sender address
  to: 'recipient@example.com', // Recipient address
  subject: 'Password Reset', // Subject line
  html: `
    <p>Dear User,</p>
    <p>You have requested to reset your password. Click the link below to reset:</p>
    <a href="http://localhost:3000/reset/${resetToken}">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Regards,<br>Your App Team</p>
  `
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
}); */


module.exports = sendEmail