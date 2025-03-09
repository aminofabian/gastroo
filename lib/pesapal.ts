const PESAPAL_ENV = process.env.PESAPAL_ENV || 'sandbox';
const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

const BASE_URL = PESAPAL_ENV === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3/api'
  : 'https://pay.pesapal.com/v3/api';

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

  const data = await response.json();
  return data.token;
}

async function registerIPN(token: string) {
  const response = await fetch(`${BASE_URL}/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/ipn`,
      ipn_notification_type: 'POST'
    })
  });

  const data = await response.json();
  return {
    ipn_id: data.ipn_id,
    url: data.url
  };
}

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
    const { ipn_id } = await registerIPN(token);
    
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
        notification_id: ipn_id,
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
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('PesaPal payment error:', error);
    throw new Error('Failed to initiate payment');
  }
} 