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

    // Use a server-side proxy to avoid CORS issues
    let tokenUrl = `${BASE_URL}/api/Auth/RequestToken`;
    let useProxy = false;
    
    // If we're in the browser, use the proxy
    if (typeof window !== 'undefined') {
      useProxy = true;
      tokenUrl = '/api/pesapal/proxy/auth';
      console.log('Using proxy for auth token request');
    }

    const response = useProxy 
      ? await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        }).then(res => res.json())
      : await axios({
          method: 'POST',
          url: tokenUrl,
          data: credentials,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          validateStatus: null // Allow any status code
        }).then(res => res.data);

    console.log('Auth Response:', {
      status: response.status,
      error: response.error,
      hasToken: !!response.token
    });

    if (response.error) {
      throw new Error(`Auth failed: ${JSON.stringify(response.error)}`);
    }

    if (!response.token) {
      throw new Error('No token in response');
    }

    return response.token;

  } catch (error: any) {
    console.error('Auth Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      env: PESAPAL_ENV
    });
    
    // Provide more detailed error message for network errors
    if (error.message === 'Network Error') {
      throw new Error(`Network error connecting to PesaPal API. This could be due to CORS restrictions, network connectivity issues, or the API being unavailable. Please try using the server-side proxy or check your network connection.`);
    }
    
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

    // Use a server-side proxy to avoid CORS issues
    let useProxy = false;
    let response;
    
    // If we're in the browser, use the proxy
    if (typeof window !== 'undefined') {
      useProxy = true;
      console.log('Using proxy for payment submission');
      
      const proxyResponse = await fetch('/api/pesapal/proxy/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, paymentData })
      });
      
      response = await proxyResponse.json();
    } else {
      // Server-side request
      const axiosResponse = await axios({
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
      
      response = axiosResponse.data;
    }

    console.log('Payment Response:', {
      error: response.error,
      redirectUrl: response.redirect_url,
      orderTrackingId: response.order_tracking_id
    });

    if (response.error) {
      throw new Error(response.error.message || 'Payment initiation failed');
    }

    return {
      redirectUrl: response.redirect_url,
      orderTrackingId: response.order_tracking_id,
      merchantReference: response.merchant_reference
    };

  } catch (error: any) {
    console.error('Payment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    
    // Provide more detailed error message for network errors
    if (error.message === 'Network Error') {
      throw new Error(`Network error connecting to PesaPal API. This could be due to CORS restrictions, network connectivity issues, or the API being unavailable. Please try using the server-side proxy or check your network connection.`);
    }
    
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
    
    // Use a server-side proxy to avoid CORS issues
    let useProxy = false;
    let response;
    
    // If we're in the browser, use the proxy
    if (typeof window !== 'undefined') {
      useProxy = true;
      console.log('Using proxy for status check');
      
      const proxyResponse = await fetch(`/api/pesapal/proxy/status?token=${encodeURIComponent(token)}&orderTrackingId=${encodeURIComponent(orderTrackingId)}`);
      
      response = await proxyResponse.json();
    } else {
      // Server-side request
      const axiosResponse = await axios({
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
      
      response = axiosResponse.data;
    }

    console.log('Status Check Response:', response);

    // PesaPal sometimes returns an error object with null values even for successful responses
    // Only consider it an error if the error object has actual error values
    if (response.error && 
        (response.error.error_type || 
         response.error.code || 
         response.error.message)) {
      throw new Error(`Status check failed: ${JSON.stringify(response.error)}`);
    }

    // Normalize status to handle different possible values
    let normalizedStatus = response.payment_status_description;
    
    // Check if the status indicates a completed payment
    const completedStatuses = ['COMPLETED', 'PAID', 'SUCCESS', 'SUCCESSFUL'];
    const isCompleted = completedStatuses.some(status => 
      normalizedStatus?.toUpperCase().includes(status)
    );

    return {
      status: isCompleted ? 'COMPLETED' : normalizedStatus,
      amount: response.amount,
      paymentMethod: response.payment_method,
      reference: response.merchant_reference
    };

  } catch (error: any) {
    console.error('Status Check Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    
    // Provide more detailed error message for network errors
    if (error.message === 'Network Error') {
      throw new Error(`Network error connecting to PesaPal API. This could be due to CORS restrictions, network connectivity issues, or the API being unavailable. Please try using the server-side proxy or check your network connection.`);
    }
    
    throw error;
  }
} 