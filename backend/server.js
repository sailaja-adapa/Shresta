const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5001; // Use dynamic port for deployment

app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow all origins, adjust if needed
  methods: ['GET', 'POST']
}));

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Debugging: Ensure environment variables are loaded
if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('❌ Error: Missing Twilio environment variables.');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

// ✅ Health Check Endpoint (Ensures server is running)
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running!' });
});

// ✅ Endpoint to send OTP
app.post('/send-otp', async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ success: false, error: 'Missing required field: "to"' });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const body = `Your OTP is: ${otp}`;

  try {
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to
    });

    res.status(200).json({ success: true, otp, messageSid: message.sid });
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send OTP' });
  }
});

// ✅ Endpoint to send general SMS
app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;

  if (!to || !body) {
    return res.status(400).json({ success: false, error: 'Missing required fields: "to" and/or "body"' });
  }

  try {
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to  
    });
    res.status(200).json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send SMS' });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
