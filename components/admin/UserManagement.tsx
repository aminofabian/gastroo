"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { format } from "date-fns";

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
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Active</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
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
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800">
                      {user.role.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium ${
                        user.hasActiveSubscription
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.hasActiveSubscription ? (
                        <FaCheck className="text-xs" />
                      ) : (
                        <FaTimes className="text-xs" />
                      )}
                      {user.hasActiveSubscription ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {user.lastActive ? format(new Date(user.lastActive), 'MMM d, yyyy') : 'Never'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-emerald-600 hover:text-emerald-800 transition-colors">
                        <FaEdit />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800 transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 