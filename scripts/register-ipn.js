require('dotenv').config();
const axios = require('axios');

async function registerIPN() {
  try {
    const baseUrl = 'https://pay.pesapal.com/v3';  // Live URL

    // Live credentials from .env
    const credentials = {
      consumer_key: "IdHbOun/pEBzs9qN5OH3UJTO/tqdNK8C",
      consumer_secret: "2FFD4eRSDSlcCTBwWZZYUiYmkmo="
    };

    console.log('Using live credentials');

    const tokenResponse = await axios.post(`${baseUrl}/api/Auth/RequestToken`, credentials, {
      headers: {
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('IPN Registration Response:', response.data);
    console.log('\nAdd this to your .env file:');
    console.log(`PESAPAL_IPN_ID=${response.data.ipn_id}`);

  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data);
      console.error('Status:', error.response.status);
    } else {
      console.error('Request Error:', error.message);
    }
  }
}

// Verify credentials are loaded
console.log('Consumer Key present:', !!process.env.PESAPAL_CONSUMER_KEY);
console.log('Consumer Secret present:', !!process.env.PESAPAL_CONSUMER_SECRET);

registerIPN(); 