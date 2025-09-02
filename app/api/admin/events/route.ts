import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3";
import { generateEventSlug, generateUniqueSlug } from "@/lib/slug-utils";

type EventType = "CONFERENCE" | "WORKSHOP" | "SEMINAR" | "MEETING";

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Reduced to 5MB per file
const MAX_COMBINED_SIZE = 10 * 1024 * 1024; // 10MB total for all files

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const events = await db.event.findMany({
      include: {
        attendees: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        organizers: {
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
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[EVENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Use a try/catch block specifically for form parsing
    let formData;
    try {
      formData = await req.formData();
    } catch (error) {
      console.error("[EVENTS_POST] Form data parsing error:", error);
      return NextResponse.json({ 
        error: "Failed to parse form data. The payload might be too large.", 
        details: "Maximum allowed file size is 5MB per file, and 10MB total"
      }, { status: 413 });
    }
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as EventType;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const venue = formData.get("venue") as string;
    const objectives = JSON.parse(formData.get("objectives") as string);
    const cpdPoints = Number(formData.get("cpdPoints"));
    const speakers = JSON.parse(formData.get("speakers") as string);
    const moderators = JSON.parse(formData.get("moderators") as string);
    const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
    const registrationDeadline = formData.get("registrationDeadline") as string;

    // Parse price values
    const memberPriceStr = formData.get('memberPrice') as string;
    const nonMemberPriceStr = formData.get('nonMemberPrice') as string;
    
    // Convert prices to numbers or null
    const memberPrice = memberPriceStr === 'null' || memberPriceStr === '' ? null : parseFloat(memberPriceStr);
    const nonMemberPrice = nonMemberPriceStr === 'null' || nonMemberPriceStr === '' ? null : parseFloat(nonMemberPriceStr);

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique slug
    const baseSlug = generateEventSlug(title, type, new Date(startDate));
    
    // Get existing slugs to ensure uniqueness
    const existingEvents = await db.event.findMany({
      select: { slug: true },
    });
    const existingSlugs = existingEvents.map(event => event.slug);
    
    const slug = generateUniqueSlug(baseSlug, existingSlugs);

    // Validate prices
    if (memberPrice !== null && (isNaN(memberPrice) || memberPrice < 0)) {
      return NextResponse.json({ error: "Invalid member price" }, { status: 400 });
    }
    if (nonMemberPrice !== null && (isNaN(nonMemberPrice) || nonMemberPrice < 0)) {
      return NextResponse.json({ error: "Invalid non-member price" }, { status: 400 });
    }

    // Handle file uploads with validation
    const materials: Record<string, string> = {};
    const files = formData.getAll("materials") as File[];
    
    // Calculate total size of all files
    const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalFileSize > MAX_COMBINED_SIZE) {
      return NextResponse.json({ 
        error: "Total file size exceeds the maximum allowed",
        details: `Maximum combined size is ${MAX_COMBINED_SIZE / 1024 / 1024}MB, uploaded: ${(totalFileSize / 1024 / 1024).toFixed(2)}MB`
      }, { status: 413 });
    }
    
    for (const file of files) {
      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({
          error: "Invalid file type",
          details: `File '${file.name}' has unsupported type: ${file.type}`
        }, { status: 400 });
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({
          error: "File too large",
          details: `File '${file.name}' is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum allowed is ${MAX_FILE_SIZE / 1024 / 1024}MB per file.`
        }, { status: 413 });
      }

      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileUrl = await uploadToS3(buffer, file.name, file.type);
        materials[file.name] = fileUrl;
      } catch (uploadError) {
        console.error("[EVENTS_POST] S3 upload error:", uploadError);
        return NextResponse.json({
          error: "Failed to upload file",
          details: `Error uploading '${file.name}' to storage.`
        }, { status: 500 });
      }
    }

    const event = await db.event.create({
      data: {
        title,
        description: description || "",
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue: venue || "",
        slug,
        objectives: objectives || [],
        cpdPoints: cpdPoints || 0,
        speakers: speakers || [],
        moderators: moderators || [],
        capacity,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        materials,
        memberPrice,
        nonMemberPrice,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("[EVENTS_POST]", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 