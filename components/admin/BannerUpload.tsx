"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BannerUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(false);

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('Starting upload for file:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      });

      const response = await fetch('/api/banners', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      
      // Clone the response before reading it
      const responseClone = response.clone();
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Response parsing error:', {
          status: responseClone.status,
          contentType,
        });
        // Read the text from the cloned response
        const text = await responseClone.text();
        console.error('Response text:', text);
        throw new Error('Failed to parse server response');
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Upload failed');
      }

      if (!data.success) {
        throw new Error('Upload was not successful');
      }

      setSuccess(true);
      setSelectedFile(null);
      setPreview(null);
      console.log('Banner uploaded successfully:', data.url);
    } catch (err: any) {
      console.error('Upload error:', {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      
      setError(
        err.message === 'Failed to parse server response'
          ? 'Server error: Please try GSKin later'
          : err.message || 'Failed to upload banner. Please try GSKin.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white  p-6 border border-gray-200">
        <h2 className="text-2xl font-merriweather font-bold text-[#003366] mb-6">Upload New Banner</h2>
        
        {/* Upload Area */}
        <div className="space-y-4">
          {/* Preview */}
          {preview && (
            <div className="relative w-full aspect-[21/9]  overflow-hidden bg-gray-100">
              <Image
                src={preview}
                alt="Banner preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Upload Input */}
          <div className="relative">
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              id="banner-upload"
              disabled={uploading}
            />
            <label
              htmlFor="banner-upload"
              className="block w-full p-4 border-2 border-dashed border-gray-300  text-center cursor-pointer hover:border-[#0f5a5e]/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="text-[#003366] font-medium">
                  {preview ? 'Change Image' : 'Choose an image'}
                </div>
                <div className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </div>
              </div>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-sm"
            >
              Banner uploaded successfully!
            </motion.div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={`w-full py-3 px-4  font-medium text-white transition-all duration-300 ${
              !selectedFile || uploading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#003366] hover:bg-[#003366]/90'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Banner'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 