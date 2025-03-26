import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
    const documentTitle = formData.get("title") as string || file?.name || "Untitled Document";
    
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

    // Determine document category and type based on docType
    let category = "Membership";
    let resourceType = "PDF";
    
    // Determine file type for resource
    if (file.type.includes("pdf")) {
      resourceType = "PDF";
    } else if (file.type.includes("video")) {
      resourceType = "VIDEO";
    } else if (file.type.includes("image")) {
      resourceType = "PDF"; // Default to PDF for images
    } else {
      resourceType = "PDF"; // Default to PDF for other types
    }
    
    // Get a more descriptive title based on docType
    let description = "User uploaded document";
    if (docType === "doc1") {
      description = "CV/Resume Document";
    } else if (docType === "doc2") {
      description = "Medical License";
    } else if (docType === "doc3") {
      description = "Additional Supporting Document";
    }
    
    // Also save document as a resource for dashboard access
    try {
      const resource = await prisma.resource.create({
        data: {
          title: documentTitle,
          description,
          type: resourceType as any,
          category,
          fileUrl,
          userId: session.user.id
        }
      });
      
      console.log("Resource created for dashboard:", resource.id);
    } catch (resourceError) {
      console.error("Error creating resource record:", resourceError);
      // Continue even if resource creation fails - we don't want to block the upload
    }

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