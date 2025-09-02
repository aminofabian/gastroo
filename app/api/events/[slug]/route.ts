import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("[EVENT_SLUG_API] Starting to fetch event with slug:", params.slug);
    
    // Test database connection
    try {
      await prisma.$connect();
      console.log("[EVENT_SLUG_API] Database connection successful");
    } catch (dbError) {
      console.error("[EVENT_SLUG_API] Database connection failed:", dbError);
      throw new Error("Database connection failed");
    }
    
    // Fetch event by slug with all related data
    const event = await prisma.event.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        attendees: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        registrations: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            paymentStatus: true,
            isAttended: true,
            createdAt: true,
          },
        },
      },
    });

    if (!event) {
      console.log("[EVENT_SLUG_API] Event not found with slug:", params.slug);
      return new NextResponse(
        JSON.stringify({ 
          error: "Event not found",
          details: `No event found with slug: ${params.slug}`
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }

    console.log("[EVENT_SLUG_API] Found event:", event.id, event.title);
    console.log("[EVENT_SLUG_API] Event registrations count:", event.registrations.length);

    // Set proper headers and return response
    return new NextResponse(JSON.stringify(event), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error("[EVENT_SLUG_API] Error fetching event:", error);
    
    // Return a proper JSON error response
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to fetch event",
        details: error instanceof Error ? error.message : "Unknown error"
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log("[EVENT_SLUG_API] Database disconnected successfully");
    } catch (error) {
      console.error("[EVENT_SLUG_API] Error disconnecting from database:", error);
    }
  }
}
