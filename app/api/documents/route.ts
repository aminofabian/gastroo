import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    console.log("Uploading document...");
    const session = await auth();
    if (!session?.user) {
      console.log("Unauthorized attempt to upload document");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const docType = formData.get("docType") as string || "document";
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    console.log("Processing file:", { 
      filename: file.name, 
      size: file.size, 
      type: file.type,
      docType
    });
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `members/${session.user.id}/${Date.now()}-${file.name}`;
    
    // Upload file to S3
    console.log("Uploading file to S3...");
    const fileUrl = await uploadToS3(buffer, fileName, file.type);
    console.log("File uploaded successfully:", fileUrl);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      fileUrl,
      message: `Document ${docType} uploaded successfully` 
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ 
      error: "Failed to upload document",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 