require('dotenv').config();
const axios = require('axios');

async function registerIPN() {
  try {
    // Get auth token first
    const tokenResponse = await axios.post('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const { token } = tokenResponse.data;
    console.log('Got token:', token);

    // Register IPN URL
    const response = await axios.post('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
      url: 'https://gastro.or.ke/api/pesapal/ipn',
      ipn_notification_type: 'POST'
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = response.data;
    console.log('IPN Registration Response:', data);
    
    if (data.error) {
      throw new Error(data.error.message || 'IPN registration failed');
    }
    
    console.log('\nAdd this to your .env file:');
    console.log(`PESAPAL_IPN_ID=${data.ipn_id}`);

  } catch (error) {
    console.error('Failed to register IPN:', error);
  }
}

registerIPN(); 