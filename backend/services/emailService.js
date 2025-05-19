import { sendEmail } from '../config/emailConfig.js';

/**
 * Generate base email template
 * @param {string} content - HTML content for the email body
 * @returns {string} - Complete HTML email template
 */
const generateEmailTemplate = (content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EventFlow</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; color: #1f2937;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 20px; margin-bottom: 20px;">
        <tr>
          <td style="background: linear-gradient(to right, #4f46e5, #6366f1); padding: 20px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">EventFlow</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
            <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} EventFlow. All rights reserved.</p>
            <p style="margin: 0;">If you have any questions, please contact our support team.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Send an event registration confirmation email
 * @param {Object} registration - Registration data
 * @param {Object} user - User data
 * @param {Object} event - Event data
 */
export const sendRegistrationConfirmation = async (registration, user, event) => {
  try {
    const formattedStartDate = new Date(event.startDateTime).toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });
    
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 20px; font-weight: 600;">Registration Confirmed! 🎉</h2>
        <p style="margin-bottom: 25px; font-size: 16px;">Hello ${user.name},</p>
        
        <p style="margin-bottom: 25px; font-size: 16px;">Your registration for <strong>${event.title}</strong> has been confirmed.</p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">📅 Event Details</h3>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Date & Time:</strong> ${formattedStartDate}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Location:</strong> ${event.location}</p>
        </div>
        
        <p style="margin-bottom: 25px; font-size: 16px;">We're looking forward to seeing you there!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/events/${event._id}" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 500; display: inline-block;">View Event Details</a>
        </div>
        
        <p style="margin-top: 30px; font-size: 16px;">Thanks,<br />The EventFlow Team</p>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: `Registration Confirmed: ${event.title}`,
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nYour registration for ${event.title} has been confirmed.\n\nEvent Details:\nDate & Time: ${formattedStartDate}\nLocation: ${event.location}\n\nWe're looking forward to seeing you there!\n\nThanks,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending registration confirmation email:', error);
  }
};

/**
 * Send an event reminder email
 * @param {Object} user - User data
 * @param {Object} event - Event data
 */
export const sendEventReminder = async (user, event) => {
  try {
    const formattedStartDate = new Date(event.startDateTime).toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });
    
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 20px; font-weight: 600;">⏰ Event Reminder: Tomorrow!</h2>
        <p style="margin-bottom: 25px; font-size: 16px;">Hello ${user.name},</p>
        
        <p style="margin-bottom: 25px; font-size: 16px;">This is a friendly reminder that <strong>${event.title}</strong> is scheduled for tomorrow.</p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">📅 Event Details</h3>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Date & Time:</strong> ${formattedStartDate}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Location:</strong> ${event.location}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/events/${event._id}" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 500; display: inline-block;">View Event Details</a>
        </div>
        
        <p style="margin-bottom: 25px; font-size: 16px;">We're looking forward to seeing you there!</p>
        <p style="margin-top: 30px; font-size: 16px;">Thanks,<br />The EventFlow Team</p>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: `Reminder: ${event.title} - Tomorrow`,
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nThis is a friendly reminder that ${event.title} is scheduled for tomorrow.\n\nEvent Details:\nDate & Time: ${formattedStartDate}\nLocation: ${event.location}\n\nWe're looking forward to seeing you there!\n\nThanks,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending event reminder email:', error);
  }
};

/**
 * Send a notification to event organizer when someone registers
 * @param {Object} organizer - Organizer user data
 * @param {Object} user - Registered user data
 * @param {Object} event - Event data
 */
export const notifyOrganizerOfRegistration = async (organizer, user, event) => {
  try {
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 20px; font-weight: 600;">🎟️ New Event Registration</h2>
        <p style="margin-bottom: 25px; font-size: 16px;">Hello ${organizer.name},</p>
        
        <p style="margin-bottom: 25px; font-size: 16px;">A new user has registered for your event <strong>${event.title}</strong>.</p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">👤 Registrant Details</h3>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Name:</strong> ${user.name}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Email:</strong> ${user.email}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Department:</strong> ${user.department || 'Not specified'}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/events/${event._id}/registrations" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 500; display: inline-block;">View All Registrations</a>
        </div>
        
        <p style="margin-top: 30px; font-size: 16px;">Thanks,<br />The EventFlow Team</p>
      </div>
    `;
    
    await sendEmail({
      to: organizer.email,
      subject: `New Registration for ${event.title}`,
      html: generateEmailTemplate(content),
      text: `Hello ${organizer.name},\n\nA new user has registered for your event ${event.title}.\n\nRegistrant Details:\nName: ${user.name}\nEmail: ${user.email}\nDepartment: ${user.department || 'Not specified'}\n\nYou can view all registrations in your event dashboard.\n\nThanks,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending organizer notification email:', error);
  }
};

