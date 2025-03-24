import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const { fileName, fileType } = await request.json();

    // Create unique file name
    const uniqueFileName = `${Date.now()}-${fileName}`;

    // Create the command
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    // Generate pre-signed URL
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Return the pre-signed URL and the final URL where the file will be accessible
    return NextResponse.json({
      uploadUrl: presignedUrl,
      fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`,
    });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
} 