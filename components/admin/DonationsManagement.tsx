"use client";

import { useState } from "react";
import { FaDownload, FaFilter, FaEye } from "react-icons/fa";

// Mock data - replace with actual API calls
const mockDonations = [
  {
    id: 1,
    donor: "John Smith",
    email: "john@example.com",
    amount: 5000,
    currency: "KES",
    status: "completed",
    date: "2024-03-15",
    campaign: "Annual Fund",
    paymentMethod: "M-Pesa",
  },
  {
    id: 2,
    donor: "Jane Doe",
    email: "jane@example.com",
    amount: 10000,
    currency: "KES",
    status: "pending",
    date: "2024-03-14",
    campaign: "Research Grant",
    paymentMethod: "Bank Transfer",
  },
];

const campaigns = ["Annual Fund", "Research Grant", "Equipment Fund", "Education Program"];
const statuses = ["all", "completed", "pending", "failed"];

export default function DonationsManagement() {
  const [donations, setDonations] = useState(mockDonations);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || donation.status === selectedStatus;
    const matchesCampaign =
      selectedCampaign === "all" || donation.campaign === selectedCampaign;
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Donations Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: KES {totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaFilter />
          </button>
          <button className="px-4 py-2 bg-[#003366] text-white  hover:bg-[#004488] transition-colors">
            <div className="flex items-center gap-2">
              <FaDownload />
              <span>Export</span>
            </div>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map((campaign) => (
                  <option key={campaign} value={campaign}>
                    {campaign}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by donor or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Donor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Campaign</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900">{donation.donor}</div>
                    <div className="text-sm text-gray-500">{donation.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {donation.currency} {donation.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5  text-xs font-medium bg-emerald-100 text-emerald-800">
                    {donation.campaign}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5  text-xs font-medium ${
                      donation.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{donation.date}</td>
                <td className="px-4 py-3 text-gray-600">{donation.paymentMethod}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-emerald-600 hover:text-emerald-800 transition-colors">
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 