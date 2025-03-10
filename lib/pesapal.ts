import axios from 'axios';

const PESAPAL_ENV = process.env.PESAPAL_ENV || 'live';
const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

// Use live URL
const BASE_URL = process.env.PESAPAL_API_URL || 'https://pay.pesapal.com/v3/api';

// Get auth token
async function getAuthToken() {
  try {
    console.log('Using API URL:', BASE_URL); // Debug URL
    console.log('Using credentials:', {
      key: process.env.PESAPAL_CONSUMER_KEY?.substring(0, 4) + '...',
      secret: process.env.PESAPAL_CONSUMER_SECRET?.substring(0, 4) + '...'
    }); // Debug credentials

    const response = await axios.post(`${BASE_URL}/Auth/RequestToken`, {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('Auth Response:', response.data); // Debug response

    if (response.data.error) {
      throw new Error(response.data.error.message || 'Failed to get auth token');
    }

    if (!response.data.token) {
      throw new Error('No token in response: ' + JSON.stringify(response.data));
    }

    return response.data.token;

  } catch (error: any) {
    if (error.response) {
      console.error('Auth Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    throw new Error(error.response?.data?.error?.message || error.message || 'Failed to get auth token');
  }
}

// Submit payment request
export async function submitPayment({
  amount,
  email,
  firstName,
  lastName,
  phone,
  membershipType
}: {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  membershipType: string;
}) {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Failed to get authentication token');
    }

    const merchantReference = `GSK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const response = await axios.post(`${BASE_URL}/Transactions/SubmitOrderRequest`, {
      id: merchantReference,
      currency: "KES",
      amount: amount,
      description: `GSK ${membershipType} Membership Payment`,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/callback`,
      notification_id: process.env.PESAPAL_IPN_ID,
      branch: "GSK",
      billing_address: {
        email_address: email,
        phone_number: phone,
        country_code: "KE",
        first_name: firstName,
        middle_name: "",
        last_name: lastName,
        line_1: "GSK Membership",
        line_2: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: ""
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Payment Response:', response.data);

    if (response.data.error) {
      throw new Error(response.data.error.message || 'Payment initiation failed');
    }

    return {
      redirectUrl: response.data.redirect_url,
      orderTrackingId: response.data.order_tracking_id,
      merchantReference: response.data.merchant_reference
    };

  } catch (error) {
    console.error('PesaPal payment error:', error.response?.data || error.message);
    throw error;
  }
}

// Check payment status
export async function checkPaymentStatus(orderTrackingId: string) {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(
      `${BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    return {
      status: data.payment_status_description,
      amount: data.amount,
      paymentMethod: data.payment_method,
      reference: data.merchant_reference
    };

  } catch (error) {
    console.error('Payment status check error:', error);
    throw error;
  }
} 