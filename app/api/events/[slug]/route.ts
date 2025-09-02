import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("[EVENT_SLUG_API] Starting to fetch event with slug:", params.slug);
    console.log("[EVENT_SLUG_API] Request URL:", request.url);
    console.log("[EVENT_SLUG_API] Environment:", process.env.NODE_ENV);
    
    // Validate slug parameter
    if (!params.slug || params.slug.trim() === '') {
      console.log("[EVENT_SLUG_API] Invalid slug parameter:", params.slug);
      return new NextResponse(
        JSON.stringify({ 
          error: "Invalid slug parameter",
          details: "Slug parameter is required and cannot be empty"
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }
    
    // Test database connection
    try {
      await prisma.$connect();
      console.log("[EVENT_SLUG_API] Database connection successful");
    } catch (dbError) {
      console.error("[EVENT_SLUG_API] Database connection failed:", dbError);
      throw new Error(`Database connection failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`);
    }
    
    // For debugging: check all events and their slugs
    const allEvents = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: 10, // Limit to avoid too much logging
    });
    
    console.log("[EVENT_SLUG_API] Available events and slugs:", 
      allEvents.map(e => ({ id: e.id, title: e.title, slug: e.slug }))
    );
    
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
      
      // Try to find by ID as fallback (in case slug is actually an ID)
      let eventById = null;
      try {
        eventById = await prisma.event.findUnique({
          where: { id: params.slug },
          select: { id: true, title: true, slug: true },
        });
      } catch (error) {
        console.log("[EVENT_SLUG_API] Not a valid ID either:", error);
      }
      
      return new NextResponse(
        JSON.stringify({ 
          error: "Event not found",
          details: `No event found with slug: ${params.slug}`,
          availableEvents: allEvents.map(e => e.slug),
          foundById: eventById ? `Found by ID: ${eventById.title} (${eventById.slug})` : null,
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