/**
 * Send certificate of attendance email
 * @param {Object} user - User data
 * @param {Object} event - Event data
 * @param {string} certificateUrl - URL to the certificate PDF
 */
export const sendCertificateEmail = async (user, event, certificateUrl) => {
  try {
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 20px; font-weight: 600;">🎓 Your Certificate of Attendance</h2>
        <p style="margin-bottom: 25px; font-size: 16px;">Hello ${user.name},</p>
        
        <p style="margin-bottom: 25px; font-size: 16px;">Thank you for attending <strong>${event.title}</strong>!</p>
        
        <p style="margin-bottom: 25px; font-size: 16px;">We've attached your certificate of attendance to this email. You can also download it using the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${certificateUrl}" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 500; display: inline-block;">Download Certificate</a>
        </div>
        
        <p style="margin-bottom: 25px; font-size: 16px;">We hope you enjoyed the event and look forward to seeing you at future events!</p>
        
        <p style="margin-top: 30px; font-size: 16px;">Thanks,<br />The EventFlow Team</p>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: `Your Certificate of Attendance - ${event.title}`,
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nThank you for attending ${event.title}!\n\nYou can download your certificate of attendance using this link: ${certificateUrl}\n\nWe hope you enjoyed the event and look forward to seeing you at future events!\n\nThanks,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending certificate email:', error);
  }
};

/**
 * Send notification when user moves from waitlist to registered
 * @param {Object} user - User data
 * @param {Object} event - Event data
 */
export const sendWaitlistToRegisteredNotification = async (user, event) => {
  try {
    const formattedStartDate = new Date(event.startDateTime).toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });
    
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5; font-size: 28px; margin-bottom: 25px; font-weight: 700; text-align: center;">Good News! You're In! 🎟️</h2>
        
        <div style="background: linear-gradient(45deg, #f9fafb, #f3f4f6); border-radius: 12px; padding: 30px; margin: 30px 0; border: 1px solid #e5e7eb; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
          <p style="margin-bottom: 20px; font-size: 18px; color: #111827; font-weight: 500;">Hello ${user.name},</p>
          
          <p style="margin-bottom: 25px; font-size: 16px; line-height: 1.6; color: #374151;">
            A spot has opened up for <strong style="color: #4f46e5;">${event.title}</strong> and you've been 
            <span style="background: linear-gradient(to right, #4f46e5, #6366f1); color: transparent; -webkit-background-clip: text; background-clip: text; font-weight: 700;">moved from the waitlist to registered!</span>
          </p>
          
          <div style="background-color: white; border-left: 6px solid #4f46e5; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
            <h3 style="color: #1f2937; font-size: 20px; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center;">
              <span style="margin-right: 10px;">📅</span> Event Details
            </h3>
            <p style="margin: 12px 0; font-size: 16px; color: #4b5563;"><strong>Date & Time:</strong> ${formattedStartDate}</p>
            <p style="margin: 12px 0; font-size: 16px; color: #4b5563;"><strong>Location:</strong> ${event.location}</p>
          </div>
          
          <p style="margin: 25px 0; font-size: 16px; line-height: 1.6; color: #374151; font-style: italic;">We're looking forward to seeing you there!</p>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/events/${event._id}" 
             style="background: linear-gradient(to right, #4f46e5, #6366f1); color: white; text-decoration: none; 
                    padding: 14px 28px; border-radius: 50px; font-weight: 600; display: inline-block; font-size: 16px;
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); transition: all 0.3s ease;">
            View Event Details →
          </a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin-top: 25px; font-size: 16px; color: #6b7280; text-align: center;">Thanks,<br /><strong>The EventFlow Team</strong></p>
        </div>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: `You're In! Registration Confirmed for ${event.title}`,
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nGood news! A spot has opened up for ${event.title} and you've been moved from the waitlist to registered.\n\nEvent Details:\nDate & Time: ${formattedStartDate}\nLocation: ${event.location}\n\nWe're looking forward to seeing you there!\n\nThanks,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending waitlist notification email:', error);
  }
};

/**
 * Send welcome email to newly registered users
 * @param {string} name - User's name
 * @param {string} email - User's email
 */
