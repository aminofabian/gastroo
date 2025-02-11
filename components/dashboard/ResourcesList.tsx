"use client";

import { useState, useEffect } from 'react';
import { FaBook, FaFilePdf, FaVideo, FaNewspaper, FaSearch, FaDownload } from 'react-icons/fa';

type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'VIDEO' | 'ARTICLE' | 'EBOOK';
  category: string;
  fileUrl: string;
};

const getIconForType = (type: Resource['type']) => {
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

export default function ResourcesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        const data = await response.json() as Resource[];
        setResources(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(r => r.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getIconForType(resource.type);
          return (
            <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      {resource.type}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  <div className="mt-4">
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      onClick={(e) => {
                        if (!resource.fileUrl.startsWith('http')) {
                          e.preventDefault();
                          console.error('Invalid file URL');
                        }
                      }}
                    >
                      <FaDownload className="mr-2 h-4 w-4" />
                      {resource.type === 'VIDEO' ? 'Watch' : 'Download'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria</p>
        </div>
      )}
    </div>
  );
} 