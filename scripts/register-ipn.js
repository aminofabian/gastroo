require('dotenv').config({ path: '../.env' });
const axios = require('axios');

async function registerIPN() {
  try {
    const baseUrl = 'https://pay.pesapal.com/v3';  // Live URL

    // Use credentials from .env
    const credentials = {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    };

    console.log('Using credentials:', {
      key: credentials.consumer_key?.substring(0, 8) + '...',
      secret: credentials.consumer_secret?.substring(0, 8) + '...'
    });

    const tokenResponse = await axios.post(`${baseUrl}/api/Auth/RequestToken`, credentials, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('Token Response:', tokenResponse.data);

    if (!tokenResponse.data.token) {
      throw new Error('No token received: ' + JSON.stringify(tokenResponse.data));
    }

    const token = tokenResponse.data.token;
    console.log('Got token:', token);

    // Register IPN URL for live environment
    const response = await axios.post(`${baseUrl}/api/URLSetup/RegisterIPN`, {
      url: 'https://gastro.or.ke/api/pesapal/ipn',
      ipn_notification_type: 'POST'
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('IPN Registration Response:', response.data);
    console.log('\nAdd this to your .env file:');
    console.log(`PESAPAL_IPN_ID=${response.data.ipn_id}`);

  } catch (error) {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else {
      console.error('Request Error:', error.message);
    }
  }
}

// Verify credentials are loaded
console.log('Environment:', process.env.PESAPAL_ENV);
console.log('API URL:', process.env.PESAPAL_API_URL);
console.log('Consumer Key:', process.env.PESAPAL_CONSUMER_KEY?.substring(0, 8) + '...');
console.log('Consumer Secret:', process.env.PESAPAL_CONSUMER_SECRET?.substring(0, 8) + '...');

// Run the registration
registerIPN(); 