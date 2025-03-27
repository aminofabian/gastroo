"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaImage, FaGlobe, FaLink } from "react-icons/fa";

// Mock data - replace with actual API calls
const mockPartners = [
  {
    id: 1,
    name: "Medical University of Kenya",
    description: "Leading medical education institution in Kenya",
    logo: "/images/partner1.png",
    website: "https://example.com",
    category: "Education",
    active: true,
  },
  {
    id: 2,
    name: "Healthcare Solutions Ltd",
    description: "Provider of advanced medical equipment",
    logo: "/images/partner2.png",
    website: "https://example.com",
    category: "Healthcare",
    active: true,
  },
];

const categories = ["Education", "Healthcare", "Research", "Technology", "NGO"];

export default function PartnersManagement() {
  const [partners, setPartners] = useState(mockPartners);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">Partners Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#003366] text-white  hover:bg-[#004488] transition-colors"
        >
          Add New Partner
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-50 ">
          <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Add New Partner</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                  placeholder="Enter partner name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                placeholder="Enter partner description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    className="w-full pl-10 pr-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        className="hidden"
                        id="partner-logo"
                        accept="image/*"
                      />
                      <label
                        htmlFor="partner-logo"
                        className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300  cursor-pointer hover:border-[#003366] transition-colors"
                      >
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaImage />
                          <span>Choose logo</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gray-100 "></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#003366] text-white  hover:bg-[#004488] transition-colors"
              >
                Save Partner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search partners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
        />
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="p-4 bg-white border  hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100  flex-shrink-0">
                {/* Replace with actual image component */}
                <div className="w-full h-full bg-gray-200 "></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">{partner.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{partner.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-1.5 text-emerald-600 hover:text-emerald-800 transition-colors">
                      <FaEdit />
                    </button>
                    <button className="p-1.5 text-red-600 hover:text-red-800 transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5  text-xs font-medium bg-emerald-100 text-emerald-800">
                    {partner.category}
                  </span>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-[#003366] transition-colors"
                  >
                    <FaLink className="text-xs" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 