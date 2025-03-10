import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return Response.json({ user: null }, { status: 401 });
    }
    
    // Return user information without sensitive data
    return Response.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        image: session.user.image,
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
} 