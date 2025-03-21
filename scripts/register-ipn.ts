import 'dotenv/config';
import fetch from 'node-fetch';

interface IPNResponse {
  ipn_id: string;
  url: string;
  error?: { message: string };
}

async function registerIPN() {
  try {
    // Get auth token first
    const tokenResponse = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      })
    });

    const { token } = await tokenResponse.json() as { token: string };
    console.log('Got token:', token);

    // Register IPN URL
    const response = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        url: 'https://gastro.or.ke/api/pesapal/ipn',
        ipn_notification_type: 'POST'
      })
    });

    const data = await response.json() as IPNResponse;
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