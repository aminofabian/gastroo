import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addCorsHeaders } from "@/app/api/cors";

export async function POST(req: Request) {
  try {
    // Get request data
    const body = await req.json();
    const { registrationId, orderTrackingId, status } = body;
    
    if (!registrationId) {
      return addCorsHeaders(Response.json({ 
        error: "Registration ID is required" 
      }, { status: 400 }));
    }
    
    // Find the registration
    const registration = await prisma.eventRegistration.findUnique({
      where: { id: registrationId },
      include: {
        payment: true
      }
    });
    
    if (!registration) {
      return addCorsHeaders(Response.json({ 
        error: "Registration not found" 
      }, { status: 404 }));
    }
    
    // Update the payment status
    if (registration.paymentId) {
      await prisma.payment.update({
        where: { id: registration.paymentId },
        data: {
          status: status,
          transactionId: orderTrackingId || registration.payment?.transactionId
        }
      });
    }
    
    // Update the registration status
    await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: {
        paymentStatus: status
      }
    });
    
    return addCorsHeaders(Response.json({
      success: true,
      message: "Payment status updated successfully"
    }));
    
  } catch (error: any) {
    console.error("Update payment status error:", error);
    return addCorsHeaders(Response.json({ 
      error: error.message || "Failed to update payment status" 
    }, { status: 500 }));
  }
} 