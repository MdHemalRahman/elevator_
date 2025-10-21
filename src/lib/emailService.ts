import nodemailer from 'nodemailer';
import { Order } from './supabase';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: import.meta.env.VITE_SMTP_USER,
    pass: import.meta.env.VITE_SMTP_PASS
  }
});

export const emailService = {
  async sendOrderConfirmation(order: Order) {
    const mailOptions = {
      from: import.meta.env.VITE_SMTP_USER,
      to: order.email,
      subject: `Order Confirmed - ${order.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Order Confirmation</h2>
          <p>Dear ${order.name},</p>
          <p>Your order has been <strong style="color: #16a34a;">confirmed</strong>!</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Product:</strong> ${order.product}</li>
              <li><strong>Quantity:</strong> ${order.quantity || 1}</li>
              <li><strong>Order ID:</strong> ${order.id}</li>
              <li><strong>Date:</strong> ${new Date(order.created_at || '').toLocaleDateString()}</li>
            </ul>
          </div>
          
          <p>We will contact you soon at <strong>${order.phone}</strong> for delivery arrangements.</p>
          <p>Thank you for choosing Elevate Mobility!</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #64748b; font-size: 14px;">
            Best regards,<br>
            Elevate Mobility Team<br>
            Email: rhemal45@gmail.com<br>
            Phone: +(880) 1680-990294
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  },

  async sendOrderCancellation(order: Order) {
    const mailOptions = {
      from: import.meta.env.VITE_SMTP_USER,
      to: order.email,
      subject: `Order Cancelled - ${order.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Order Cancelled</h2>
          <p>Dear ${order.name},</p>
          <p>We regret to inform you that your order has been <strong style="color: #dc2626;">cancelled</strong>.</p>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3>Cancelled Order Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Product:</strong> ${order.product}</li>
              <li><strong>Quantity:</strong> ${order.quantity || 1}</li>
              <li><strong>Order ID:</strong> ${order.id}</li>
              <li><strong>Date:</strong> ${new Date(order.created_at || '').toLocaleDateString()}</li>
            </ul>
          </div>
          
          <p>If you have any questions or concerns, please contact us at <strong>${order.phone}</strong> or reply to this email.</p>
          <p>We apologize for any inconvenience caused.</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #64748b; font-size: 14px;">
            Best regards,<br>
            Elevate Mobility Team<br>
            Email: rhemal45@gmail.com<br>
            Phone: +(880) 1680-990294
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  }
};