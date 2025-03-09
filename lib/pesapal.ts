const PESAPAL_ENV = process.env.PESAPAL_ENV || 'live';
const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

// Use live URL
const BASE_URL = 'https://pay.pesapal.com/v3/api';

// Get auth token
async function getAuthToken() {
  const response = await fetch(`${BASE_URL}/Auth/RequestToken`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get auth token');
  }

  const data = await response.json();
  return data.token;
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
    
    const merchantReference = `GSK-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const response = await fetch(`${BASE_URL}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: merchantReference,
        currency: 'KES',
        amount: amount,
        description: `GSK ${membershipType} Membership Payment`,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/callback`,
        notification_id: process.env.PESAPAL_IPN_ID,
        branch: "GSK",
        billing_address: {
          email_address: email,
          phone_number: phone.startsWith('0') ? `254${phone.slice(1)}` : phone,
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
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Payment initiation failed');
    }

    return {
      orderTrackingId: data.order_tracking_id,
      merchantReference: data.merchant_reference,
      redirectUrl: data.redirect_url
    };

  } catch (error) {
    console.error('PesaPal payment error:', error);
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