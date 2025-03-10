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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(req: Request) {
  try {
    // Get credentials from request body
    const credentials = await req.json();
    
    console.log('Proxy: Requesting auth token with credentials:', {
      keyLength: credentials.consumer_key?.length,
      secretLength: credentials.consumer_secret?.length,
      env: PESAPAL_ENV,
      url: `${BASE_URL}/api/Auth/RequestToken`
    });
    
    // Make the request to PesaPal API
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
    
    console.log('Proxy: Auth response status:', response.status);
    
    // Return the response data with CORS headers
    return addCorsHeaders(Response.json(response.data));
  } catch (error: any) {
    console.error('Proxy: Auth Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return addCorsHeaders(Response.json({
      error: {
        message: error.message,
        details: error.response?.data || 'No additional details available'
      }
    }, { status: 500 }));
  }
} 