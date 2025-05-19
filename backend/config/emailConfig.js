import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '82fb17001@smtp-brevo.com', // Your Brevo SMTP username/login
    pass: process.env.SMTP_PASSWORD // This should be stored in environment variables
  }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP verification error:', error);
  } else {
    console.log('SMTP server is ready to send messages');
  }
});

/**
 * Send email function
 * @param {Object} mailOptions - email options
 * @param {string} mailOptions.to - Recipient email
 * @param {string} mailOptions.subject - Email subject
 * @param {string} mailOptions.text - Plain text content
 * @param {string} mailOptions.html - HTML content
 * @returns {Promise} - Promise with sending result
 */
export const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"EventFlow" <notifications@eventflow.com>',
      ...mailOptions
    });
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default {
  sendEmail,
  transporter
};
