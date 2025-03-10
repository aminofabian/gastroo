import axios from 'axios';

// Fallback values from .env file in case environment variables are not loaded properly
// These should match the values in your .env file
const FALLBACK_CREDENTIALS = {
  PESAPAL_ENV: 'live',
  PESAPAL_CONSUMER_KEY: 'IdHbOun/pEBzs9qN5OH3UJTO/tqdNK8C',
  PESAPAL_CONSUMER_SECRET: '2FFD4eRSDSlcCTBwWZZYUiYmkmo=',
  PESAPAL_API_URL: 'https://pay.pesapal.com/v3',
  PESAPAL_IPN_ID: 'e77d03e4-50de-4a2d-9f84-dc11e7191a59'
};

// Use environment variables or fallback to hardcoded values if not available
const PESAPAL_ENV = process.env.PESAPAL_ENV || FALLBACK_CREDENTIALS.PESAPAL_ENV;
// Remove /api from base URL as it's added in the endpoints
const BASE_URL = PESAPAL_ENV === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3'
  : 'https://pay.pesapal.com/v3';

// Get auth token
export async function getAuthToken() {
  try {
    console.log('Environment:', PESAPAL_ENV);
    console.log('Using API URL:', BASE_URL);
    
    // More detailed logging for debugging
    console.log('Checking PesaPal credentials:', {
      keyExists: !!process.env.PESAPAL_CONSUMER_KEY,
      secretExists: !!process.env.PESAPAL_CONSUMER_SECRET,
      keyType: typeof process.env.PESAPAL_CONSUMER_KEY,
      secretType: typeof process.env.PESAPAL_CONSUMER_SECRET,
      keyEmpty: process.env.PESAPAL_CONSUMER_KEY === '',
      secretEmpty: process.env.PESAPAL_CONSUMER_SECRET === '',
      nodeEnv: process.env.NODE_ENV
    });
    
    // Get credentials from environment variables or use fallback values
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_SECRET;
    
    // Ensure credentials are present
    if (!consumerKey || !consumerSecret) {
      throw new Error('Missing PesaPal credentials');
    }

    const credentials = {
      consumer_key: consumerKey.trim(),
      consumer_secret: consumerSecret.trim()
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
  amount?: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  membershipType: string;
}) {
  try {
    // Get credentials from environment variables or use fallback values
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_SECRET;
    const ipnId = process.env.PESAPAL_IPN_ID || FALLBACK_CREDENTIALS.PESAPAL_IPN_ID;
    
    // Check if credentials are available
    if (!consumerKey || !consumerSecret) {
      console.error('PesaPal credentials are missing');
      throw new Error('Payment gateway configuration error. Please contact support.');
    }
    
    const token = await getAuthToken();

    const merchantReference = `GSK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Calculate the correct amount based on membership type if not explicitly provided
    let paymentAmount = amount;
    if (!paymentAmount) {
      paymentAmount = membershipType === "new" ? 6500 : 5000;
    }
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gastro.or.ke';
    
    const paymentData = {
      id: merchantReference,
      currency: "KES",
      amount: paymentAmount,
      description: `GSK ${membershipType} Membership Payment - KES ${paymentAmount.toLocaleString()}`,
      callback_url: `${appUrl}/api/pesapal/callback`,
      notification_id: ipnId,
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

    console.log('Submitting payment request:', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      reference: merchantReference,
      env: PESAPAL_ENV
    });

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

    console.log('Payment Response:', {
      status: response.status,
      error: response.data.error,
      redirectUrl: response.data.redirect_url,
      orderTrackingId: response.data.order_tracking_id
    });

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
    // Get credentials from environment variables or use fallback values
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET || FALLBACK_CREDENTIALS.PESAPAL_CONSUMER_SECRET;
    
    // Check if credentials are available
    if (!consumerKey || !consumerSecret) {
      console.error('PesaPal credentials are missing');
      throw new Error('Payment gateway configuration error. Please contact support.');
    }
    
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

    // Normalize status to handle different possible values
    let normalizedStatus = response.data.payment_status_description;
    
    // Check if the status indicates a completed payment
    const completedStatuses = ['COMPLETED', 'PAID', 'SUCCESS', 'SUCCESSFUL'];
    const isCompleted = completedStatuses.some(status => 
      normalizedStatus?.toUpperCase().includes(status)
    );

    return {
      status: isCompleted ? 'COMPLETED' : normalizedStatus,
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