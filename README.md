# Setup Guide — Rural Welfare Program

## Install Dependencies

```bash
npm install razorpay pdf-lib googleapis resend
```

## File Structure

```
your-project/
├── api/
│   ├── create-order.js      ← Razorpay order create
│   └── verify-payment.js    ← Verify + PDF + Drive + Email
├── src/
│   ├── pages/
│   │   ├── Registration.jsx    ← Post cards
│   │   └── ApplyFormPage.jsx ← Form + Razorpay
└── .env.local               ← Your secret keys
```

## Step 1 — Razorpay Setup
1. Login to https://dashboard.razorpay.com
2. Settings → API Keys → Generate Key
3. Copy Key ID and Key Secret to `.env.local`

## Step 2 — Resend Setup (Email)
1. Go to https://resend.com → Sign up (free)
2. Add your domain OR use their test domain
3. Create API Key → copy to `.env.local` as `RESEND_API_KEY`
4. In `verify-payment.js`, replace `noreply@yourdomain.com` with your verified sender email

## Step 3 — Google Drive Setup
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable **Google Drive API**
4. Go to IAM → Service Accounts → Create Service Account
5. Create Key → JSON → Download
6. Copy all values from JSON to `.env.local`
7. Create a folder in Google Drive
8. Share that folder with your `GOOGLE_CLIENT_EMAIL` (give Editor access)
9. Copy folder ID from URL to `.env.local` as `GOOGLE_DRIVE_FOLDER_ID`

## Step 4 — Vercel Deploy
1. Push code to GitHub
2. Connect repo to Vercel
3. Go to Vercel → Project → Settings → Environment Variables
4. Add all variables from `.env.example`
5. Deploy!

## Flow Summary
```
User fills form
    ↓
Click "Pay & Submit"
    ↓
/api/create-order → Razorpay order created
    ↓
Razorpay popup opens (user pays)
    ↓
/api/verify-payment called with payment response
    ↓
✅ Signature verified
✅ PDF generated with user data
✅ PDF uploaded to Google Drive
✅ Email sent to user (with PDF attached)
✅ Email sent to admin (with PDF attached)
✅ PDF returned to frontend for download
    ↓
Success modal shown with Download + Drive link
```