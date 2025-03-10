import axios from 'axios';

const PESAPAL_ENV = process.env.PESAPAL_ENV || 'sandbox';
const BASE_URL = PESAPAL_ENV === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3'  // Sandbox URL
  : 'https://pay.pesapal.com/v3';          // Live URL

// Get auth token
async function getAuthToken() {
  try {
    console.log('Environment:', PESAPAL_ENV);
    console.log('Using API URL:', BASE_URL);
    
    // Sandbox credentials
    const credentials = {
      consumer_key: "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",      // Fixed order
      consumer_secret: "osGQ364R49cXKeOYSpaOnT++rHs="
    };

    console.log('Using credentials:', {
      key: credentials.consumer_key.substring(0, 4) + '...',
      secret: credentials.consumer_secret.substring(0, 4) + '...'
    });

    const response = await axios.post(`${BASE_URL}/api/Auth/RequestToken`, credentials, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('Raw Response:', response.data);

    if (response.data.error) {
      console.error('Auth Error:', response.data.error);
      throw new Error(response.data.error.message || 'Failed to get auth token');
    }

    if (!response.data.token) {
      console.error('No token in response:', response.data);
      throw new Error('Authentication failed - no token received');
    }

    return response.data.token;

  } catch (error: any) {
    console.error('Full Auth Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
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
    
    const response = await axios.post(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, {
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

  } catch (error: any) {
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