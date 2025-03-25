import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    console.log("Uploading resource file...");
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      console.log("Unauthorized attempt to upload resource file");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const resourceType = formData.get("resourceType") as string || "resource";
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    console.log("Processing resource file:", { 
      filename: file.name, 
      size: file.size, 
      type: file.type,
      resourceType
    });
    
    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `resources/${uuidv4()}.${fileExtension}`;
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload file to S3
    console.log("Uploading resource file to S3...");
    const fileUrl = await uploadToS3(buffer, uniqueFileName, file.type);
    console.log("Resource file uploaded successfully:", fileUrl);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      fileUrl,
      message: `Resource file uploaded successfully` 
    });
  } catch (error) {
    console.error("Error uploading resource file:", error);
    return NextResponse.json({ 
      error: "Failed to upload resource file",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 