export const sendWelcomeEmail = async (name, email) => {
  try {
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 28px; margin-bottom: 20px; font-weight: 700;">Welcome to EventFlow! 👋</h2>
        <p style="margin-bottom: 25px; font-size: 16px; color: #374151;">Hello ${name},</p>
        
        <div style="background-color: #f0f9ff; border-radius: 8px; padding: 25px; margin: 25px 0; border: 1px solid #e0f2fe;">
          <p style="margin: 0; font-size: 16px; line-height: 1.6;">Thank you for registering with EventFlow. We're excited to have you on board!</p>
          <p style="margin-top: 15px; margin-bottom: 0; font-size: 16px; line-height: 1.6;">You can now explore events, register for upcoming activities, and connect with other participants.</p>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login" 
             style="background-color: #4f46e5; color: white; text-decoration: none; padding: 14px 28px; 
                    border-radius: 6px; font-weight: 500; display: inline-block; font-size: 16px;
                    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25); transition: all 0.2s ease;">
            Login to Your Account
          </a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 16px; color: #4b5563;">Have questions? Just reply to this email—we're here to help!</p>
          <p style="margin-top: 25px; font-size: 16px; color: #4b5563;">Cheers,<br /><strong>The EventFlow Team</strong></p>
        </div>
      </div>
    `;
    
    await sendEmail({
      to: email,
      subject: 'Welcome to EventFlow! 🎉',
      html: generateEmailTemplate(content),
      text: `Hello ${name},\n\nThank you for registering with EventFlow. We're excited to have you on board!\n\nYou can now login and start exploring events, register for upcoming activities, and connect with other participants.\n\nLogin to your account: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login\n\nCheers,\nThe EventFlow Team`
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

/**
 * Send password reset email with token
 * @param {Object} user - User object
 * @param {string} resetUrl - Password reset URL with token
 */
export const sendPasswordResetEmail = async (user, resetUrl) => {
  try {
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 28px; margin-bottom: 20px; font-weight: 700;">Reset Your Password 🔐</h2>
        <p style="margin-bottom: 25px; font-size: 16px; color: #374151;">Hello ${user.name},</p>
        
        <p style="margin-bottom: 25px; font-size: 16px; line-height: 1.6;">We received a request to reset your password for your EventFlow account. If you didn't make this request, you can safely ignore this email.</p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; font-size: 15px; color: #4b5563;"><strong>Note:</strong> This link is only valid for the next 60 minutes.</p>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4f46e5; color: white; text-decoration: none; padding: 14px 28px; 
                    border-radius: 6px; font-weight: 500; display: inline-block; font-size: 16px;
                    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25); transition: all 0.2s ease;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="background-color: #f9fafb; padding: 10px; border-radius: 4px; font-size: 13px; 
                  word-break: break-all; color: #4f46e5; border: 1px solid #e5e7eb;">${resetUrl}</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 15px; color: #4b5563;">For security reasons, if you didn't request a password reset, please contact our support team.</p>
          <p style="margin-top: 25px; font-size: 16px; color: #4b5563;">Regards,<br /><strong>The EventFlow Security Team</strong></p>
        </div>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: 'Reset Your EventFlow Password',
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nYou requested a password reset for your EventFlow account. Please use the following link to reset your password:\n\n${resetUrl}\n\nThis link is valid for 1 hour.\n\nIf you didn't request a password reset, please contact our support team immediately.\n\nRegards,\nThe EventFlow Security Team`
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

/**
 * Send password reset confirmation email
 * @param {Object} user - User object
 */
export const sendPasswordResetSuccessEmail = async (user) => {
  try {
    const content = `
      <div>
        <h2 style="color: #4f46e5; font-size: 28px; margin-bottom: 20px; font-weight: 700;">Password Reset Successful ✅</h2>
        <p style="margin-bottom: 25px; font-size: 16px; color: #374151;">Hello ${user.name},</p>
        
        <div style="background-color: #ecfdf5; border-radius: 8px; padding: 25px; margin: 25px 0; border: 1px solid #d1fae5;">
          <p style="margin: 0; font-size: 16px; color: #065f46; font-weight: 500;">Your password has been successfully reset.</p>
          <p style="margin-top: 15px; margin-bottom: 0; font-size: 16px; color: #047857;">You can now login with your new password.</p>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login" 
             style="background-color: #4f46e5; color: white; text-decoration: none; padding: 14px 28px; 
                    border-radius: 6px; font-weight: 500; display: inline-block; font-size: 16px;
                    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25); transition: all 0.2s ease;">
            Login to Your Account
          </a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 15px; color: #4b5563;">If you didn't request this password change, please contact our support team immediately at <a href="mailto:support@eventflow.com" style="color: #4f46e5; text-decoration: none;">support@eventflow.com</a></p>
          <p style="margin-top: 25px; font-size: 16px; color: #4b5563;">Best regards,<br /><strong>The EventFlow Security Team</strong></p>
        </div>
      </div>
    `;
    
    await sendEmail({
      to: user.email,
      subject: 'Your EventFlow Password Has Been Reset',
      html: generateEmailTemplate(content),
      text: `Hello ${user.name},\n\nYour password has been successfully reset. You can now login with your new password.\n\nLogin to your account: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login\n\nIf you didn't request this password change, please contact our support team immediately at support@eventflow.com.\n\nBest regards,\nThe EventFlow Security Team`
    });
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
  }
};

export default {
  sendRegistrationConfirmation,
  sendEventReminder,
  notifyOrganizerOfRegistration,
  sendCertificateEmail,
  sendWaitlistToRegisteredNotification,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
};
