import { auth } from "@/auth";
import { getAuthToken } from "@/lib/pesapal";

// Export the getAuthToken function for testing
export { getAuthToken } from "@/lib/pesapal";

export async function GET(req: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Test PesaPal authentication
    const token = await getAuthToken();
    
    return Response.json({
      success: true,
      message: "PesaPal credentials are working correctly",
      tokenLength: token.length,
      tokenPrefix: token.substring(0, 10) + '...'
    });
  } catch (error: any) {
    console.error("PesaPal test error:", error);
    return Response.json({ 
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 