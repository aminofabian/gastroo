export async function uploadToS3(
  file: File,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    console.log('uploadToS3 started with:', { fileName, contentType, fileSize: file.size });
    
    // Get pre-signed URL from our API
    console.log('Requesting pre-signed URL from /api/upload');
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        fileType: contentType,
      }),
    });

    if (!response.ok) {
      console.error('Failed to get upload URL, status:', response.status);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to get upload URL: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    const { uploadUrl, fileUrl } = responseData;
    console.log('Received pre-signed URL:', { uploadUrl, fileUrl });

    // Upload file directly to S3 using the pre-signed URL
    console.log('Uploading file to S3 with pre-signed URL');
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': contentType,
      },
    });

    if (!uploadResponse.ok) {
      console.error('Failed to upload file to S3, status:', uploadResponse.status);
      const errorText = await uploadResponse.text();
      console.error('S3 error response:', errorText);
      throw new Error(`Failed to upload file: ${uploadResponse.status} ${errorText}`);
    }

    console.log('File successfully uploaded to S3, fileUrl:', fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to upload file");
  }
} 