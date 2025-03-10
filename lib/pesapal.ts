import axios from 'axios';

const PESAPAL_ENV = process.env.PESAPAL_ENV || 'sandbox';
// Remove /api from base URL as it's added in the endpoints
const BASE_URL = PESAPAL_ENV === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3'
  : 'https://pay.pesapal.com/v3';

// Get auth token
async function getAuthToken() {
  try {
    console.log('Environment:', PESAPAL_ENV);
    console.log('Using API URL:', BASE_URL);
    
    // Ensure credentials are present
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      throw new Error('Missing PesaPal credentials');
    }

    const credentials = {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY.trim(),
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET.trim()
    };

    // Log partial credentials for debugging
    console.log('Using credentials:', {
      key: credentials.consumer_key.substring(0, 8) + '...',
      secret: credentials.consumer_secret.substring(0, 8) + '...',
      env: PESAPAL_ENV,
      keyLength: credentials.consumer_key.length,
      secretLength: credentials.consumer_secret.length
    });

    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/Auth/RequestToken`,
      data: credentials,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      validateStatus: null // Allow any status code
    });

    console.log('Auth Response:', {
      status: response.status,
      error: response.data.error,
      hasToken: !!response.data.token
    });

    if (response.data.error) {
      throw new Error(`Auth failed: ${JSON.stringify(response.data.error)}`);
    }

    if (!response.data.token) {
      throw new Error('No token in response');
    }

    return response.data.token;

  } catch (error: any) {
    console.error('Auth Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      env: PESAPAL_ENV
    });
    throw error;
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

    const merchantReference = `GSK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const paymentData = {
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
    };

    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/Transactions/SubmitOrderRequest`,
      data: paymentData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      validateStatus: null
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

  } catch (error: any) {
    console.error('Payment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
  }
}

// Check payment status
export async function checkPaymentStatus(orderTrackingId: string) {
  try {
    const token = await getAuthToken();
    
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/Transactions/GetTransactionStatus`,
      params: { orderTrackingId },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      validateStatus: null
    });

    console.log('Status Check Response:', response.data);

    if (response.data.error) {
      throw new Error(`Status check failed: ${JSON.stringify(response.data.error)}`);
    }

    return {
      status: response.data.payment_status_description,
      amount: response.data.amount,
      paymentMethod: response.data.payment_method,
      reference: response.data.merchant_reference
    };

  } catch (error: any) {
    console.error('Status Check Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
  }
} 