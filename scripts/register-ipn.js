require('dotenv').config({ path: '../.env' });
const axios = require('axios');

async function registerIPN() {
  try {
    const baseUrl = process.env.PESAPAL_API_URL || 'https://pay.pesapal.com/v3';

    // Use credentials from .env
    const credentials = {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    };

    if (!credentials.consumer_key || !credentials.consumer_secret) {
      throw new Error('Missing PesaPal credentials in .env file');
    }

    console.log('Using credentials:', {
      key: credentials.consumer_key.substring(0, 8) + '...',
      secret: credentials.consumer_secret.substring(0, 8) + '...',
      env: process.env.PESAPAL_ENV,
      baseUrl
    });

    // Get auth token
    console.log('Requesting auth token...');
    const tokenResponse = await axios.post(`${baseUrl}/api/Auth/RequestToken`, credentials, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!tokenResponse.data.token) {
      throw new Error('No token received: ' + JSON.stringify(tokenResponse.data));
    }

    const token = tokenResponse.data.token;
    console.log('Got token successfully');

    // Get the app URL from env or use default
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gastro.or.ke';
    const ipnUrl = `${appUrl}/api/pesapal/ipn`;

    console.log('Registering IPN URL:', ipnUrl);

    // Register IPN URL
    const response = await axios.post(`${baseUrl}/api/URLSetup/RegisterIPN`, {
      url: ipnUrl,
      ipn_notification_type: 'POST'
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.error) {
      throw new Error(`IPN Registration failed: ${JSON.stringify(response.data.error)}`);
    }

    console.log('IPN Registration Response:', response.data);
    
    if (response.data.ipn_id) {
      console.log('\nAdd this to your .env file:');
      console.log(`PESAPAL_IPN_ID=${response.data.ipn_id}`);
    } else {
      throw new Error('No IPN ID received in response');
    }

  } catch (error) {
    console.error('\nError:', error.message);
    
    if (error.response) {
      console.error('API Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    }
    
    process.exit(1);
  }
}

// Run the registration
registerIPN(); 