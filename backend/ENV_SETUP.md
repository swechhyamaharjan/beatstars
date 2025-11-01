# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

## Required Variables

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/beatstars

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-secret-jwt-key-change-this-in-production

# Frontend Base URL
APP_BASE_URL=http://localhost:5173/

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM="Beatstars <your-email@gmail.com>"
```

## Gmail SMTP Setup Instructions

### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification
3. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate an App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select your device (or "Other" and name it "Beatstars")
4. Click "Generate"
5. Copy the 16-character password (no spaces)

### Step 3: Configure Your .env File
Replace in your `.env` file:
- `SMTP_USER` with your Gmail address (e.g., `youremail@gmail.com`)
- `SMTP_PASS` with the 16-character app password you just generated
- `SMTP_FROM` with your desired sender name (e.g., `"Beatstars <youremail@gmail.com>"`)

### Example:
```env
SMTP_USER=youremail@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM="Beatstars <youremail@gmail.com>"
```

**Note:** The app password may have spaces, but you can include them or remove them - both work.

## Alternative Email Services

If you prefer not to use Gmail, you can use other SMTP services:

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM="Beatstars <noreply@yourdomain.com>"
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
SMTP_FROM="Beatstars <noreply@yourdomain.com>"
```
