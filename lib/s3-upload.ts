export async function uploadToS3(
  file: File,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    // Get pre-signed URL from our API
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
      throw new Error('Failed to get upload URL');
    }

    const { uploadUrl, fileUrl } = await response.json();

    // Upload file directly to S3 using the pre-signed URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': contentType,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file');
    }

    return fileUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file");
  }
} 