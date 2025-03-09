const PESAPAL_ENV = process.env.PESAPAL_ENV || 'live';
const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

// Use live URL
const BASE_URL = process.env.PESAPAL_API_URL || 'https://pay.pesapal.com/v3/api';

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
    
    const formattedPhone = phone.startsWith('0') ? `254${phone.slice(1)}` : phone;
    
    const response = await fetch(`${BASE_URL}/stkpush/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.PESAPAL_SHORTCODE,
        Password: process.env.PESAPAL_PASSWORD,
        Timestamp: new Date().toISOString(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.PESAPAL_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/callback`,
        AccountReference: "GSK Membership",
        TransactionDesc: `GSK ${membershipType} Membership Payment`
      })
    });

    const data = await response.json();
    console.log('STK Push Response:', data); // For debugging

    if (!response.ok) {
      throw new Error(data.error?.message || 'Payment initiation failed');
    }

    return data;
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