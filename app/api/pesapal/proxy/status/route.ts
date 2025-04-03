import axios from 'axios';
import { addCorsHeaders } from '@/app/api/cors';

// Define the base URL based on environment
const PESAPAL_ENV = process.env.PESAPAL_ENV || 'live';
const BASE_URL = PESAPAL_ENV === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3'
  : 'https://pay.pesapal.com/v3';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const orderTrackingId = searchParams.get('orderTrackingId');

    if (!token || !orderTrackingId) {
      return addCorsHeaders(Response.json({ 
        error: { message: 'Missing token or order tracking ID' } 
      }, { status: 400 }));
    }

    // Make the request to PesaPal API
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
    
    // Return the response data with CORS headers
    return addCorsHeaders(Response.json(response.data));
  } catch (error: any) {
    return addCorsHeaders(Response.json({
      error: {
        message: error.message,
        details: error.response?.data || 'No additional details available'
      }
    }, { status: 500 }));
  }
} 