"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaEdit, FaDownload } from 'react-icons/fa';
import { toast } from 'sonner';

type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'VIDEO' | 'ARTICLE' | 'EBOOK' | 'PRESENTATION';
  category: string;
  fileUrl: string;
};

export default function AdminResourceManagement() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PDF',
    category: '',
    file: null as File | null,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      // Validate file type based on resource type
      const allowedTypes: Record<string, string[]> = {
        PDF: ['application/pdf'],
        VIDEO: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
        ARTICLE: [
          'application/pdf', 
          'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        EBOOK: ['application/pdf', 'application/epub+zip'],
        PRESENTATION: [
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ]
      };
      
      const currentType = formData.type;
      if (allowedTypes[currentType] && !allowedTypes[currentType].includes(file.type)) {
        setUploadError(`Invalid file type for ${currentType}. Please upload a valid file.`);
        return;
      }
      
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setUploadError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Create a FormData instance for file upload
      const fileFormData = new FormData();
      fileFormData.append('file', formData.file);
      fileFormData.append('resourceType', formData.type);
      
      console.log('Uploading resource file:', {
        name: formData.file.name,
        type: formData.file.type,
        size: formData.file.size
      });
      
      // Upload file using our new direct upload endpoint
      const uploadResponse = await fetch('/api/resources/upload', {
        method: 'POST',
        body: fileFormData,
      });
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Resource file upload failed:', uploadResponse.status, errorText);
        throw new Error(`Resource file upload failed: ${uploadResponse.status} ${errorText}`);
      }
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadData.success || !uploadData.fileUrl) {
        throw new Error('Failed to upload resource file: No file URL returned');
      }
      
      console.log('File uploaded successfully, creating resource record');
      
      // Create the resource record with the file URL
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          category: formData.category,
          fileUrl: uploadData.fileUrl,
        }),
      });

      if (response.ok) {
        toast.success('Resource added successfully');
        await fetchResources();
        setFormData({
          title: '',
          description: '',
          type: 'PDF',
          category: '',
          file: null,
        });
      } else {
        const errorData = await response.text();
        throw new Error(`Failed to create resource: ${errorData}`);
      }
    } catch (error) {
      console.error('Error uploading resource:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload resource');
      toast.error('Failed to upload resource');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/resources?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Resource deleted successfully');
        await fetchResources();
      } else {
        toast.error('Failed to delete resource');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Add Resource Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm space-y-6 backdrop-blur-sm">
        <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">Add New Resource</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-lg bg-gray-50 shadow-sm 
                focus:ring-2 focus:ring-emerald-200 focus:bg-white
                transition-all duration-200 outline-none border-0
                px-4 py-2.5"
              placeholder="Enter resource title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-lg bg-gray-50 shadow-sm 
                focus:ring-2 focus:ring-emerald-200 focus:bg-white
                transition-all duration-200 outline-none border-0
                px-4 py-2.5"
              placeholder="e.g., Guidelines, Research, Education"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Resource['type'] })}
              className="mt-1 block w-full rounded-lg bg-gray-50 shadow-sm 
                focus:ring-2 focus:ring-emerald-200 focus:bg-white
                transition-all duration-200 outline-none border-0
                px-4 py-2.5 appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="PDF">PDF</option>
              <option value="VIDEO">Video</option>
              <option value="ARTICLE">Article</option>
              <option value="EBOOK">E-Book</option>
              <option value="PRESENTATION">Presentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
            <div className="mt-1">
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2.5 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-gradient-to-r file:from-emerald-50 file:to-emerald-100
                  file:text-emerald-700
                  hover:file:bg-gradient-to-r hover:file:from-emerald-100 hover:file:to-emerald-200
                  focus:outline-none
                  transition-all duration-200"
              />
              {formData.file && (
                <div className="mt-2 text-sm text-emerald-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {formData.file.name} ({Math.round(formData.file.size / 1024)} KB)
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-lg bg-gray-50 shadow-sm 
              focus:ring-2 focus:ring-emerald-200 focus:bg-white
              transition-all duration-200 outline-none border-0
              px-4 py-2.5"
            placeholder="Provide a brief description of the resource"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center px-6 py-2.5
              rounded-lg shadow-sm text-sm font-medium text-white 
              bg-gradient-to-r from-emerald-600 to-emerald-700
              hover:from-emerald-700 hover:to-emerald-800
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                Add Resource
              </>
            )}
          </button>
        </div>
      </form>

      {/* Resources List */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-8">Existing Resources</h2>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-start justify-between p-6 rounded-lg bg-gradient-to-r from-white to-gray-50
                hover:shadow-md transition-all duration-200 transform hover:scale-[1.01]
                hover:from-emerald-50 hover:to-white"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full">
                    {resource.type}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-full">
                    {resource.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <a
                  href={resource.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200
                    hover:scale-110 hover:shadow-sm"
                  title="Download"
                >
                  <FaDownload className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleDelete(resource.id)}
                  disabled={isDeleting === resource.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full 
                    transition-all duration-200 hover:scale-110 hover:shadow-sm
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  {isDeleting === resource.id ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FaTrash className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {resources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No resources found</p>
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {uploadError}
          </div>
        </div>
      )}
    </div>
  );
} 