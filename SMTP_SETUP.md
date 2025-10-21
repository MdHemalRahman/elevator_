# SMTP Email Setup Guide

## Gmail SMTP Configuration

To enable email notifications for order confirmations and cancellations, follow these steps:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication if not already enabled

### 2. Generate App Password
- Go to Google Account → Security → 2-Step Verification
- Scroll down to "App passwords"
- Select "Mail" and generate a password
- Copy the 16-character app password

### 3. Update Environment Variables
Edit your `.env.local` file:

```env
VITE_SMTP_USER=your_gmail@gmail.com
VITE_SMTP_PASS=your_16_character_app_password
```

### 4. Alternative SMTP Services

#### Outlook/Hotmail
```env
VITE_SMTP_HOST=smtp-mail.outlook.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your_email@outlook.com
VITE_SMTP_PASS=your_password
```

#### Custom SMTP
```env
VITE_SMTP_HOST=your_smtp_host
VITE_SMTP_PORT=587
VITE_SMTP_USER=your_email
VITE_SMTP_PASS=your_password
```

## Email Features

✅ **Order Confirmation Email**
- Sent when admin confirms an order
- Professional HTML template
- Order details included

✅ **Order Cancellation Email**
- Sent when admin cancels an order
- Apologetic tone with order details
- Contact information for support

✅ **Fallback System**
- If SMTP fails, logs to console
- Ensures admin operations continue

## Security Notes

- Never commit SMTP credentials to Git
- Use app passwords, not regular passwords
- Keep `.env.local` in `.gitignore`