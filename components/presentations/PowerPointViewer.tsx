"use client";

import { useState, useEffect } from 'react';
import { FileText, AlertCircle, ExternalLink } from 'lucide-react';

interface PowerPointViewerProps {
  fileName: string;
  title: string;
}

export default function PowerPointViewer({ fileName, title }: PowerPointViewerProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fileUrl = `https://gastrokenya.org/presentations/${encodeURIComponent(fileName)}`;
  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`;
  const embedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Primary Viewing Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            Microsoft Office Online
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Open in Microsoft's online PowerPoint viewer (recommended)
          </p>
          <a
            href={officeViewerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Office Online
          </a>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-green-600" />
            Google Slides
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Upload to Google Slides for better compatibility
          </p>
          <a
            href="https://docs.google.com/presentation/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Google Slides
          </a>
        </div>
      </div>

      {/* Embedded Viewer */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-purple-600" />
          Embedded Viewer
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          View the presentation directly on this page (may not work in all browsers)
        </p>
        
        <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading presentation...</p>
              </div>
            </div>
          )}
          
          {iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center p-4">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  The embedded viewer couldn't load the presentation.
                </p>
                <a
                  href={officeViewerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Office Online Instead
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-full h-full"
              title={title}
              onError={handleIframeError}
              onLoad={handleIframeLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          If the embedded viewer doesn't work, use the "Open in Office Online" button above.
        </p>
      </div>

      {/* Download Options */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Download Options</h4>
        <div className="flex flex-wrap gap-3">
          <a
            href={`/presentations/${fileName}`}
            download
            className="inline-flex items-center px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002347] transition-colors duration-200 font-medium text-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download PowerPoint
          </a>
          <a
            href={`/presentations/${fileName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
}
