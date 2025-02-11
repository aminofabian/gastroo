import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { fileName, fileType } = await req.json();
    const fileExtension = fileName.split('.').pop();
    const fileKey = `resources/${uuidv4()}.${fileExtension}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
      ACL: 'public-read',
      CacheControl: 'max-age=31536000',
    });

    const url = await getSignedUrl(s3Client, putObjectCommand, { 
      expiresIn: 3600,
    });

    return NextResponse.json({ 
      url, 
      fileKey,
      publicUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 