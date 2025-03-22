const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Debugging: Check if environment variables are loaded
if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('Error: Missing required environment variables.');
  console.log('TWILIO_ACCOUNT_SID:', accountSid);
  console.log('TWILIO_AUTH_TOKEN:', authToken ? 'Loaded' : 'Not Loaded');
  console.log('TWILIO_PHONE_NUMBER:', twilioPhoneNumber);
  process.exit(1); // Exit the application if required variables are not set
}

const client = twilio(accountSid, authToken);

// Endpoint to send OTP
app.post('/send-otp', async (req, res) => {
  const { to, body } = req.body;

  if (!to || !body) {
    return res.status(400).json({ success: false, error: 'Missing required fields: "to" and/or "body"' });
  }
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to
    });

    res.status(200).json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send OTP' });
  }
});

// Endpoint to send general SMS 
app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;
  if (!to || !body) {
    return res.status(400).json({ success: false, error: 'Missing required fields: "to" and/or "body"' });
  }

  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to  
    });
    res.status(200).json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send SMS' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
