import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { submitPayment } from "@/lib/pesapal";
import { addCorsHeaders } from "@/app/api/cors";

export async function POST(req: Request) {
  try {
    // Get the session
    const session = await auth();
    
    // Get request data
    const body = await req.json();
    const { eventId, registrationId, isGuest = false } = body;
    
    if (!eventId) {
      return addCorsHeaders(Response.json({ 
        error: "Event ID is required" 
      }, { status: 400 }));
    }
    
    // Fetch the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        memberPrice: true,
        nonMemberPrice: true,
      }
    });
    
    if (!event) {
      return addCorsHeaders(Response.json({ 
        error: "Event not found" 
      }, { status: 404 }));
    }
    
    // Determine if user is a member and set price accordingly
    let amount = event.nonMemberPrice || 0;
    let userEmail = '';
    let firstName = '';
    let lastName = '';
    let phone = '';
    let userId = 'guest';
    
    if (isGuest) {
      // For guest users, fetch registration details
      if (!registrationId) {
        return addCorsHeaders(Response.json({ 
          error: "Registration ID is required for guest payments" 
        }, { status: 400 }));
      }
      
      const registration = await prisma.eventRegistration.findUnique({
        where: { id: registrationId },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
        }
      });
      
      if (!registration) {
        return addCorsHeaders(Response.json({ 
          error: "Registration not found" 
        }, { status: 404 }));
      }
      
      userEmail = registration.email;
      firstName = registration.firstName;
      lastName = registration.lastName;
      phone = registration.phone || '';
    } else {
      // For logged-in users
      if (!session?.user) {
        return addCorsHeaders(Response.json({ 
          error: "Authentication required" 
        }, { status: 401 }));
      }
      
      // Check if user is a member to determine price
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          isMember: true,
        }
      });
      
      if (!user) {
        return addCorsHeaders(Response.json({ 
          error: "User not found" 
        }, { status: 404 }));
      }
      
      // Use member price if user is a member
      amount = user.isMember ? (event.memberPrice || 0) : (event.nonMemberPrice || 0);
      userEmail = user.email || session.user.email || '';
      firstName = user.firstName || '';
      lastName = user.lastName || '';
      phone = user.phone || '';
      userId = session.user.id;
    }
    
    // Create a payment record
    const payment = await prisma.payment.create({
      data: {
        amount: amount,
        status: 'PENDING',
        transactionId: `EVENT-${eventId}-${Date.now()}`,
        phoneNumber: phone,
        description: `Event Registration: ${event.title}`,
        userId: userId,
        currency: 'KES',
      }
    });
    
    // Initialize PesaPal payment
    const paymentResponse = await submitPayment({
      amount: amount,
      email: userEmail,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      membershipType: 'event', // Using 'event' as the type for event payments
    });
    
    if (!paymentResponse.redirectUrl) {
      return addCorsHeaders(Response.json({ 
        error: "Failed to initialize payment" 
      }, { status: 500 }));
    }
    
    // Update the payment record with PesaPal tracking info
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        transactionId: paymentResponse.merchantReference,
      }
    });
    
    // If this is for a specific registration, link the payment
    if (registrationId) {
      await prisma.eventRegistration.update({
        where: { id: registrationId },
        data: {
          paymentId: payment.id,
          paymentStatus: 'PENDING',
        }
      });
    }
    
    // Return the payment info
    return addCorsHeaders(Response.json({
      success: true,
      redirectUrl: paymentResponse.redirectUrl,
      orderTrackingId: paymentResponse.orderTrackingId,
      merchantReference: paymentResponse.merchantReference,
      paymentId: payment.id
    }));
    
  } catch (error: any) {
    console.error("Event payment error:", error);
    return addCorsHeaders(Response.json({ 
      error: error.message || "Failed to process payment" 
    }, { status: 500 }));
  }
} 