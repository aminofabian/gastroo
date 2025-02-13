"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { format } from "date-fns";

// Add MembershipStatus enum to match Prisma schema
enum MembershipStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

interface MembershipApplication {
  status: MembershipStatus;  // Update to use enum
  submissionDate: Date;
  specialization: string | null;
  yearsOfExperience: number | null;
  licenseNumber: string | null;
  education: string | null;
  workplace: string | null;
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
  membershipApplication: MembershipApplication | null;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingApplication, setEditingApplication] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ??
      false
  );

  const handleApplicationUpdate = async (userId: string, status: MembershipStatus) => {
    try {
      const response = await fetch(`/api/users/${userId}/membership`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      setUsers(users.map(user => {
        if (user.id === userId && user.membershipApplication) {
          return {
            ...user,
            membershipApplication: {
              ...user.membershipApplication,
              status,
            },
          };
        }
        return user;
      }));

      setEditingApplication(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update application');
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#c22f61] text-white hover:bg-[#004488] transition-colors"
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
        <button className="px-4 py-2 bg-[#c22f61] text-white hover:bg-[#004488] transition-colors">
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
          className="w-full max-w-md px-4 py-2 border border-gray-200 focus:border-[#c22f61] focus:ring-1 focus:ring-[#c22f61]"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c22f61] mx-auto"></div>
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
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Membership</th>
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
                    {user.membershipApplication ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={user.membershipApplication.status}
                          onChange={(e) => handleApplicationUpdate(user.id, e.target.value as MembershipStatus)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                            user.membershipApplication.status === MembershipStatus.APPROVED
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : user.membershipApplication.status === MembershipStatus.REJECTED
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          }`}
                        >
                          {Object.values(MembershipStatus).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => setEditingApplication(user.id)}
                          className="text-blue-600 hover:text-blue-800 text-xs underline"
                        >
                          Details
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No application</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-600 hover:text-emerald-800 transition-colors">
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

      {/* Application Details Modal */}
      {editingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Membership Application Details</h3>
            {users.find(u => u.id === editingApplication)?.membershipApplication && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1">{users.find(u => u.id === editingApplication)?.membershipApplication?.specialization}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <p className="mt-1">{users.find(u => u.id === editingApplication)?.membershipApplication?.yearsOfExperience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                    <p className="mt-1">{users.find(u => u.id === editingApplication)?.membershipApplication?.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Education</label>
                    <p className="mt-1">{users.find(u => u.id === editingApplication)?.membershipApplication?.education}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Workplace</label>
                    <p className="mt-1">{users.find(u => u.id === editingApplication)?.membershipApplication?.workplace}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setEditingApplication(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 