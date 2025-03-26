"use client";

import { useState, useEffect } from 'react';
import { FaBook, FaFilePdf, FaVideo, FaNewspaper, FaSearch, FaDownload, FaFileAlt, FaFileMedical, FaFileContract, FaFileSignature, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'sonner';

type Document = {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'VIDEO' | 'ARTICLE' | 'EBOOK';
  category: string;
  fileUrl: string;
  createdAt: string;
};

const getIconForType = (type: Document['type'], description: string) => {
  // Special icons based on document description
  if (description.toLowerCase().includes('cv') || description.toLowerCase().includes('resume')) {
    return FaFileAlt;
  }
  if (description.toLowerCase().includes('license') || description.toLowerCase().includes('medical')) {
    return FaFileMedical;
  }
  if (description.toLowerCase().includes('certificate')) {
    return FaFileContract;
  }
  
  // Default icons based on type
  switch (type) {
    case 'PDF':
      return FaFilePdf;
    case 'VIDEO':
      return FaVideo;
    case 'ARTICLE':
      return FaNewspaper;
    case 'EBOOK':
      return FaBook;
    default:
      return FaFilePdf;
  }
};

export default function DocumentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 1. First, fetch resources with 'Membership' category
        const resourcesResponse = await fetch('/api/resources?category=Membership');
        if (!resourcesResponse.ok) {
          throw new Error(`Failed to fetch resources: ${resourcesResponse.status} ${resourcesResponse.statusText}`);
        }
        
        const resourcesData = await resourcesResponse.json() as Document[];
        
        // Create an array to hold all documents
        let allDocuments: Document[] = [...resourcesData];
        
        try {
          // 2. Try to fetch user profile to get membership application documents
          const userResponse = await fetch('/api/users/me');
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            
            // 3. Add documents from user profile if available
            if (userData) {
              // Add CV/Resume document if available
              if (userData.cvUrl) {
                allDocuments.push({
                  id: 'cv-' + userData.id,
                  title: 'CV/Resume',
                  description: 'CV/Resume Document',
                  type: 'PDF',
                  category: 'Membership',
                  fileUrl: userData.cvUrl,
                  createdAt: new Date().toISOString()
                });
              }
              
              // Add license document if available
              if (userData.licenseUrl) {
                allDocuments.push({
                  id: 'license-' + userData.id,
                  title: 'Medical License',
                  description: 'Medical License Document',
                  type: 'PDF',
                  category: 'Membership',
                  fileUrl: userData.licenseUrl,
                  createdAt: new Date().toISOString()
                });
              }
              
              // Add other documents if available
              if (userData.otherDocumentsUrls && userData.otherDocumentsUrls.length > 0) {
                userData.otherDocumentsUrls.forEach((url: string, index: number) => {
                  allDocuments.push({
                    id: `other-${userData.id}-${index}`,
                    title: `Supporting Document ${index + 1}`,
                    description: 'Additional Supporting Document',
                    type: 'PDF',
                    category: 'Membership',
                    fileUrl: url,
                    createdAt: new Date().toISOString()
                  });
                });
              }
              
              // 4. Check if user has a membership application with documents
              // Make sure we can handle both array and single object formats
              if (userData.membershipApplication) {
                // Handle if it's an array
                const applications = Array.isArray(userData.membershipApplication) 
                  ? userData.membershipApplication 
                  : [userData.membershipApplication];
                
                // Process each application
                applications.forEach(application => {
                  if (!application) return;
                  
                  // Add CV/Resume document if available from application
                  if (application.cvUrl) {
                    allDocuments.push({
                      id: 'app-cv-' + application.id,
                      title: 'CV/Resume from Application',
                      description: 'CV/Resume Document',
                      type: 'PDF',
                      category: 'Membership',
                      fileUrl: application.cvUrl,
                      createdAt: application.createdAt || new Date().toISOString()
                    });
                  }
                  
                  // Add license document if available from application
                  if (application.licenseUrl) {
                    allDocuments.push({
                      id: 'app-license-' + application.id,
                      title: 'Medical License from Application',
                      description: 'Medical License Document',
                      type: 'PDF',
                      category: 'Membership',
                      fileUrl: application.licenseUrl,
                      createdAt: application.createdAt || new Date().toISOString()
                    });
                  }
                  
                  // Add other documents if available from application
                  if (application.otherDocumentsUrls && application.otherDocumentsUrls.length > 0) {
                    application.otherDocumentsUrls.forEach((url: string, index: number) => {
                      allDocuments.push({
                        id: `app-other-${application.id}-${index}`,
                        title: `Supporting Document ${index + 1}`,
                        description: 'Additional Supporting Document',
                        type: 'PDF',
                        category: 'Membership',
                        fileUrl: url,
                        createdAt: application.createdAt || new Date().toISOString()
                      });
                    });
                  }
                });
              }
            }
          } else {
            console.warn('Could not fetch user profile data:', userResponse.status, userResponse.statusText);
            // Don't set error - just continue with the resources we have
          }
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          // Don't set error - just continue with the resources we have
        }
        
        // Remove duplicates by fileUrl
        const uniqueUrls = new Set();
        allDocuments = allDocuments.filter(doc => {
          if (uniqueUrls.has(doc.fileUrl)) {
            return false;
          }
          uniqueUrls.add(doc.fileUrl);
          return true;
        });

        setDocuments(allDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while fetching documents');
        toast.error('Failed to load documents. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading documents: {error}
            </p>
            <button
              className="mt-2 text-sm text-red-700 underline"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Documents List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const Icon = getIconForType(doc.type, doc.description);
                return (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100">
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                          <div className="text-sm text-gray-500">{doc.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.createdAt ? formatDate(doc.createdAt) : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a 
                        href={doc.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        <FaDownload className="mr-2 h-3 w-3" />
                        View
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                  No documents found
                  {searchQuery && " matching your search criteria"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {documents.length === 0 && !isLoading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You don't have any documents yet. Documents you upload during membership application or other processes will appear here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 