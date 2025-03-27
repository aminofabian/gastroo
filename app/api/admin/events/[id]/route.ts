import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { EventType } from "@prisma/client";
import { uploadToS3 } from "@/lib/s3";

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
const MAX_COMBINED_SIZE = 10 * 1024 * 1024; // 10MB total for all files

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use a try/catch block specifically for form parsing
    let formData;
    try {
      formData = await req.formData();
    } catch (error) {
      console.error("[EVENT_PATCH] Form data parsing error:", error);
      return NextResponse.json({ 
        error: "Failed to parse form data. The payload might be too large.", 
        details: "Maximum allowed file size is 5MB per file, and 10MB total"
      }, { status: 413 });
    }
    
    // Parse the form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as EventType;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const venue = formData.get('venue') as string;
    const objectives = JSON.parse(formData.get('objectives') as string);
    const cpdPoints = parseInt(formData.get('cpdPoints') as string) || 0;
    const speakers = JSON.parse(formData.get('speakers') as string);
    const moderators = JSON.parse(formData.get('moderators') as string);
    const capacity = formData.get('capacity') ? parseInt(formData.get('capacity') as string) : null;
    const registrationDeadline = formData.get('registrationDeadline') as string;

    // Parse price values
    const memberPriceStr = formData.get('memberPrice') as string;
    const nonMemberPriceStr = formData.get('nonMemberPrice') as string;
    
    // Convert prices to numbers or null
    const memberPrice = memberPriceStr === 'null' || memberPriceStr === '' ? null : parseFloat(memberPriceStr);
    const nonMemberPrice = nonMemberPriceStr === 'null' || nonMemberPriceStr === '' ? null : parseFloat(nonMemberPriceStr);

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate prices
    if (memberPrice !== null && (isNaN(memberPrice) || memberPrice < 0)) {
      return NextResponse.json({ error: "Invalid member price" }, { status: 400 });
    }
    if (nonMemberPrice !== null && (isNaN(nonMemberPrice) || nonMemberPrice < 0)) {
      return NextResponse.json({ error: "Invalid non-member price" }, { status: 400 });
    }

    // Fetch existing event materials
    const existingEvent = await db.event.findUnique({
      where: { id: params.id },
      select: { materials: true }
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Get existing materials or initialize empty object
    let materials = existingEvent.materials as Record<string, string> || {};

    // Check if there are new file uploads
    const files = formData.getAll("materials") as File[];
    
    if (files.length > 0) {
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
          console.error("[EVENT_PATCH] S3 upload error:", uploadError);
          return NextResponse.json({
            error: "Failed to upload file",
            details: `Error uploading '${file.name}' to storage.`
          }, { status: 500 });
        }
      }
    }

    const event = await db.event.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description: description || "",
        type: type as EventType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue: venue || "",
        objectives: objectives || [],
        cpdPoints,
        speakers: speakers || [],
        moderators: moderators || [],
        capacity,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        materials,
        memberPrice,
        nonMemberPrice
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("[EVENT_PATCH]", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.event.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[EVENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 