"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaFileAlt, FaFilePdf, FaFileImage, FaExternalLinkAlt } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "sonner";

// Add MembershipStatus enum to match Prisma schema
enum MembershipStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

interface MembershipApplication {
  id: string;
  status: string;
  createdAt: Date | null;
  specialization: string | null;
  licenseNumber: string | null;
  hospital: string | null;
  address: string | null;
  city: string | null;
  county: string | null;
  postalCode: string | null;
  userId: string;
  cvUrl: string | null;
  licenseUrl: string | null;
  otherDocumentsUrls: string[] | null;
}

interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  title: string | null;
  specialization: string | null;
  hospital: string | null;
  profileSlug: string | null;
  namePrefix: string | null;
  fullName: string | null;
  designation: string | null;
  lastActive: Date | null;
  profileCompleteness: number | null;
  isProfilePublic: boolean;
  hasActiveSubscription: boolean;
  subscriptionEndDate: Date | null;
  phone: string | null;
  membershipApplication: MembershipApplication[] | null;
  isMember: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Define fetchUsers as a function that can be called from anywhere in the component
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      
      // Debug the API response
      console.log('Users data received:', data.length, 'users');
      
      // Check if any users have document URLs
      const usersWithDocs = data.filter((user: User) => 
        user.membershipApplication && 
        user.membershipApplication.length > 0 && 
        (user.membershipApplication[0]?.cvUrl || 
         user.membershipApplication[0]?.licenseUrl || 
         (user.membershipApplication[0]?.otherDocumentsUrls && 
          user.membershipApplication[0].otherDocumentsUrls.length > 0))
      );
      
      console.log('Users with document URLs:', usersWithDocs.length);
      if (usersWithDocs.length > 0) {
        console.log('Sample user with docs:', {
          email: usersWithDocs[0].email,
          cvUrl: usersWithDocs[0].membershipApplication[0]?.cvUrl,
          licenseUrl: usersWithDocs[0].membershipApplication[0]?.licenseUrl,
          otherDocs: usersWithDocs[0].membershipApplication[0]?.otherDocumentsUrls
        });
      }
      
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ??
      false
  );

  const handleApplicationUpdate = async (userId: string, status: string) => {
    try {
      // Show loading toast
      toast.loading('Updating application status...');
      
      const response = await fetch(`/api/users/${userId}/approval`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update application status');
      }

      // Get the response data
      const responseData = await response.json();
      
      // Dismiss loading toast
      toast.dismiss();
      
      // Update the local state immediately to reflect changes
      setUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.id === userId) {
            // Update the user object with response data when available
            const updatedUser = responseData.user || responseData;
            return {
              ...user,
              isMember: status === 'APPROVED',
              membershipApplication: user.membershipApplication && user.membershipApplication.length > 0 
                ? user.membershipApplication.map(app => ({
                    ...app,
                    status: status,
                    // Add approvedAt and approvedBy if they're in the response
                    ...(updatedUser.approvedAt && { approvedAt: updatedUser.approvedAt }),
                    ...(updatedUser.approvedBy && { approvedBy: updatedUser.approvedBy })
                  }))
                : null,
              approvalStatus: status,
              ...(updatedUser.approvedAt && { approvedAt: updatedUser.approvedAt }),
              ...(updatedUser.approvedBy && { approvedBy: updatedUser.approvedBy })
            };
          }
          return user;
        })
      );
      
      // Show success message
      toast.success(`User ${status === 'APPROVED' ? 'approved' : status === 'REJECTED' ? 'rejected' : 'set to pending'} successfully`);
      
      // If a user modal is open, update the selected user
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(prev => {
          if (!prev) return null;
          
          // Update the application in the selected user
          return {
            ...prev,
            isMember: status === 'APPROVED',
            membershipApplication: prev.membershipApplication && prev.membershipApplication.length > 0
              ? prev.membershipApplication.map(app => ({
                  ...app,
                  status: status,
                  ...(responseData.user?.approvedAt && { approvedAt: responseData.user.approvedAt }),
                  ...(responseData.user?.approvedBy && { approvedBy: responseData.user.approvedBy })
                }))
              : null,
            approvalStatus: status,
            ...(responseData.user?.approvedAt && { approvedAt: responseData.user.approvedAt }),
            ...(responseData.user?.approvedBy && { approvedBy: responseData.user.approvedBy })
          };
        });
      }
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss();
      
      // Show error toast
      toast.error(err instanceof Error ? err.message : 'Failed to update application');
      
      console.error('Error updating application:', err);
      setError(err instanceof Error ? err.message : 'Failed to update application');
    }
  };

  const openUserModal = (user: User) => {
    // Debug the membership application document URLs
    console.log('Opening user modal for:', user.email);
    if (user.membershipApplication && user.membershipApplication.length > 0) {
      console.log('Membership application found:', {
        cvUrl: user.membershipApplication[0]?.cvUrl,
        licenseUrl: user.membershipApplication[0]?.licenseUrl,
        otherDocumentsUrls: user.membershipApplication[0]?.otherDocumentsUrls
      });
    } else {
      console.log('No membership application found for this user.');
    }
    
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#003366] text-white hover:bg-[#004488] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">User Management</h2>
          {!isLoading && (
            <p className="text-sm text-gray-500 mt-1">
              Total Users: {users.length}
            </p>
          )}
        </div>
        <button className="px-4 py-2 bg-[#003366] text-white hover:bg-[#004488] transition-colors">
          Add New User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading users...</p>
        </div>
      ) : (
        /* Users Table */
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Active</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Member Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Application Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900">
                        {user.namePrefix && `${user.namePrefix} `}
                        {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`}
                      </div>
                      {(user.title || user.specialization) && (
                        <div className="text-sm text-gray-500">
                          {[user.title, user.specialization].filter(Boolean).join(" • ")}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className="inline-flex rounded-full bg-emerald-100 px-2 text-xs font-semibold leading-5 text-emerald-800">
                      {user.role.toLowerCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 text-xs font-semibold leading-5 
                      ${user.hasActiveSubscription ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {user.hasActiveSubscription ? <FaCheck className="text-xs" /> : <FaTimes className="text-xs" />}
                      {user.hasActiveSubscription ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.lastActive ? format(new Date(user.lastActive), 'MMM d, yyyy') : 'Never'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 text-xs font-semibold leading-5 
                      ${user.isMember 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"}`}>
                      {user.isMember ? <FaCheck className="text-xs" /> : <FaTimes className="text-xs" />}
                      {user.isMember ? "Member" : "Not a Member"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {user.membershipApplication && user.membershipApplication.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 text-xs font-semibold leading-5 
                          ${user.membershipApplication[0].status === 'APPROVED' 
                            ? "bg-green-100 text-green-800" 
                            : user.membershipApplication[0].status === 'REJECTED'
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"}`}>
                          {user.membershipApplication[0].status === 'APPROVED' && <FaCheck className="text-xs" />}
                          {user.membershipApplication[0].status === 'REJECTED' && <FaTimes className="text-xs" />}
                          {user.membershipApplication[0].status === 'PENDING' && <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>}
                          {user.membershipApplication[0].status === 'APPROVED' ? 'APPROVED' : 
                           user.membershipApplication[0].status === 'REJECTED' ? 'REJECTED' : 'PENDING'}
                        </span>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">
                            {user.membershipApplication[0].createdAt 
                              ? (() => {
                                  try {
                                    return `Applied: ${format(new Date(user.membershipApplication[0].createdAt), 'MMM d, yyyy')}`;
                                  } catch (error) {
                                    return 'Recently applied';
                                  }
                                })()
                              : 'Recently applied'}
                          </span>
                          <button
                            onClick={() => openUserModal(user)}
                            className="ml-2 text-blue-600 hover:text-blue-800 text-xs underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800">
                        <FaTimes className="text-xs" />
                        No Application
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-emerald-600 hover:text-emerald-800 transition-colors"
                        onClick={() => openUserModal(user)}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors">
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                User Details: {selectedUser.fullName || `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`}
              </h3>
              <button 
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1">{selectedUser.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1">{selectedUser.lastName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{selectedUser.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1">{selectedUser.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1">{selectedUser.role || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Status</label>
                    <p className="mt-1">{selectedUser.isMember ? 'Member' : 'Not a Member'}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">Professional Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="mt-1">{selectedUser.title || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1">{selectedUser.specialization || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hospital</label>
                    <p className="mt-1">{selectedUser.hospital || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <p className="mt-1">{selectedUser.designation || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Membership Application */}
              {selectedUser.membershipApplication && selectedUser.membershipApplication.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-semibold text-lg mb-3">Membership Application</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1 flex space-x-2">
                        <button
                          onClick={() => handleApplicationUpdate(selectedUser.id, 'APPROVED')}
                          className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedUser.membershipApplication[0]?.status === 'APPROVED'
                              ? 'bg-green-600 text-white ring-2 ring-green-500'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApplicationUpdate(selectedUser.id, 'REJECTED')}
                          className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedUser.membershipApplication[0]?.status === 'REJECTED'
                              ? 'bg-red-600 text-white ring-2 ring-red-500'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApplicationUpdate(selectedUser.id, 'PENDING')}
                          className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedUser.membershipApplication[0]?.status === 'PENDING'
                              ? 'bg-yellow-600 text-white ring-2 ring-yellow-500'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          Pending
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Current status: <span className={`font-medium ${
                          selectedUser.membershipApplication[0]?.status === 'APPROVED'
                            ? 'text-green-600'
                            : selectedUser.membershipApplication[0]?.status === 'REJECTED'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>{selectedUser.membershipApplication[0]?.status}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                      <p className="mt-1">
                        {selectedUser.membershipApplication[0]?.createdAt 
                          ? format(new Date(selectedUser.membershipApplication[0]?.createdAt), 'MMM d, yyyy') 
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">License Number</label>
                      <p className="mt-1">{selectedUser.membershipApplication[0]?.licenseNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1">{selectedUser.membershipApplication[0]?.address || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <p className="mt-1">{selectedUser.membershipApplication[0]?.city || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">County</label>
                      <p className="mt-1">{selectedUser.membershipApplication[0]?.county || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Section */}
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h4 className="font-semibold text-lg mb-3">Uploaded Documents</h4>
                <div className="grid grid-cols-1 gap-4">
                  {selectedUser.membershipApplication && selectedUser.membershipApplication.length > 0 && (
                    <div className="border border-gray-200 rounded-md p-3">
                      <p className="text-gray-500 mb-2 text-sm">Debug Information:</p>
                      <pre className="text-xs bg-gray-100 p-2 overflow-auto max-h-32 rounded">
                        {JSON.stringify({
                          cvUrl: selectedUser.membershipApplication[0]?.cvUrl,
                          licenseUrl: selectedUser.membershipApplication[0]?.licenseUrl,
                          otherUrls: selectedUser.membershipApplication[0]?.otherDocumentsUrls,
                        }, null, 2)}
                      </pre>
                    </div>
                  )}
                
                  {selectedUser.membershipApplication && selectedUser.membershipApplication.length > 0 && selectedUser.membershipApplication[0]?.cvUrl ? (
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <FaFilePdf className="text-red-500 mr-2 text-xl" />
                        <span>CV Document</span>
                      </div>
                      <a 
                        href={selectedUser.membershipApplication[0]?.cvUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="mr-1">View</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between bg-gray-100">
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-400 mr-2 text-xl" />
                        <span className="text-gray-500">CV Document - Not Uploaded</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedUser.membershipApplication && selectedUser.membershipApplication.length > 0 && selectedUser.membershipApplication[0]?.licenseUrl ? (
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <FaFilePdf className="text-red-500 mr-2 text-xl" />
                        <span>Medical License</span>
                      </div>
                      <a 
                        href={selectedUser.membershipApplication[0]?.licenseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="mr-1">View</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between bg-gray-100">
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-400 mr-2 text-xl" />
                        <span className="text-gray-500">Medical License - Not Uploaded</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedUser.membershipApplication && selectedUser.membershipApplication.length > 0 && 
                   selectedUser.membershipApplication[0]?.otherDocumentsUrls && 
                   selectedUser.membershipApplication[0]?.otherDocumentsUrls.length > 0 ? (
                    selectedUser.membershipApplication[0].otherDocumentsUrls.map((url, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <FaFilePdf className="text-red-500 mr-2 text-xl" />
                          <span>Additional Document {index + 1}</span>
                        </div>
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <span className="mr-1">View</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between bg-gray-100">
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-400 mr-2 text-xl" />
                        <span className="text-gray-500">Additional Documents - None Uploaded</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {selectedUser.membershipApplication && 
               selectedUser.membershipApplication.length > 0 && 
               selectedUser.membershipApplication[0]?.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleApplicationUpdate(selectedUser.id, 'APPROVED')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApplicationUpdate(selectedUser.id, 'REJECTED')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}