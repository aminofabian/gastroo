import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    console.log("Uploading file via direct endpoint...");
    const session = await auth();
    if (!session?.user) {
      console.log("Unauthorized attempt to upload file");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    console.log("Processing uploaded file:", { 
      filename: file.name, 
      size: file.size, 
      type: file.type
    });
    
    // Convert file to buffer for S3 upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `profiles/${Date.now()}-${file.name}`;
    
    // Upload file to S3 using the existing utility
    console.log("Uploading file to S3...");
    const url = await uploadToS3(buffer, fileName, file.type);
    console.log("File uploaded successfully:", url);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      url,
      message: "File uploaded successfully" 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ 
      error: "Failed to upload file",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 