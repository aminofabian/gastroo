"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// Mock data - replace with actual API calls
const mockNews = [
  {
    id: 1,
    title: "Annual Gastroenterology Conference 2024",
    excerpt: "Join us for the largest gathering of gastroenterologists in East Africa...",
    date: "2024-03-15",
    author: "Dr. John Doe",
    status: "published",
  },
  {
    id: 2,
    title: "New Research Findings in Digestive Health",
    excerpt: "Recent studies show promising results in treating inflammatory bowel disease...",
    date: "2024-03-10",
    author: "Dr. Jane Smith",
    status: "draft",
  },
];

export default function NewsPage() {
  const [news, setNews] = useState(mockNews);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900">News & Updates</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-[#003366] text-white  hover:bg-[#004488] transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaPlus />
              <span>Add News</span>
            </div>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-gray-50 ">
            <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Add News Article</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                  placeholder="Write your article content..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2  border border-gray-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {news.map((article) => (
            <div
              key={article.id}
              className="p-6 bg-white  border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                  <p className="text-gray-500 mt-1">{article.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="text-gray-500">By {article.author}</span>
                    <span className="text-gray-500">{article.date}</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5  text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-emerald-600 hover:text-emerald-800 transition-colors">
                    <FaEdit />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-800 transition-colors">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
} 