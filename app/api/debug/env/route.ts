import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return masked environment variables for debugging
    return Response.json({
      pesapal: {
        env: process.env.PESAPAL_ENV,
        keyExists: !!process.env.PESAPAL_CONSUMER_KEY,
        secretExists: !!process.env.PESAPAL_CONSUMER_SECRET,
        keyLength: process.env.PESAPAL_CONSUMER_KEY?.length,
        secretLength: process.env.PESAPAL_CONSUMER_SECRET?.length,
        apiUrl: process.env.PESAPAL_API_URL,
        ipnId: process.env.PESAPAL_IPN_ID?.substring(0, 8) + '...',
      },
      app: {
        nodeEnv: process.env.NODE_ENV,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
      }
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
} 